import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ApiPageService } from '../../../../../../../../services/api/api-page.service';
import { BarCodeReaderComponent } from "../bar-code-reader/bar-code-reader.component";
import { CommonModule } from '@angular/common';
import { DocumentSeparatorType } from '../../../../../../../../enums/document-separator-type.enum';
import { DocumentsSplitter } from '../../../../../../../../interface/documents-splitter';
import { InputNumberModule } from 'primeng/inputnumber';
import { ModalComponent } from "../../../../../../../../shared/modal/modal.component";

@Component({
  selector: 'app-document-split-configuration',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, InputNumberModule, ModalComponent, BarCodeReaderComponent],
  templateUrl: './document-split-configuration.component.html',
  styleUrl: './document-split-configuration.component.css'
})
export class DocumentSplitConfigurationComponent {
  public splitDocumentConfigurationForm: FormGroup;
  @ViewChild('barcodeReader') barcodeReaderComponent: BarCodeReaderComponent;
  // @ViewChild('barcodeConfiguration') barcodeConfigurationModal: ModalDirective;
  showPageQuantityConfiguration = false;
  showMixedBarcodeConfiguration = false;
  showUseComposeConfiguration = false;
  showKeepPageSeparator = false;

  @Input() splitDocumentConfiguration: DocumentsSplitter;
  @Input() editMode: boolean;
  @Input() useCompose = false;
  @Input() workflowId: number;

  documentSplitterTypes: any[] = [];
  splitterType: any;
  barcodeConfigurationSelected: any;
  barcodeUpdated = false;
  barcodeOnAdvanceMode: boolean;
  isConfigurationOpen:boolean = false

  /**
   * Represents the constructor of this component.
   */
  constructor(
    private splitDocumentFb: FormBuilder,
    private translateService: TranslateService,
    private pageService: ApiPageService
    ) {
    this.splitDocumentConfigurationForm = this.buildConfigurationForm();
    this.loadDocumentSplitterTypes();
    this.changeComboBoxesDefaultItemLanguage();
  }

  buildConfigurationForm(): FormGroup {
    return this.splitDocumentFb.group({
      documentSplitterType: [DocumentSeparatorType.pageQuantity, Validators.required],
      pageQuantity: new FormControl(1, [Validators.min(1)]),
      separatorExpectedValue: [''],
      barcodeFormat: [''],
      useCompose: [false],
      keepPageSeparator: [true]
    });
  }

  loadDocumentSplitterTypes() {
    this.translateService.get(['ChooseAnOptionDescription']).subscribe(res => {
      this.setDefaultComboBoxItem(res);
    });

    this.documentSplitterTypes.push(
      {id: 'PageQuantity', name: 'PageQuantity'},
      {id: 'Barcode', name: 'Barcode'},
      {id: 'ProDoctivityQR', name: 'ProDoctivityQR'},
      {id: 'Mixed', name: 'Mixed'}
    );

    this.splitterType = this.documentSplitterTypes[0];
  }

  setDefaultComboBoxItem(translation) {
    this.documentSplitterTypes.unshift({id: '-1', name: translation.ChooseAnOptionDescription});
  }

  onBarcodeConfigurationSelected(configuration) {
    this.barcodeConfigurationSelected = configuration;
    this.splitDocumentConfigurationForm.controls['separatorExpectedValue']
    .setValue(configuration.value);
    this.splitDocumentConfigurationForm.controls['barcodeFormat']
    .setValue(configuration.barcodeFormat);
    this.barcodeOnAdvanceMode = false;
    this.hideModal();
  }

  clearBarcodeData() {
    this.barcodeConfigurationSelected = undefined;
    this.splitDocumentConfigurationForm.controls['separatorExpectedValue'].reset();
    this.splitDocumentConfigurationForm.controls['barcodeFormat'].reset();
  }

  onBarcodeConfigurationSelectedOnAdvanceMode(configuration) {
    this.barcodeConfigurationSelected = configuration;
    this.splitDocumentConfigurationForm.controls['separatorExpectedValue']
    .setValue(configuration.value);
    this.splitDocumentConfigurationForm.controls['barcodeFormat']
    .setValue(configuration.barcodeFormat);
    this.barcodeOnAdvanceMode = true;
    this.hideModal();
  }

  canShowScanBarcodeReader() {
    return this.splitDocumentConfigurationForm.controls['documentSplitterType'].value === 'Barcode' &&
    !(this.splitDocumentConfigurationForm.controls['useCompose'].value);
  }

  changeComboBoxesDefaultItemLanguage() {
    const keys = ['ChooseAnOptionDescription', 'PageQuantity', 'Barcode', 'ProDoctivityQR', 'Mixed'];
    const translation = this.translateService.instant(keys);
    this.documentSplitterTypes = keys.map(element => {
      return {
        id: element, name: translation[element]
      };
    });
  }

  isBarcodeComposedSelected() {
    return this.splitDocumentConfigurationForm.controls['useCompose'].value;
  }

  ngOnInit() {
    if (this.editMode && this.splitDocumentConfiguration !== undefined) {
      this.setFormValue();
    }

    this.subscribeToFormValueChanges();
  }

  getFormConfiguration(): DocumentsSplitter {
    const configuration = this.splitDocumentConfigurationForm.getRawValue() as DocumentsSplitter;
    configuration.WorkflowId = this.workflowId;
    configuration.documentSplitterType = this.splitterType.id;
    if (this.barcodeConfigurationSelected && [DocumentSeparatorType.barcode, DocumentSeparatorType.mixed].includes(this.splitterType.id)) {

      configuration.barcodeLocationConfiguration = this.barcodeConfigurationSelected.barcodeLocationConfiguration;

      if (!this.barcodeOnAdvanceMode) {
        configuration.barcodeLocationConfiguration.base64String = this.barcodeReaderComponent.base64String;
        configuration.barcodeLocationConfiguration.updated = this.barcodeUpdated;
        configuration.barcodeLocationConfiguration.resultPoints = configuration.barcodeLocationConfiguration
        .resultPoints.map((point: any) => {
          point = point.map(String).join(',');
          return point;
        });
      }
    }

    return configuration;
  }

  private setFormValue() {
    const formConfig = this.buildFormConfiguration()[this.splitDocumentConfiguration.documentSplitterType];
    if (formConfig === null || formConfig === undefined) {
      this.splitterType = this.documentSplitterTypes[0];
      this.splitDocumentConfigurationForm.patchValue({
        ...this.splitDocumentConfiguration,
        pageQuantity: JSON.parse(this.splitDocumentConfiguration.configuration)['pageQuantityToSplit'] || 1,
        useCompose: false,
        keepPage: false
      });
    } else {
      this.showPageQuantityConfiguration = formConfig.showPageQuantityConfiguration;
      this.showMixedBarcodeConfiguration = formConfig.showMixedBarcodeConfiguration;
      const useComposed = this.useCompose;
      this.splitterType = this.documentSplitterTypes[formConfig.index];
      this.splitDocumentConfigurationForm.patchValue({
        ...this.splitDocumentConfiguration,
        pageQuantity: this.useCompose
        ? 1
        : this.validateConfigurationJson() ?
         JSON.parse(this.splitDocumentConfiguration.configuration)['pageQuantityToSplit'] : 1,
        useCompose: useComposed,
        keepPage: true
      });
      if (this.valideBarcodeOrMixedRecognitionType(useComposed)) {
          if (!this.splitDocumentConfiguration.barcodeLocationConfiguration) {
            this.barcodeConfigurationSelected = this.splitDocumentConfiguration.barcodeLocationConfiguration;
            this.splitDocumentConfigurationForm.controls['separatorExpectedValue']
            .setValue(this.splitDocumentConfiguration.separatorExpectedValue);
            this.splitDocumentConfigurationForm.controls['barcodeFormat']
            .setValue(this.splitDocumentConfiguration.barcodeFormat);
          }

          const data = this.splitDocumentConfiguration.barcodeLocationConfiguration;
          if (data) {
            this.pageService
            .getComposedBarcodeConfigurationBase64Image(data.id).then( (base64String) => {
              this.barcodeReaderComponent.createMode = false;
              this.barcodeReaderComponent.uploadImage(base64String, data);

              this.splitDocumentConfigurationForm.controls['separatorExpectedValue']
              .setValue(this.splitDocumentConfiguration.separatorExpectedValue);
              this.barcodeConfigurationSelected = this.barcodeReaderComponent.barcodeSelected;
            });
          } else {
            this.barcodeOnAdvanceMode = true;
            const barcode = this.splitDocumentConfigurationForm.getRawValue();
            barcode.extractedDataExample = barcode.separatorExpectedValue;
            this.barcodeReaderComponent.configureBarcodeData(barcode);
          }
          this.splitDocumentConfigurationForm.controls['keepPageSeparator']
          .setValue(this.splitDocumentConfiguration.keepPageSeparator);
        }

      this.configurateSeparatorExpectedValue();
    }
  }

  valideBarcodeOrMixedRecognitionType(useComposed: boolean) {
    return  ([DocumentSeparatorType.barcode].includes(this.splitterType.id) && !useComposed)
    || [DocumentSeparatorType.mixed].includes(this.splitterType.id);
  }

  validateConfigurationJson() {
    return this.splitDocumentConfiguration.configuration !== ''
    && this.splitDocumentConfiguration.configuration.includes('pageQuantityToSplit');
  }

  isDocumentSplitterInvalid() {
    return this.splitDocumentConfigurationForm.invalid ||
    (this.splitDocumentConfigurationForm.controls['documentSplitterType'].value.id === DocumentSeparatorType.barcode
    && !this.splitDocumentConfigurationForm.controls['useCompose'].value
    && (!this.barcodeConfigurationSelected && !this.barcodeOnAdvanceMode));
  }

  private configurateSeparatorExpectedValue() {
    const configuration = this.validateConfigurationJson()
    ? JSON.parse(this.splitDocumentConfiguration.configuration).length : 0;
    if (configuration !== 0) {
      const control = this.splitDocumentConfigurationForm.get('separatorExpectedValue');
      control.disable();
    }
  }

  hideModal() {
    // this.barcodeConfigurationModal.hide();
  }

  private subscribeToFormValueChanges() {
    const pageQuantityFormControl = this.splitDocumentConfigurationForm.get('pageQuantity');
    const separatorExpectedValueFormControl = this.splitDocumentConfigurationForm.get('separatorExpectedValue');
    this.splitDocumentConfigurationForm.get('documentSplitterType').valueChanges.subscribe(val => {

      if (val.id === 'ChooseAnOptionDescription') {
        pageQuantityFormControl.setValidators([Validators.required, Validators.min(1)]);
        separatorExpectedValueFormControl.clearValidators();
        this.showPageQuantityConfiguration = false;
        this.showMixedBarcodeConfiguration = false;
        this.showUseComposeConfiguration = false;
        this.showKeepPageSeparator = false;
      } else if (val.id === DocumentSeparatorType.pageQuantity) {
        pageQuantityFormControl.setValidators([Validators.required, Validators.min(1)]);
        separatorExpectedValueFormControl.clearValidators();
        this.showPageQuantityConfiguration = true;
        this.showMixedBarcodeConfiguration = false;
        this.showUseComposeConfiguration = false;
        this.showKeepPageSeparator = false;
      } else if (val.id === DocumentSeparatorType.barcode) {
        pageQuantityFormControl.clearValidators();
        this.showPageQuantityConfiguration = false;
        this.showMixedBarcodeConfiguration = true;
        this.showUseComposeConfiguration = true;
        this.showKeepPageSeparator = true;
      } else if (val.id === DocumentSeparatorType.mixed) {
        separatorExpectedValueFormControl.setValidators(Validators.required);
        pageQuantityFormControl.clearValidators();
        const control = this.splitDocumentConfigurationForm.get('separatorExpectedValue');
        const controlValue = control.value;
        this.splitDocumentConfigurationForm.patchValue({
          useCompose: false,
          keepPageSeparator: this.splitDocumentConfiguration ? this.splitDocumentConfiguration.keepPageSeparator : false
        });
        this.splitDocumentConfigurationForm.patchValue({
          separatorExpectedValue: controlValue
        });
        control.enable();
        this.showPageQuantityConfiguration = false;
        this.showMixedBarcodeConfiguration = true;
        this.showUseComposeConfiguration = false;
        this.showKeepPageSeparator = true;
      } else {
        separatorExpectedValueFormControl.clearValidators();
        pageQuantityFormControl.clearValidators();
        this.showPageQuantityConfiguration = false;
        this.showMixedBarcodeConfiguration = false;
        this.showUseComposeConfiguration = false;
        this.showKeepPageSeparator = false;
      }

      pageQuantityFormControl.updateValueAndValidity();

    });
    this.splitDocumentConfigurationForm.get('useCompose').valueChanges.subscribe(value => {
      const control = this.splitDocumentConfigurationForm.get('separatorExpectedValue');
      control.disabled ? control.enable() : control.disable();
      control.setValue('');
    });
  }

  private buildFormConfiguration() {
    return {
      [DocumentSeparatorType.pageQuantity]: {
        showPageQuantityConfiguration: true,
        showMixedBarcodeConfiguration: false,
        index: 1
      },
      [DocumentSeparatorType.barcode]: {
        showPageQuantityConfiguration: false,
        showMixedBarcodeConfiguration: true,
        index: 2
      },
      [DocumentSeparatorType.proDoctivityQr]: {
        showPageQuantityConfiguration: false,
        showMixedBarcodeConfiguration: false,
        index: 3
      },
      [DocumentSeparatorType.mixed]: {
        showPageQuantityConfiguration: false,
        showMixedBarcodeConfiguration: true,
        index: 4
      },
    };
  }

  closeModal = () => {
    this.isConfigurationOpen = false
  }

  openConfigurationModal = () => {
    this.isConfigurationOpen = true
  }
}
