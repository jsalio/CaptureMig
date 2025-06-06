import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { RibbonButtonComponent } from '../ribbon-button/ribbon-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { CurrentUserService } from '../../../services/current-user.service';
import { ModalComponent } from "../../modal/modal.component";
import { Router } from '@angular/router';
import { ConfigurationService } from '../../../services/ribbons/configuration.service';

@Component({
  selector: 'app-ribbon-configuration',
  standalone: true,
  imports: [CommonModule, TranslateModule, SliderComponent, RibbonButtonComponent, ModalComponent],
  templateUrl: './ribbon-configuration.component.html',
  styleUrl: './ribbon-configuration.component.css',
  providers:[CurrentUserService]
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
  workflowAdministrationActive = signal<boolean>(false);
  showCreateWorkflow = signal<boolean>(false);
  webHookActive = signal<boolean>(false);
  barcodeSeparatorsPrintActive = signal<boolean>(false);
  showGlobalSection = signal<boolean>(true);
  showActionOptions = signal<boolean>(false);
  resetCacheModalIsOpen = signal<boolean>(false);

  // Computed signal for workflow access
  checkAccesToWorkflow = computed(() => {
    return this.showWorkflowSection() && this.currentUserService.currentUser.specialPermissions.hasWorkflowsAdministration;
  });

  showAllSections = () => {
    debugger
    this.showWorkflowSection.set(true);
    this.showRolesSection.set(true);
    this.showScannerProfilesSection.set(true);
    this.showExternalPropertiesSection.set(true);
    this.showWebHookSection.set(true);
    this.showBarcodeSection.set(true);
    this.showSynchronizationScheduleSection.set(true);
    this.showVolumeSection.set(true);
    this.showGlobalSection.set(true);
    this.showGeneralLogSection.set(true);
    this.showProjectSection.set(true);
    this.showGarbageSection.set(true);
    this.showLicenseConfiguration.set(true);
    this.showChartMetricsSection.set(true);
  }

  setRibbonWorkflowSection = () => {
    this.hideAllSections();
    this.showWorkflowSection.set(true);
    this.canShowWorkflowList.set(true);
    this.showGoBackButton.set(true);
  }

  hideAllSections = () => {
    this.showWorkflowSection.set(false);
    this.showRolesSection.set(false);
    this.showScannerProfilesSection.set(false);
    this.showExternalPropertiesSection.set(false);
    this.showWebHookSection.set(false);
    this.showBarcodeSection.set(false);
    this.showSynchronizationScheduleSection.set(false);
    this.showVolumeSection.set(false);
    this.showGeneralLogSection.set(false);
    this.showProjectSection.set(false);
    this.showGarbageSection.set(false);
    this.showLicenseConfiguration.set(false);
    this.showChartMetricsSection.set(false);
    this.showGlobalSection.set(false);
  }

  setRibbonWorkWorkflowSection() {
    this.hideAllSections();
    this.canShowWorkflowList.set(true);
    this.showWorkflowSection.set(true);
    this.showGoBackButton.set(true);
  }

  setRibbonGlobalSection = () => {
    this.hideAllSections();
    this.showGlobalSection.set(true);
    this.showActionOptions.set(true);
    this.showGoBackButton.set(true);
    this.route.navigate(['configuration/actions']);
  }

  showChartMetricModule = () => {
    this.ribbonConfigurationService.emitShowChartMetricts();
    this.hideAllSections();
    this.showChartMetricsSection.set(true);
    this.showGoBackButton.set(true);
  }

  // 
  setRibbonVolumeSection() {
    this.hideAllSections();
    this.canShowVolumeList.set(false);
    this.showVolumeSection.set(true);
    this.showGoBackButton.set(true);
  }

  setRibbonLicenseSection() {
    this.hideAllSections();
    this.canShowLicenseConfigurations.set(true);
    this.showLicenseConfiguration.set(true);
    this.showGoBackButton.set(true);
  }

  setRibbonProjectSection() {
    this.hideAllSections();
    this.canShowProjectSection.set(false);
    this.showProjectSection.set(true);
    this.showCreateNewProject.set(true);
    this.showGoBackButton.set(true);
  }

  setRibbonGarbageSection() {
    this.hideAllSections();
    this.showGarbageOption.set(true);
    this.showGoBackButton.set(true);
  }

  setRibbonNewProjectSection() {
    this.hideAllSections();
    this.showGoBackButton.set(true);
  }

  setRibbonUpdateRoleSection() {
    this.hideAllSections();
    this.showRolesSection.set(true)
    this.showGoBackButton.set(true)
  }

  setRibbonExternalPropertiesSection() {
    this.hideAllSections();
    this.canShowExternalPropertiesList.set(false);
    this.showExternalPropertiesSection.set(true)
    this.showGoBackButton.set(true)
  }

  setRibbonRoleSection() {
    this.hideAllSections();
    this.canShowRolesList.set(false);
    this.showRolesSection.set(true)
    this.showGoBackButton.set(true)
  }

  setRibbonScanProfileSection() {
    this.hideAllSections();
    this.canShowScanProfilesList.set(false);
    this.showScannerProfilesSection.set(true)
    this.showGoBackButton.set(true)
  }

  setRibbonWebHookSection() {
    this.hideAllSections();
    this.canShowWebHooksList.set(false);
    this.showWebHookSection.set(true)
    this.showGoBackButton.set(true)
  }

  setRibbonBarcodeSection() {
    this.hideAllSections();
    this.canShowBatchSeparatorPrintingList.set(false);
    this.showBarcodeSection.set(true)
    this.showGoBackButton.set(true)
  }

  setRibbonChildBarcodeSection() {
    this.hideAllSections();
    this.canShowBatchSeparatorPrintingList.set(true)
    this.showBarcodeSection.set(true)
    this.showGoBackButton.set(true)
  }

  setRibbonSynchronizationSection() {
    this.hideAllSections();
    this.canShowScheduleList.set(false);
    this.showSynchronizationScheduleSection.set(true)
    this.showGoBackButton.set(true)
  }

  setRibbonGeneralLogSection() {
    this.hideAllSections();
    this.canShowGeneralLog.set(false);
    this.showGeneralLogSection.set(true)
    this.showGoBackButton.set(true)
  }

  routesActionsDictionary = {
    ['/site/configuration']: this.showAllSections.bind(this),
    ['/site/configuration/workflow']: this.setRibbonWorkflowSection.bind(this),
    ['/site/configuration/new-workflow']: this.setRibbonWorkWorkflowSection.bind(this),
    ['/site/configuration/edit-workflow']: this.setRibbonWorkWorkflowSection.bind(this),
    ['/site/configuration/licenses']: this.setRibbonVolumeSection.bind(this),
    ['/site/configuration/chart-parameters']: this.showChartMetricModule.bind(this),
    ['/site/configuration/roles/']: this.setRibbonUpdateRoleSection.bind(this),
    ['/site/configuration/roles']: this.setRibbonRoleSection.bind(this),
    ['/site/configuration/scanner-profiles']: this.setRibbonScanProfileSection.bind(this),
    ['/site/configuration/external-properties']: this.setRibbonExternalPropertiesSection.bind(this),
    ['/site/configuration/web-hooks']: this.setRibbonWebHookSection.bind(this),
    ['/site/configuration/barcode']: this.setRibbonBarcodeSection.bind(this),
    ['/site/configuration/document-separators']: this.setRibbonChildBarcodeSection.bind(this),
    ['/site/configuration/batch-separators']: this.setRibbonChildBarcodeSection.bind(this),
    ['/site/configuration/schedule']: this.setRibbonSynchronizationSection.bind(this),
    ['/site/configuration/volumes']: this.setRibbonVolumeSection.bind(this),
    ['/site/configuration/general-logs']: this.setRibbonGeneralLogSection.bind(this),
    ['/site/configuration/project']: this.setRibbonProjectSection.bind(this),
    ['/site/configuration/project/new']: this.setRibbonNewProjectSection.bind(this),
    ['/site/configuration/garbage']: this.setRibbonGarbageSection.bind(this),
    ['/site/configuration/actions']: this.setRibbonGlobalSection.bind(this),
  };

  /**
   *
   */
  constructor(public readonly currentUserService: CurrentUserService, private readonly route: Router, private readonly ribbonConfigurationService: ConfigurationService) {

    const urlBase = this.route.url.split('/');
    const numberTree = 3;
    let uri = ('/' + urlBase[1] + '/' + urlBase[2] + '/' + urlBase[numberTree]).replaceAll('undefined', '')
    if (uri.endsWith('/')) {
      uri = uri.substring(0, uri.length - 1)
    }
    debugger
    this.routesActionsDictionary[uri]();

    this.ribbonConfigurationService.setScanProfileInactiveEvent().subscribe(() => {
      this.scanProfileActive.set(false);
    });
    this.ribbonConfigurationService.setScanProfileActiveEvent().subscribe(() => {
      this.scanProfileActive.set(true)
    });
    this.ribbonConfigurationService.hiddenCreateScanProfileEvent().subscribe(() => {
      this.showCreateScanProfile.set(false);
      this.canShowScanProfilesList.set(true)
    });
    this.ribbonConfigurationService.showCreateScanProfileEvent().subscribe(() => {
      this.showCreateScanProfile.set(true)
    });

    this.ribbonConfigurationService.setRoleAdministrationActiveEvent().subscribe(() => {
      this.rolesAdministrationActive.set(true)
    });

    this.ribbonConfigurationService.setWorkflowAdministrationActiveEvent().subscribe(() => {
      this.workflowAdministrationActive.set(true)
    });
    this.ribbonConfigurationService.showCreateWorkflowEvent().subscribe(() => {
      this.showCreateWorkflow.set(true)
    });
    this.ribbonConfigurationService.hiddenCreateWorkflowEvent().subscribe(() => {
      this.showCreateWorkflow.set(false);
    });

    this.ribbonConfigurationService.setExternalPropertiesAdministrationEvent().subscribe(() => {
      this.externalPropertiesActive.set(true)
    });

    this.ribbonConfigurationService.showWebHooks().subscribe(() => {
      this.webHookActive.set(true)
    });
  }

  goBack = () => {
    this.route.navigate(['site/configuration']);
    this.showGoBackButton.set(false);

    if (this.showActionOptions) {
      this.showActionOptions.set(false);
      this.showAllSections();
    }
  }


  showRolesList = () => {
    this.ribbonConfigurationService.emitShowRolesPermissionPageEvent();
    this.hideAllSections();
    this.showRolesSection.set(true);
    this.showGoBackButton.set(true);
  }

  showScanProfilesList = () => {
    this.ribbonConfigurationService.emitShowScanProfilesPageEvent();
    this.hideAllSections();
    this.showScannerProfilesSection.set(true);
    this.showGoBackButton.set(true);

  }

  showScanProfilesCreationScreen = () => {
    this.ribbonConfigurationService.emitShowCreateScanProfilesPageEvent();
  }

  showExternalPropertiesList = () => {
    this.ribbonConfigurationService.emitShowExternalProperties();
    this.hideAllSections();
    this.showExternalPropertiesSection.set(true);
    this.showGoBackButton.set(true);
  }

  showNewExternalPropertyScreen = () => {
    this.ribbonConfigurationService.emitShowCreateExternalProperties();
  }

  showWebHooksList = () => {
    this.ribbonConfigurationService.emitShowWebHooks();
    this.hideAllSections();
    this.showWebHookSection.set(true);
    this.showGoBackButton.set(true);
  }

  showWebHookCreateScreen = () => {
    this.ribbonConfigurationService.emitShowCreateWebHookSection();
  }

  showBatchSeparatorPrinting = () => {
    this.ribbonConfigurationService.emitSetPrintBarcodeSeparatorsActive();
  }

  showComposedBarcodeConfiguration = () => {
    this.ribbonConfigurationService.emitDocsBarcodeSeparatorConfigurationActive();
  }

  showScheduleList = () => {
    this.ribbonConfigurationService.emitListOfflineSchedule();
    this.hideAllSections();
    this.showSynchronizationScheduleSection.set(true);
    this.showGoBackButton.set(true);
  }

  showVolumeCreationModule = () => {
    this.ribbonConfigurationService.emitShowVolumeCreationModule();
    this.hideAllSections();
    this.showVolumeSection.set(true);
    this.showGoBackButton.set(true);
  }

  showGotoGarbage = () => {
    this.ribbonConfigurationService.emitGoToGarbage();
    this.hideAllSections();
    this.showGarbageSection.set(true);
    this.showGoBackButton.set(true);
  }



  showUpdateCacheData = () => {
    this.resetCacheModalIsOpen.set(true)
  }

  emitResetNotifications = () => {
    this.ribbonConfigurationService.emitListOfflineSchedule();
    this.hideAllSections();
    this.showSynchronizationScheduleSection.set(true);
    this.showGoBackButton.set(true);
  }

  emitDeleteAllCacheData = () => {
    this.ribbonConfigurationService.emitDeleteAllCacheData();
  }

  showProjectSectionModule = () => {
    this.ribbonConfigurationService.emitShowProjectManagementModule();
    this.hideAllSections();
    this.showProjectSection.set(true);
    this.showGoBackButton.set(true);
  }

  createProject = () => {
    this.ribbonConfigurationService.emitCreateNewProject();
  }

  showGeneralLogModule = () => {
    this.ribbonConfigurationService.emitShowGeneralLogModule();
    this.hideAllSections();
    this.showGeneralLogSection.set(true);
    this.showGoBackButton.set(true);
  }

  showLicenseConfigurationsModule = () => {
    this.ribbonConfigurationService.emitShowLicenseModule();
    this.hideAllSections();
    this.canShowLicenseConfigurations.set(true);
    this.showGoBackButton.set(true);
  }



  onAccept = (e: any) => {
    this.resetCacheModalIsOpen.set(false)
    // TODO:Apply 
  }

  onCancel = () => {
    this.resetCacheModalIsOpen.set(false)
  }


  closeModal = (e: any) => {
    this.onCancel()
  }


  showWorkflowList = () => {
    this.ribbonConfigurationService.emitListWorkflowEvent();
  }

  showNewWorkflowScreen = () => {
    this.ribbonConfigurationService.emitNewWorkflowEvent();
  }
}
