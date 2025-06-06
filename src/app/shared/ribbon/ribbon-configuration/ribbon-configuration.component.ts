import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { RibbonButtonComponent } from '../ribbon-button/ribbon-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { CurrentUserService } from '../../../services/current-user.service';
import { ModalComponent } from "../../modal/modal.component";

@Component({
  selector: 'app-ribbon-configuration',
  standalone: true,
  imports: [CommonModule, TranslateModule, SliderComponent, RibbonButtonComponent, ModalComponent],
  templateUrl: './ribbon-configuration.component.html',
  styleUrl: './ribbon-configuration.component.css'
})
export class RibbonConfigurationComponent {
  showGoBackButton = signal<boolean>(false);
  scanProfileActive = signal<boolean>(false);
  showCreateScanProfile = signal<boolean>(false);
  showWorkflowSection = signal<boolean>(false);
  showRolesSection = signal<boolean>(false);
  showScannerProfilesSection = signal<boolean>(false);
  showExternalPropertiesSection = signal<boolean>(false);
  showWebHookSection = signal<boolean>(false);
  showBarcodeSection = signal<boolean>(true);
  showGarbageSection = signal<boolean>(false);
  showSynchronizationScheduleSection = signal<boolean>(false);
  showVolumeSection = signal<boolean>(false);
  showChartMetricsSection = signal<boolean>(false);
  showGeneralLogSection = signal<boolean>(false);
  showLicenseConfiguration = signal<boolean>(false);
  count = signal<number>(0);
  rolesAdministrationActive = signal<boolean>(false);
  canShowWorkflowList = signal<boolean>(true);
  canShowRolesList = signal<boolean>(true);
  canShowScanProfilesList = signal<boolean>(true);
  canShowExternalPropertiesList = signal<boolean>(true);
  canShowWebHooksList = signal<boolean>(true);
  canShowBatchSeparatorPrintingList = signal<boolean>(true);
  canShowScheduleList = signal<boolean>(true);
  canShowVolumeList = signal<boolean>(true);
  canShowGeneralLog = signal<boolean>(true);
  canShowProjectSection = signal<boolean>(true);
  showCreateNewProject = signal<boolean>(false);
  showProjectSection = signal<boolean>(false);
  showGarbageOption = signal<boolean>(false);
  canShowLicenseConfigurations = signal<boolean>(true);
  canShowChartMetrict = signal<boolean>(true);
  externalPropertiesActive = signal<boolean>(false);

  workflowAdministrationActive = false;
  showCreateWorkflow = signal<boolean> (false);
  webHookActive = signal<boolean>(false);
  showCreateWebHook = true;
  barcodeSeparatorsPrintActive = signal<boolean> (false);
  showGlobalSection = true;
  showActionOptions =signal<boolean> (false);
  resetCacheModalIsOpen = signal<boolean>(false)

  routesActionsDictionary = {
    // ['/configuration']: this.showAllSections.bind(this),
    // ['/configuration/licenses']: this.setRibbonVolumeSection.bind(this),
    // ['/configuration/chart-parameters']: this.showChartMetricModule.bind(this),
    // ['/configuration/workflow-List']: this.setRibbonWorkflowSection.bind(this),
    // ['/configuration/new-workflow']: this.setRibbonWorkWorkflowSection.bind(this),
    // ['/configuration/edit-workflow']: this.setRibbonWorkWorkflowSection.bind(this),
    // ['/configuration/roles/']: this.setRibbonUpdateRoleSection.bind(this),
    // ['/configuration/roles']: this.setRibbonRoleSection.bind(this),
    // ['/configuration/scanner-profiles']: this.setRibbonScanProfileSection.bind(this),
    // ['/configuration/external-properties']: this.setRibbonExternalPropertiesSection.bind(this),
    // ['/configuration/web-hooks']: this.setRibbonWebHookSection.bind(this),
    // ['/configuration/barcode']: this.setRibbonBarcodeSection.bind(this),
    // ['/configuration/document-separators']: this.setRibbonChildBarcodeSection.bind(this),
    // ['/configuration/batch-separators']: this.setRibbonChildBarcodeSection.bind(this),
    // ['/configuration/schedule']: this.setRibbonSynchronizationSection.bind(this),
    // ['/configuration/volumes']: this.setRibbonVolumeSection.bind(this),
    // ['/configuration/general-logs']: this.setRibbonGeneralLogSection.bind(this),
    // ['/configuration/project']: this.setRibbonProjectSection.bind(this),
    // ['/configuration/project/new']: this.setRibbonNewProjectSection.bind(this),
    // ['/configuration/garbage']: this.setRibbonGarbageSection.bind(this),
    // ['/configuration/actions']: this.setRibbonGlobalSection.bind(this),
  };

  /**
   *
   */
  constructor(public  readonly currentUserService: CurrentUserService) {
    
    
  }

  goBack = () => {}
  showRolesList = () => {}
  showScanProfilesList = () =>{}
  showScanProfilesCreationScreen = () => {}
  showExternalPropertiesList = () => {}
  showNewExternalPropertyScreen = () => {}
  showWebHooksList=() => {}
  showWebHookCreateScreen = () => {}
  showBatchSeparatorPrinting = () => {}
  showComposedBarcodeConfiguration = () =>{}
  showScheduleList = () => {}
  showVolumeCreationModule = () => {}
  showGotoGarbage = () => {}
  setRibbonGlobalSection = () => {}

  showUpdateCacheData = () => {
    this.resetCacheModalIsOpen.set(true)
  }
  
  emitResetNotifications = () => {}
  emitDeleteAllCacheData =() => {}
  showProjectSectionModule=() => {}
  createProject =() => {}
  showGeneralLogModule = () => {}
  showLicenseConfigurationsModule = () => {}
  showChartMetricModule = () => {}

  onAccept = (e:any) => {
    this.resetCacheModalIsOpen.set(false)
    // TODO:Apply 
  }

  onCancel = () => {
    this.resetCacheModalIsOpen.set(false)
  }


  closeModal = (e:any) => {
    this.onCancel()
  }


}
