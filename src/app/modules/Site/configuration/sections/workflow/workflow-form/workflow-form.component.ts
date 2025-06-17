import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomTabComponent, CustomTabsComponent } from './components/custom-tabs/custom-tabs.component';
import { ToastNotificationService, ToastType } from '../../../../../../services/toast-notification.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ApiComposeBarcodeConfigurationService } from '../../../../../../services/api/api-compose-barcode-configuration.service';
import { ApiConfigurationService } from '../../../../../../services/api/configuration.service';
import { ApiDocumentTypeService } from '../../../../../../services/api/api-document-type.service';
import { ApiExternalPropertiesService } from '../../../../../../services/api/api-external-properties.service';
import { ApiRoleService } from '../../../../../../services/api/api-role.service';
import { ApiVolumeService } from '../../../../../../services/api/api-volume.service';
import { ApiWorkflowService } from '../../../../../../services/api/api-workflow.service';
import { AutoName } from '../../../../../../models/auto-name';
import { AutoNameComponent } from "./components/auto-name/auto-name.component";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComposedBarcodeConfiguration } from '../../../../../../models/composed-barcode-configuration';
import { CompoundSplittersAssignments } from '../../../../../../models/compound-splitters-assigments';
import { ConfigurationService } from '../../../../../../services/ribbons/configuration.service';
import { CurrentUserService } from '../../../../../../services/current-user.service';
import { DocumentSeparatorType } from '../../../../../../enums/document-separator-type.enum';
import { DocumentSplitConfigurationComponent } from "./components/document-split-configuration/document-split-configuration.component";
import { DocumentType } from '../../../../../../models/document-types';
import { DocumentTypesComponent } from './components/document-types/document-types.component';
import { DocumentsSplitter } from '../../../../../../interface/documents-splitter';
import { DropdownModule } from 'primeng/dropdown';
import { ExternalPropertiesAssigments } from '../../../../../../models/external-properties-assigments';
import { ExternalPropertiesConfigurationComponent } from "./components/external-properties-configuration/external-properties-configuration.component";
import { ExternalProperty } from '../../../../../../models/external-property';
import { Restriction } from '../../../../../../models/Restriction';
import { RestrictionsComponent } from "./components/restrictions/restrictions.component";
import { RoleWorkflowsAssignment } from '../../../../../../models/role-workflows-assignmets';
import { SpecialPermissionComponent } from './components/special-permission/special-permission.component';
import { StepConfigurationComponent } from "./components/step-configuration/step-configuration.component";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Volume } from '../../../../../../interface/volume';
import { Workflow } from '../../../../../../models/workflow';
import { WorkflowDocumentTypeAssignment } from '../../../../../../models/workflow-document-type-assignment';
import { WorkflowSplitterModel } from '../../../../../../models/workflow-splitter-model';
import { WorkflowStepsConfiguration } from '../../../../../../models/workflow-steps-configuration';

@Component({
  selector: 'app-workflow-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule, DropdownModule, CommonModule, TabsModule, SpecialPermissionComponent, CustomTabComponent, CustomTabsComponent, ExternalPropertiesConfigurationComponent,
    AutoNameComponent, StepConfigurationComponent, DocumentSplitConfigurationComponent, DocumentTypesComponent, RestrictionsComponent],
  templateUrl: './workflow-form.component.html',
  styleUrl: './workflow-form.component.css',
  providers: [CurrentUserService]
})
export class WorkflowFormComponent {
  workflowForm: FormGroup;
  isEditMode = false;
  autoNames: Array<AutoName> = [];
  documentTypes: Array<WorkflowDocumentTypeAssignment> = [];
  assignedDocumentTypes: Array<WorkflowDocumentTypeAssignment> = [];
  autoNameExample = '';
  autoNameControl: AbstractControl;
  workflowStepConfiguration: WorkflowStepsConfiguration;
  selectedVolume: Volume;
  barcodeConfiguration: WorkflowSplitterModel;
  loaded = false;
  useComposed = false;
  volumes: Array<any> = [];
  isBtnDefaultVisible = false;
  currentAssignmentDocumentType: any;
  areDocumentTypeLoaded = false;
  isActiveDocumentLimitPerBatch = false;
  isActivePageLimitPerBatch = false;
  documentSplitterConfiguration: DocumentsSplitter;
  workflowid: number;
  currentSpecialPermissions: string;
  externalProperties: Array<ExternalProperty> = [];
  assignedExternalProperties: Array<ExternalProperty> = [];
  currentDefaultDocumentType: DocumentType;
  compoundSplitters: Array<ComposedBarcodeConfiguration> = [];
  assignedCompoundSplitters: Array<ComposedBarcodeConfiguration> = [];
  allComposeBarcodeConfigurations: ComposedBarcodeConfiguration[];
  currentComposeBarcodeSelection: CompoundSplittersAssignments[] = [];
  currentExternalPropertiesAssignment: ExternalPropertiesAssigments[];
  pageSizePerBatchLimit: number;
  pageSizePerBatchLimitWarning: any;
  pageSizePerImageLimit: number;
  pageSizePerImageLimitWarning: number;
  administratorRoleId = '1';
  permissionTo: 'AllRoles' | 'OnlyAdminRole' | 'SetAccessLater' = 'SetAccessLater'
  workflowNameExpression: string = ''

  // @ViewChild('barcodeConfig') barcodeconfig: BarCodeConfigurationComponent;
  // @ViewChild('splitDocumentConfigurationForm') splitDocumentConfiguration: DocumentSplitConfigurationComponent;
  // @ViewChild('stepConfigurationForm') stepConfigurationForm: StepConfigurationComponent;
  // @ViewChild('specialPermission') specialPermissions: WorkflowSpecialPermissionsComponent;
  // @ViewChild('modalContainer') modalContainer: ModalContainerComponent;
  // @ViewChild('externalPropertiesComponent') externalPropertiesComponent: ExternalPropertiesConfigurationComponent;
  // @ViewChild('compoundSplittersComponent') compoundSplittersComponent: CompoundSplittersConfigurationComponent;

  constructor(
    private formBuilder: FormBuilder,
    private toastNotificationsService: ToastNotificationService,
    private translateService: TranslateService,
    private workflowService: ApiWorkflowService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private configurationService: ApiConfigurationService,
    private configurationRibbonService: ConfigurationService,
    private documentTypesService: ApiDocumentTypeService,
    private volumeService: ApiVolumeService,
    private externalPropertiesService: ApiExternalPropertiesService,
    private currentUserService: CurrentUserService,
    private rolesService: ApiRoleService,
    private composedBarcodeConfigurationService: ApiComposeBarcodeConfigurationService
  ) {
  }

  ngOnInit(): void {
    this.configurationRibbonService.emitSetWorkflowAdministrationActive();
    const workflowId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.isEditMode = workflowId > 0;
    this.workflowForm = this.buildWorkflowForm();
    this.autoNameControl = this.workflowForm.controls['autoName'];
    this.prepareAutoNameRefreshSubscription();
    this.configurationService.getAutoNameVariables().then(autoNames => {
      this.autoNames = autoNames;
      if (!this.isEditMode) {
        this.addDefaultAutoName();
        this.loaded = true;
      }
      this.refreshAutoNameExample(this.autoNameControl.value);
    });
    const getDocumentTypes = this.documentTypesService.getDocumentTypes();
    const getAllVolumes = this.volumeService.getAllVolumes();
    const getAllExternalProperties = this.externalPropertiesService.getExternalPropertiesConfiguration();
    const getAllCompoundSplitters = this.composedBarcodeConfigurationService.getComposedBarcodeConfigurations();

    if (this.isEditMode) {
      const getAssignedDocumentTypes = this.documentTypesService.getDocumentTypesThatBelongToWorkflow(workflowId);
      const getWorkflowData = this.workflowService.getWorkflowById(workflowId);

      Promise.all([getDocumentTypes, getAssignedDocumentTypes, getAllVolumes,
        getWorkflowData, getAllExternalProperties, getAllCompoundSplitters])
        .then(([documentTypes, assignedDocumentTypes, volumes, workflowData, externalProperties, compoundSplittersConfig]) => {
          this.documentTypes = documentTypes.filter(documentType => documentType.status === 'Active')
            .filter(documentType => {
              return !assignedDocumentTypes.some((assignedDocumentType) => assignedDocumentType.documentTypeId === documentType.id);
            }).map((documentType) => this.buildDocumentAssignment(documentType, 0));

          this.workflowStepConfiguration = workflowData.workflowStepsConfiguration;
          this.workflowForm.patchValue(workflowData);
          this.pageSizePerBatchLimit = workflowData.limitSizePerBatch;
          this.pageSizePerBatchLimitWarning = workflowData.limitSizePerBatchWarning;
          this.pageSizePerImageLimit = workflowData.limitSizeOfImage;
          this.pageSizePerImageLimitWarning = workflowData.limitSizeOfImageWarning;
          this.workflowNameExpression = workflowData.autoName

          this.currentDefaultDocumentType = documentTypes.
            find(x => x.id === (workflowData as any).workflowDocumentsTypeAssignments
              .find(dt => dt.isDefault).documentTypeId);

          this.setCheckBoxesBehavior(workflowData);

          if (workflowData.workflowSplitterConfiguration && workflowData
            .workflowSplitterBarcodeLocationConfigurations && workflowData
              .workflowSplitterBarcodeLocationConfigurations.length > 0) {

            workflowData.workflowSplitterConfiguration.barcodeLocationConfiguration = workflowData
              .workflowSplitterBarcodeLocationConfigurations[0].barcodeLocationConfiguration;
          }

          this.barcodeConfiguration = workflowData.workflowSplitterConfiguration;
          if (workflowData.documentsSplitter.documentSplitterType === DocumentSeparatorType.composeBarcode) {
            workflowData.documentsSplitter.documentSplitterType = DocumentSeparatorType.barcode;
          }
          this.documentSplitterConfiguration = workflowData.documentsSplitter;
          this.workflowid = workflowData.id;
          this.currentSpecialPermissions = workflowData.specialPermissions;
          this.assignedDocumentTypes = assignedDocumentTypes;
          this.externalProperties = externalProperties.filter(externalProperty =>
            !workflowData.externalPropertyAssigments.some(property => property.externalPropertyId === externalProperty.id));

          this.assignedExternalProperties = externalProperties.filter(externalProperty =>
            workflowData.externalPropertyAssigments.some(property => property.externalPropertyId === externalProperty.id));

          this.compoundSplitters = compoundSplittersConfig.filter(splitter =>
            !workflowData.compoundSplittersWorkflowAssigments.some(property => property.composedBarcodeConfigurationId === splitter.id));

          this.allComposeBarcodeConfigurations = compoundSplittersConfig;

          this.assignedCompoundSplitters = compoundSplittersConfig.filter(compoundSplitter =>
            workflowData.compoundSplittersWorkflowAssigments
              .some(splitter => splitter.composedBarcodeConfigurationId === compoundSplitter.id));

          this.useComposed = this.assignedCompoundSplitters && this.assignedCompoundSplitters.length > 0
            && this.documentSplitterConfiguration.configuration === ''
            && this.documentSplitterConfiguration.documentSplitterType === DocumentSeparatorType.barcode;

          this.areDocumentTypeLoaded = true;

          if (volumes.message !== 'NotVolumeFound') {
            this.getVolumeModel(volumes.operationResult);
            this.selectedVolume = this.volumes.find(x => x.id === workflowData.volumeId);
          } else {
            this.translateService.get(['ErrorOccurredDescription', 'NotStorageVolumeFound']).subscribe(res => {
              this.toastNotificationsService.show({ title: res.ErrorOccurredDescription, message: res.NotStorageVolumeFound, options: {} },
                ToastType.Error);
            });
          }
          this.loaded = true;
        });

    } else {
      getDocumentTypes.then((documentTypes) => {
        this.documentTypes = documentTypes.filter(documentType => documentType.status === 'Active')
          .map((documentType) => this.buildDocumentAssignment(documentType, 0));
        this.areDocumentTypeLoaded = true;
      });
      getAllVolumes.then((volumes) => {
        if (volumes.message !== 'NotVolumeFound') {
          this.getVolumeModel(volumes.operationResult);
        } else {
          this.translateService.get(['ErrorOccurredDescription', 'NotStorageVolumeFound']).subscribe(res => {
            this.toastNotificationsService.show({ title: res.ErrorOccurredDescription, message: res.NotStorageVolumeFound, options: {} },
              ToastType.Error);
          });
        }
      });
      getAllExternalProperties.then(externalProperties => {
        this.externalProperties = externalProperties;
      });

      getAllCompoundSplitters.then(compoundSplitters => {
        this.compoundSplitters = compoundSplitters;
      });
    }
  }

  isCompoundSeparationConfigured(): boolean {
    const compoundSeparation = 'Barcode';
    const mixedSeparation = 'Mixed';

    // if (this.splitDocumentConfiguration === undefined) {
    //   return false;
    // }

    // if ((this.splitDocumentConfiguration.splitterType.id === compoundSeparation
    //   && this.splitDocumentConfiguration.isBarcodeComposedSelected()) ||
    //   this.splitDocumentConfiguration.splitterType.id === mixedSeparation) {
    //   return true;
    // }

    return false;
  }

  private buildDocumentAssignment(documentType, workflowId) {
    const assignment = new WorkflowDocumentTypeAssignment();
    assignment.documentTypeId = documentType.id;
    assignment.isDefault = false;
    assignment.workflowId = workflowId;
    assignment.documentType = documentType;
    return assignment;
  }

  getDefaultMessage() {
    const message = this.translateService.instant('Default');
    return `[${message}]`;
  }

  getVolumeModel(volumen: Volume[]) {
    this.volumes = volumen.map(vol => {
      return {
        label: vol.name,
        value: vol.id
      };
    });
  }

  onSubmit(): void {
    const workflow = this.workflowForm.getRawValue();
    let stepConfiguration: WorkflowStepsConfiguration;
    // stepConfiguration = this.stepConfigurationForm.getFormValues();
    if (this.isEditMode) {
      stepConfiguration.workflowStepsConfigurationId = this.workflowStepConfiguration.workflowStepsConfigurationId;
    }

    workflow.workflowStepsConfiguration = stepConfiguration;

    if (this.assignedDocumentTypes.length === 0) {
      this.translateService.get(['EmptyDocumentTypes', 'Workflow']).subscribe(res => {
        this.toastNotificationsService.show({ title: res.Workflow, message: res['EmptyDocumentTypes'], options: {} }, ToastType.Error);
      });
      return;
    }
    const hasDefaultDocumentType = this.assignedDocumentTypes.some((documentType) => documentType.isDefault);

    if (!hasDefaultDocumentType) {
      this.translateService.get(['EmptyDefaultDocumentType', 'Workflow']).subscribe(res => {
        this.toastNotificationsService.show({ title: res.Workflow, message: res['EmptyDefaultDocumentType'], options: {} }, ToastType.Error);
      });
      return;
    }

    // if (this.splitDocumentConfiguration.isDocumentSplitterInvalid()) {
    //   this.translateService.get(['InvalidDocumentSplitter', 'Workflow']).subscribe(res => {
    //     this.toastNotificationsService.show({ title: res.Workflow, message: res['InvalidDocumentSplitter'],options:{} }, ToastType.Error);
    //   });
    //   return;
    // }

    // workflow.workflowDocumentsTypeAssignments = this.stepConfigurationForm.documentTypesSelected.map((documentType) => {
    //   return {
    //     documentTypeId: documentType.documentTypeId,
    //     workflowId: workflow.id,
    //     isDefault: documentType.isDefault,
    //     recognizeDocumentOcr: documentType.recognizeDocumentOcr,
    //     convertToPdf: documentType.convertToPdf
    //   };
    // });

    this.isEditMode ? this.updateWorkflow(workflow) : this.saveNewWorkflow(workflow);
  }

  private updateWorkflow(workflow: Workflow): void {
    // workflow.workflowSplitterConfiguration = this.barcodeconfig.getFormData();
    // workflow.documentsSplitter = this.splitDocumentConfiguration.getFormConfiguration();
    // workflow.specialPermissions = this.specialPermissions.getSpecialPermissions();
    workflow.externalPropertyAssigments = this.currentExternalPropertiesAssignment;
    workflow.compoundSplittersWorkflowAssigments = this.currentComposeBarcodeSelection;
    workflow.limitSizePerBatch = this.pageSizePerBatchLimit;
    workflow.limitSizePerBatchWarning = this.pageSizePerBatchLimitWarning;
    workflow.limitSizeOfImage = this.pageSizePerImageLimit;
    workflow.limitSizeOfImageWarning = this.pageSizePerImageLimitWarning;
    this.workflowService.updateWorkflow(workflow).then(() => {
      this.translateService.get(['EditWorkflowSuccessMessage', 'Workflow']).subscribe(res => {
        this.toastNotificationsService.show({ title: res.Workflow, message: res.EditWorkflowSuccessMessage, options: {} },
          ToastType.Success);
        this.goToWorkflowList();
      });
    }).catch(error => {
      const failureMessage = error.error.message.toString();
      this.translateService.get([failureMessage, 'Workflow']).subscribe(res => {
        this.toastNotificationsService.show({ title: res.Workflow, message: res[failureMessage], options: {} }, ToastType.Error);
      });
    });
  }

  private saveNewWorkflow(newWorkflow: Workflow): void {
    // this.modalContainer.openModal();
    // this.modalContainer.modalTitle = 'ConfirmRoleAccessToNewWorkflow';
    // this.modalContainer.handleAffirmativeFunc = () => {
    //   this.modalContainer.handlerHide();
    //   this.onSaveNewWorkflow(newWorkflow);
    // }
    // return;
  }

  onSaveNewWorkflow(newWorkflow: Workflow) {
    // newWorkflow.workflowSplitterConfiguration = this.barcodeconfig.getFormData();
    // newWorkflow.documentsSplitter = this.splitDocumentConfiguration.getFormConfiguration();
    // newWorkflow.specialPermissions = this.specialPermissions.getSpecialPermissions();
    // newWorkflow.externalPropertyAssigments = this.externalPropertiesComponent.getAssignedExternalProperties();
    newWorkflow.compoundSplittersWorkflowAssigments = this.currentComposeBarcodeSelection;
    newWorkflow.limitSizePerBatch = this.pageSizePerBatchLimit;
    newWorkflow.limitSizePerBatchWarning = this.pageSizePerBatchLimitWarning;
    newWorkflow.limitSizeOfImage = this.pageSizePerImageLimit;
    newWorkflow.limitSizeOfImageWarning = this.pageSizePerImageLimitWarning;

    const rolesSet: Record<'AllRoles' | 'OnlyAdminRole' | 'SetAccessLater', Array<string>> = {
      'AllRoles': this.currentUserService.getCurrentUserRoles(),
      'OnlyAdminRole': [this.administratorRoleId],
      'SetAccessLater': []
    }

    const roles = rolesSet[this.permissionTo];
    console.log(roles);

    const promises = [];

    this.workflowService.saveNewWorkflow(newWorkflow).then((workflowId) => {
      this.translateService.get(['CreatedWorkflowSuccessMessage', 'CreateWorkflowModalTitle']).subscribe(res => {
        this.toastNotificationsService.show({ title: res.CreateWorkflowModalTitle, message: res.CreatedWorkflowSuccessMessage, options: {} },
          ToastType.Success);
      });

      roles.forEach(role => {
        const roleWorkflwAssignment: RoleWorkflowsAssignment = {
          roleId: role,
          workflowId: workflowId,
          accessPermitions: {
            dashboard: false,
            digitalize: true, configuration: false, controlPanel: false, index: false,
            indexSupervision: false, qaIndex: false, qaScan: false,
            canWorkOwnerDigitalizationBatches: false,
            canWorkOwnerQaScanBatches: false,
            canWorkOwnerIndexBatches: false,
            canWorkOwnerQaIndexBatches: false,
            canWorkOwnerIndexSupervisionDocuments: false,
            canWorkOwnerDigitalizationExceptionDocuments: false,
            digitalizacionException: false
          },
          queuePermissions: '{"digitalize":true}',
          workflow: null
        };
        promises.push(this.rolesService.assignWorkflow(Number.parseInt(role), roleWorkflwAssignment));
      });

      Promise.all(promises).then().catch((error) => {
        const failureMessage = error.error.message;
        this.translateService.get([failureMessage, 'CreateWorkflowModalTitle']).subscribe(res => {
          this.toastNotificationsService.show({ title: res.CreateWorkflowModalTitle, message: res[failureMessage], options: {} }, ToastType.Error);
        });
      });

      this.goToWorkflowList();
    }).catch(error => {
      const failureMessage = error.error.message;
      this.translateService.get([failureMessage, 'CreateWorkflowModalTitle']).subscribe(res => {
        this.toastNotificationsService.show({ title: res.CreateWorkflowModalTitle, message: res[failureMessage], options: {} }, ToastType.Error);
      });
    });
  }

  goToWorkflowList(): void {
    this.router.navigate(['configuration/workflow-List']);
  }

  isFormInvalid() {
    // return this.workflowForm.invalid && this.splitDocumentConfiguration && this.splitDocumentConfiguration.isDocumentSplitterInvalid();
  }

  buildWorkflowForm(): FormGroup {

    if (!this.isEditMode) {
      return this.formBuilder.group({
        name: ['', Validators.required],
        volumeId: ['', Validators.required],
        autoName: ['', Validators.required],
        hasAutomaticAssignmentForDocuments: [false],
        isMultipleIndexingActive: [false],
        isActiveQaScan: [false],
        isActiveQaIndex: [false],
        isActiveDocumentLimitPerBatch: [false],
        isActivePageLimitPerBatch: [false],
        isActiveIndexSupervision: [false],
        documentLimitPerBatchQuantity: new FormControl({
          value: 0,
          disabled: true
        }, [Validators.min(WorkflowStepsConfiguration.minDccumentsPerBatch), Validators.required]),
        documentLimitPerBatchAlert: new FormControl({
          value: 0,
          disabled: true
        }, [Validators.min(WorkflowStepsConfiguration.minDccumentsPerBatch), Validators.required]),
        pageLimitPerBatchQuantity: new FormControl({
          value: 0,
          disabled: true
        }, [Validators.min(WorkflowStepsConfiguration.minPagePerBatch), Validators.required]),
        pageLimitPerBatchAlert: new FormControl({
          value: 0,
          disabled: true
        }, [Validators.min(WorkflowStepsConfiguration.minPagePerBatch), Validators.required])
      });

    }
    return this.formBuilder.group({
      name: ['', Validators.required],
      volumeId: ['', Validators.required],
      autoName: ['', Validators.required],
      id: [0, Validators.required],
      hasAutomaticAssignmentForDocuments: [false],
      isMultipleIndexingActive: [false],
      isActiveQaScan: [false],
      isActiveQaIndex: [false],
      isActiveIndexSupervision: [false],
      isActiveDocumentLimitPerBatch: [false],
      isActivePageLimitPerBatch: [false],
      documentLimitPerBatchQuantity: new FormControl({
        value: 0,
        disabled: true
      }, [Validators.min(WorkflowStepsConfiguration.minDccumentsPerBatch), Validators.required]),
      documentLimitPerBatchAlert: new FormControl({
        value: 0,
        disabled: true
      }, [Validators.min(WorkflowStepsConfiguration.minDccumentsPerBatch), Validators.required]),
      pageLimitPerBatchQuantity: new FormControl({
        value: 0,
        disabled: true
      }, [Validators.min(WorkflowStepsConfiguration.minPagePerBatch), Validators.required]),
      pageLimitPerBatchAlert: new FormControl({
        value: 0,
        disabled: true
      }, [Validators.min(WorkflowStepsConfiguration.minPagePerBatch), Validators.required])
    });
  }

  setCheckBoxesBehavior(data: Workflow) {
    if (data.isActiveDocumentLimitPerBatch) {
      this.changeDocumentLimitPerBatchVisibility();
    }

    if (data.isActivePageLimitPerBatch) {
      this.changePageLimitPerDocumentVisibility();
    }
  }

  addToAutoName(currentAutoName: AutoName): void {
    const currentAutoNameValue = this.autoNameControl.value + currentAutoName.value;
    this.autoNameControl.setValue(currentAutoNameValue);
    this.refreshAutoNameExample(currentAutoNameValue);
  }

  prepareAutoNameRefreshSubscription(): void {
    const autoNameControl = this.autoNameControl;
    autoNameControl.valueChanges.forEach((value: string) => {
      this.refreshAutoNameExample(value);
    });
  }

  private refreshAutoNameExample(value: string): void {
    this.autoNameExample = value;
    for (const autoName of this.autoNames) {
      const expression = new RegExp(autoName.value, 'g');
      this.autoNameExample = this.autoNameExample.replace(expression, autoName.example);
    }
  }

  private addDefaultAutoName(): void {
    let defaultAutoNameValues = '';
    for (const autoName of this.autoNames) {
      if (autoName.isDefault) {
        defaultAutoNameValues += autoName.value;
      }
    }
    this.autoNameControl.setValue(defaultAutoNameValues);
  }

  isFieldInvalid(field: string) {
    return !this.workflowForm.get(field).valid && this.workflowForm.get(field).touched;
  }

  onTargetSelect(event) {
    if (event.items.length > 1 || event.items.length === 0) {
      this.isBtnDefaultVisible = false;
    } else {
      this.currentAssignmentDocumentType = event.items[0];
      this.isBtnDefaultVisible = true;
    }
  }

  onSetDefaultDocumentType() {
    this.assignedDocumentTypes = this.assignedDocumentTypes.map((documentType) => {
      documentType.isDefault = false;
      return documentType;
    });
    this.currentAssignmentDocumentType.isDefault = true;
  }

  onMoveToSource(event) {
    this.removeDefaultValue();
    if (this.assignedDocumentTypes.length > 0 && !this.isAnyDocumentTypeDefault()) {
      this.assignedDocumentTypes[0].isDefault = true;
    }

    this.isBtnDefaultVisible = false;
  }

  private isAnyDocumentTypeDefault() {
    return this.assignedDocumentTypes.some(documentType => documentType.isDefault);
  }

  onMoveAllToSource(event) {
    this.removeDefaultValue();
    this.isBtnDefaultVisible = false;
  }

  private removeDefaultValue() {
    this.documentTypes = this.documentTypes.map((documentType: any) => {
      documentType.isDefault = false;
      return documentType;
    });
  }

  onMoveToTarget(event) {
    this.setFirstAssignmentToDefault();
  }

  onMoveAllToTarget(event) {
    this.setFirstAssignmentToDefault();
  }

  private setFirstAssignmentToDefault() {
    if (this.assignedDocumentTypes.length > 0 && !this.isAnyDocumentTypeDefault()) {
      this.assignedDocumentTypes[0].isDefault = true;
    }
  }

  changeDocumentLimitPerBatchVisibility() {
    this.isActiveDocumentLimitPerBatch = !this.isActiveDocumentLimitPerBatch;
    if (this.isActiveDocumentLimitPerBatch) {
      this.workflowForm.controls['documentLimitPerBatchAlert'].enable();
      this.workflowForm.controls['documentLimitPerBatchQuantity'].enable();
    } else {
      this.workflowForm.controls['documentLimitPerBatchAlert'].disable();
      this.workflowForm.controls['documentLimitPerBatchAlert'].setValue(0);

      this.workflowForm.controls['documentLimitPerBatchQuantity'].disable();
      this.workflowForm.controls['documentLimitPerBatchQuantity'].setValue(0);
    }
  }

  changePageLimitPerDocumentVisibility() {
    this.isActivePageLimitPerBatch = !this.isActivePageLimitPerBatch;

    if (this.isActivePageLimitPerBatch) {
      this.workflowForm.controls['pageLimitPerBatchAlert'].enable();
      this.workflowForm.controls['pageLimitPerBatchQuantity'].enable();
    } else {
      this.workflowForm.controls['pageLimitPerBatchQuantity'].disable();
      this.workflowForm.controls['pageLimitPerBatchQuantity'].setValue(0);

      this.workflowForm.controls['pageLimitPerBatchAlert'].disable();
      this.workflowForm.controls['pageLimitPerBatchAlert'].setValue(0);
    }
  }

  getDefaultDocumentType = () => {
    if (this.currentDefaultDocumentType) {
      return this.currentDefaultDocumentType.name;
    } else {
      return this.translateService.instant('NotDefaultDocumentSelected');
    }
  }

  onComposeSelectionChange = (currentSelection: Array<CompoundSplittersAssignments>) => {
    this.currentComposeBarcodeSelection = currentSelection;
  }

  onExternalPropertyChange = (currentSelection: Array<ExternalPropertiesAssigments>) => {
    this.currentExternalPropertiesAssignment = currentSelection;
  }

  setLimitSizePerBatch = (data: Restriction) => {
    console.log(data);
    this.pageSizePerBatchLimit = data.limit;
    this.pageSizePerBatchLimitWarning = data.limitWarning;
    console.log(this.pageSizePerBatchLimit, this.pageSizePerBatchLimitWarning);
  }

  setLimitSizePerPage = (data: Restriction) => {
    console.log(data);
    this.pageSizePerImageLimit = data.limit;
    this.pageSizePerImageLimitWarning = data.limitWarning;
    console.log(this.pageSizePerImageLimit, this.pageSizePerImageLimitWarning);
  }

  messages: string[] = [];

  message(s: string) {
    console.log('Called')
    this.messages.push(s);
    console.log(this.messages)
  }

  getSpecialPermissions = () => {
    //console.log(this.currentSpecialPermissions)
    return this.currentSpecialPermissions
  }

  onAutoNameChange = (e: { nameExpression: string, example: string }) => {
    this.autoNameExample = e.example;
    this.workflowNameExpression = e.nameExpression
  }
}

