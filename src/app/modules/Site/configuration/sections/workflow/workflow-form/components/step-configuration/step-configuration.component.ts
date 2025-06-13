import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkflowStepsConfiguration } from '../../../../../../../../models/workflow-steps-configuration';
import { ApiConfigurationService } from '../../../../../../../../services/api/configuration.service';
import { OcrEngine } from '../../../../../../../../enums/ocr-engine.enum';
import { TranslateModule } from '@ngx-translate/core';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-step-configuration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, InputNumberModule],
  templateUrl: './step-configuration.component.html',
  styleUrl: './step-configuration.component.css',
  providers:[ApiConfigurationService]
})
export class StepConfigurationComponent {
  stepConfigurationForm: FormGroup; 
  @Input() stepConfiguration: WorkflowStepsConfiguration;
  @Input() isEditMode = false;
  @Input() documentTypesSelected: any[] = [];

  isActiveQaScan: boolean;
  hasIndexSupervision: boolean;
  isActiveQaIndex: boolean;
  isActiveMultipleIndexing: boolean;
  hasExternalValidation: boolean;
  hasToReturnAllDocumentFromQAScan: boolean;
  hasToReturnAllDocumentFromQAIndex: boolean;
  hasToConvertToPdfToRelease = false;
  convertDocumentsToSearchablePdf = false;
  canUseAbbyyEngine = false;
  canUseIrisEngine = false;
  cols: { field: string; header: string; }[] = [];
  disableQaIndexDocumentsApprovementPercent: boolean;
  disableQaScanDocumentsApprovementPercent: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private configurationService: ApiConfigurationService) { }

  async ngOnInit() {
    this.stepConfigurationForm = this.buildWorkflowStepConfigurationForm();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'DocumentType' },
      { field: 'convertToPdf', header: 'ConvertToPdf' },
    ];

    if (this.isEditMode) {
      this.stepConfigurationForm.patchValue(this.stepConfiguration);

      if (this.stepConfiguration.hasToReturnAllDocumentFromQAIndex) {
        this.disableQaIndexDocumentsApprovementPercent = true;
      }

      if (this.stepConfiguration.hasToReturnAllDocumentFromQAScan) {
        this.disableQaScanDocumentsApprovementPercent = true
      }

      this.setCheckBoxesBehavior(this.stepConfiguration);

      if (this.stepConfiguration.convertDocumentsToSearchablePdf) {
        this.cols.push({ field: 'ocr', header: 'OCR' });
      }
    }

    this.stepConfigurationForm.controls['convertDocumentsToSearchablePdf'].valueChanges.subscribe((value) => {
      if (value) {
        this.cols.push({ field: 'ocr', header: 'OCR' });
      } else {
        this.cols = [...this.cols.filter((col) => col.field !== 'ocr')];
      }
    });

    this.canUseAbbyyEngine = await this.configurationService.canUseOcrEngine(OcrEngine.Abbyy);
    this.canUseIrisEngine = await this.configurationService.canUseOcrEngine(OcrEngine.OcrModuleLicense);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documentTypesSelected']) {
      const newDocumentTypes = changes['documentTypesSelected'].currentValue.filter((data) => !changes['documentTypesSelected']
        .previousValue.some((previous) => data.documentType.id === previous.documentType.id));

      newDocumentTypes.forEach((data) => {
        data.convertToPdf = true;
        data.recognizeDocumentOcr = true;
      });
    }
  }

  isAllDocumentTypesWillBeConvertToPdf() {
    return this.documentTypesSelected.every(docType => docType.convertToPdf);
  }

  isAllDocumentTypesWillBeConvertToPdfOCR() {
    return this.documentTypesSelected.every(docType => docType.recognizeDocumentOcr);
  }

  checkAllDocumentTypesToConvertToPdf() {
    let value = false;
    if (!this.isAllDocumentTypesWillBeConvertToPdf()) {
      value = true;
    }
    if (this.isAllDocumentTypesWillBeConvertToPdfOCR() && !value) {
      this.documentTypesSelected.forEach(docType => {
        docType.recognizeDocumentOcr = value;
      });
    }
    this.documentTypesSelected.forEach(docType => {
      docType.convertToPdf = value;
    });
  }

  checkAllDocumentTypesToRecognizeDocumentOCR() {
    let value = false;
    if (!this.isAllDocumentTypesWillBeConvertToPdfOCR()) {
      value = true;
    }

    if (value) {
      this.documentTypesSelected.forEach(docType => {
        docType.convertToPdf = value;
      });
    }
    this.documentTypesSelected.forEach(docType => {
      docType.recognizeDocumentOcr = value;
    });
  }

  checkDocumentTypeWillBeConvertedToPdf(id) {
    const ok = this.documentTypesSelected.some(doc => doc.documentType.id === id && doc.convertToPdf);
    return ok;
  }

  checkDocumentTypeWillBeConvertedToPdfOCR(id) {
    return this.documentTypesSelected.some(doc => doc.documentType.id === id && doc.recognizeDocumentOcr);
  }

  checkConvertToPdfControl() {
    return this.stepConfigurationForm.controls['hasToConvertToPdfToRelease'].value;
  }

  checkChangeOnConvertToPdf(documentType) {
    if (!documentType.convertToPdf) {
      documentType.recognizeDocumentOcr = false;
    }
  }

  checkChangeOnRecognizeOcr(documentType) {
    if (documentType.recognizeDocumentOcr) {
      documentType.convertToPdf = true;
    }
  }

  checkConvertToPdfOCRControl() {
    return this.stepConfigurationForm.controls['convertDocumentsToSearchablePdf'].value;
  }

  buildWorkflowStepConfigurationForm(): FormGroup {
    if (!this.isEditMode) {
      return this.formBuilder.group({
        isMultipleIndexingActive: [false],
        isActiveQaScan: [false],
        isActiveQaIndex: [false],
        hasIndexSupervision: [false],
        hasExternalValidation: [false],
        hasToReturnAllDocumentFromQAScan: [false],
        hasToConvertToPdfToRelease: [false],
        convertDocumentsToSearchablePdf: [false],
        hasToReturnAllDocumentFromQAIndex: [false],
        pdfSearchableEngine: ['tesseract'],
        qaScanScannedDocumentsPercent: new FormControl(
          {
            value: 0,
            disabled: true
          },
          [
            Validators.min(WorkflowStepsConfiguration.minQaPercent),
            Validators.max(WorkflowStepsConfiguration.maxQaPercent),
            Validators.required
          ]
        ),
        qaScanDocumentsApprovementPercent: new FormControl(
          { value: 0, disabled: true },
          [
            Validators.min(WorkflowStepsConfiguration.minQaPercent),
            Validators.max(WorkflowStepsConfiguration.maxQaPercent),
            Validators.required
          ]
        ),
        qaIndexScannedDocumentsPercent: new FormControl(
          { value: 1, disabled: true },
          [
            Validators.min(WorkflowStepsConfiguration.minQaPercent),
            Validators.max(WorkflowStepsConfiguration.maxQaPercent),
            Validators.required
          ]
        ),
        qaIndexDocumentsApprovementPercent: new FormControl(
          { value: 1, disabled: true },
          [
            Validators.min(WorkflowStepsConfiguration.minQaPercent),
            Validators.max(WorkflowStepsConfiguration.maxQaPercent),
            Validators.required
          ]
        ),
        indexingNumbers: new FormControl({ value: 1, disabled: true }, [
          Validators.min(
            WorkflowStepsConfiguration.minIndexingNumberWithMultipleIndexing
          ),
          Validators.max(WorkflowStepsConfiguration.maxIndexingNumber),
          Validators.required
        ])
      });
    }

    return this.formBuilder.group({
      isMultipleIndexingActive: [false],
      isActiveQaScan: [false],
      isActiveQaIndex: [false],
      hasIndexSupervision: [false],
      hasExternalValidation: [false],
      hasToConvertToPdfToRelease: [false],
      convertDocumentsToSearchablePdf: [false],
      hasToReturnAllDocumentFromQAScan: [false],
      hasToReturnAllDocumentFromQAIndex: [false],
      pdfSearchableEngine: ['tesseract'],
      qaScanScannedDocumentsPercent: new FormControl(
        { value: 0, disabled: true },
        [
          Validators.min(WorkflowStepsConfiguration.minQaPercent),
          Validators.max(WorkflowStepsConfiguration.maxQaPercent),
          Validators.required
        ]
      ),
      qaScanDocumentsApprovementPercent: new FormControl(
        { value: 0, disabled: true },
        [
          Validators.min(WorkflowStepsConfiguration.minQaPercent),
          Validators.max(WorkflowStepsConfiguration.maxQaPercent),
          Validators.required
        ]
      ),
      qaIndexScannedDocumentsPercent: new FormControl(
        { value: 0, disabled: true },
        [
          Validators.min(WorkflowStepsConfiguration.minQaPercent),
          Validators.max(WorkflowStepsConfiguration.maxQaPercent),
          Validators.required
        ]
      ),
      qaIndexDocumentsApprovementPercent: new FormControl(
        { value: 0, disabled: true },
        [
          Validators.min(WorkflowStepsConfiguration.minQaPercent),
          Validators.max(WorkflowStepsConfiguration.maxQaPercent),
          Validators.required
        ]
      ),
      indexingNumbers: new FormControl({ value: 1, disabled: true }, [
        Validators.min(
          WorkflowStepsConfiguration.minIndexingNumberWithMultipleIndexing
        ),
        Validators.max(WorkflowStepsConfiguration.maxIndexingNumber),
        Validators.required
      ])
    });
  }

  isFieldInvalid(field: string) {
    return (
      !this.stepConfigurationForm.get(field).valid &&
      this.stepConfigurationForm.get(field).touched
    );
  }

  getHasToConvertToPdfToReleaseValue() {
    return this.stepConfigurationForm.controls['hasToConvertToPdfToRelease'].value;
  }

  hasToConvertToPdfSearchable() {
    return this.stepConfigurationForm.controls['convertDocumentsToSearchablePdf'].value;
  }

  setCheckBoxesBehavior(data: WorkflowStepsConfiguration) {
    if (data.isMultipleIndexingActive) {
      this.changeIndexingNumberConfigurationVisibility();
    }

    if (data.isActiveQaScan) {
      this.changeQaScanConfigurationVisibility();
    }

    if (data.isActiveQaIndex) {
      this.changeQaIndexConfigurationVisibility();
    }

    this.hasIndexSupervision = data.hasIndexSupervision;
    this.hasExternalValidation = data.hasExternalValidation;
    this.hasToReturnAllDocumentFromQAScan = data.hasToReturnAllDocumentFromQAScan;
    this.hasToConvertToPdfToRelease = data.hasToConvertToPdfToRelease;
    this.convertDocumentsToSearchablePdf = data.convertDocumentsToSearchablePdf;
    this.hasToReturnAllDocumentFromQAIndex = data.hasToReturnAllDocumentFromQAIndex;
  }

  changeQaScanConfigurationVisibility(): void {
    this.isActiveQaScan = !this.isActiveQaScan;
    if (this.isActiveQaScan) {
      this.stepConfigurationForm.controls[
        'qaScanScannedDocumentsPercent'
      ].enable();
      this.stepConfigurationForm.controls[
        'qaScanDocumentsApprovementPercent'
      ].enable();
    } else {
      this.stepConfigurationForm.controls[
        'qaScanScannedDocumentsPercent'
      ].disable();
      this.stepConfigurationForm.controls[
        'qaScanScannedDocumentsPercent'
      ].setValue(0);

      this.stepConfigurationForm.controls[
        'qaScanDocumentsApprovementPercent'
      ].disable();
      this.stepConfigurationForm.controls[
        'qaScanDocumentsApprovementPercent'
      ].setValue(0);
    }
  }

  changeQaIndexConfigurationVisibility(): void {
    this.isActiveQaIndex = !this.isActiveQaIndex;
    if (this.isActiveQaIndex) {
      this.stepConfigurationForm.controls[
        'qaIndexScannedDocumentsPercent'
      ].enable();
      this.stepConfigurationForm.controls[
        'qaIndexDocumentsApprovementPercent'
      ].enable();
    } else {
      this.stepConfigurationForm.controls[
        'qaIndexScannedDocumentsPercent'
      ].disable();
      this.stepConfigurationForm.controls[
        'qaIndexScannedDocumentsPercent'
      ].setValue(0);

      this.stepConfigurationForm.controls[
        'qaIndexDocumentsApprovementPercent'
      ].disable();
      this.stepConfigurationForm.controls[
        'qaIndexDocumentsApprovementPercent'
      ].setValue(0);
    }
  }

  changeIndexingNumberConfigurationVisibility(): void {
    this.isActiveMultipleIndexing = !this.isActiveMultipleIndexing;

    if (this.isActiveMultipleIndexing) {
      this.activateMultipleIndexingBehavior();
    } else {
      this.activeNormalIndexingBehavior();
    }
  }

  public getFormValues() {
    return this.stepConfigurationForm.getRawValue();
  }

  activateMultipleIndexingBehavior(): void {
    if (this.isEditMode) {
      this.stepConfigurationForm.controls['indexingNumbers'].enable();
      const indexingNumber =
        this.stepConfigurationForm.controls['indexingNumbers'].value >=
          WorkflowStepsConfiguration.minIndexingNumberWithMultipleIndexing
          ? this.stepConfigurationForm.controls['indexingNumbers'].value
          : WorkflowStepsConfiguration.minIndexingNumberWithMultipleIndexing;
      this.stepConfigurationForm.controls['indexingNumbers'].setValue(
        indexingNumber
      );
    } else {
      this.stepConfigurationForm.controls['indexingNumbers'].setValue(
        WorkflowStepsConfiguration.minIndexingNumberWithMultipleIndexing
      );
      this.stepConfigurationForm.controls['indexingNumbers'].enable();
    }
  }

  activeNormalIndexingBehavior() {
    this.stepConfigurationForm.controls['indexingNumbers'].setValue(
      WorkflowStepsConfiguration.minIndexingNumber
    );
    this.stepConfigurationForm.controls['indexingNumbers'].disable();
  }

  validateIfReturnAll = () => {
    this.disableQaIndexDocumentsApprovementPercent = this.stepConfigurationForm.controls["hasToReturnAllDocumentFromQAIndex"].value === true;
    this.disableQaScanDocumentsApprovementPercent = this.stepConfigurationForm.controls["hasToReturnAllDocumentFromQAScan"].value === true;
  }
}
