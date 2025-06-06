import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private listWorkflowSubject = new Subject;
  private newWorkflowSubject = new Subject;
  private scanProfileSubject = new Subject;
  private createScanProfileSubject = new Subject;
  private rolesPermissionSubject = new Subject;
  private setScanProfileActive = new Subject;
  private setScanProfileInactive = new Subject;
  private showCreateScanProfile = new Subject;
  private hiddenCreateScanProfile = new Subject;
  private setRolesAdministrationActive = new Subject;

  private setWorkflowAdministrationActive = new Subject;
  private showCreateWorkflow = new Subject;
  private hiddenCreateWorkflow = new Subject;

  private showExternalProperties = new Subject;
  private setExternalPropertiesAdministrationActive = new Subject;
  private showCreateExternalProperties = new Subject;

  private webHookSectionActive = new Subject;
  private showWebHookList = new Subject;
  private showCreateWebHook = new Subject;

  private setPrintBarcodeSeparatorActive = new Subject;
  private setBatchBarcodeSeparatorConfigurationActive = new Subject;
  private setDocumentsBarcodeSeparatorConfigurationActive = new Subject;

  private listOfOfflineSchedule = new Subject;
  private newOfflineSchedule = new Subject;
  private showCreateOfflineSchedule = new Subject;
  private setVolumeModuleVisibility = new Subject<boolean>();
  private setGeneralLogVisibility = new Subject<boolean>();
  private setLicenseConfiguration = new Subject<boolean>();
  private setChartMetrictsVisivility = new Subject();

  private setProjectManagementVisibility = new Subject();
  private showCreateNewProject = new Subject();
  private displayGarbageOption = new Subject();
  private viewGarbage = new Subject();
  private resetNotificationSubject = new Subject();
  private deleteAllCacheDataSubject = new Subject();

  emitListWorkflowEvent() {
    this.listWorkflowSubject.next(undefined);
  }

  listWorkflowEventListener() {
    return this.listWorkflowSubject;
  }

  emitNewWorkflowEvent() {
    this.newWorkflowSubject.next(undefined);
  }

  newWorkflowEventListener() {
    return this.newWorkflowSubject;
  }

  emitShowCreateScanProfilesPageEvent() {
    this.createScanProfileSubject.next(undefined);
  }

  createScanProfileEventListener() {
    return this.createScanProfileSubject;
  }

  emitShowScanProfilesPageEvent() {
    this.scanProfileSubject.next(undefined);
  }

  scanProfileEventListener() {
    return this.scanProfileSubject;
  }

  emitShowRolesPermissionPageEvent() {
    return this.rolesPermissionSubject.next(undefined);
  }

  showRolesPermissionEventListener() {
    return this.rolesPermissionSubject;
  }

  emitSetScanProfileInactive() {
    this.setScanProfileInactive.next(undefined);
  }

  setScanProfileInactiveEvent() {
    return this.setScanProfileInactive;
  }

  emitSetScanProfileActive() {
    this.setScanProfileActive.next(undefined);
  }

  setScanProfileActiveEvent() {
    return this.setScanProfileActive;
  }

  emitShowVolumeCreationModule() {
    return this.setVolumeModuleVisibility.next(true);
  }

  showGarbageOption = () => {
    return this.displayGarbageOption;
  }
  emitShowShowGarbageOption = () => {
    this.displayGarbageOption.next(undefined);
  }

  volumeModuleVisibility() {
    return this.setVolumeModuleVisibility;
  }

  emitShowCreateScanProfile() {
    this.showCreateScanProfile.next(undefined);
  }

  showCreateScanProfileEvent() {
    return this.showCreateScanProfile;
  }

  emitHiddenCreateScanProfile() {
    this.hiddenCreateScanProfile.next(undefined);
  }

  hiddenCreateScanProfileEvent() {
    return this.hiddenCreateScanProfile;
  }

  emitSetRoleAdministrationActive() {
    this.setRolesAdministrationActive.next(undefined);
  }

  setRoleAdministrationActiveEvent() {
    return this.setRolesAdministrationActive;
  }

  emitSetWorkflowAdministrationActive() {
    this.setWorkflowAdministrationActive.next(undefined);
  }

  setWorkflowAdministrationActiveEvent() {
    return this.setWorkflowAdministrationActive;
  }

  emitShowCreateWorkflow() {
    this.showCreateWorkflow.next(undefined);
  }

  showCreateWorkflowEvent() {
    return this.showCreateWorkflow;
  }

  emitHidingCreateWorkflowButton() {
    this.hiddenCreateWorkflow.next(undefined);
  }

  hiddenCreateWorkflowEvent() {
    return this.hiddenCreateWorkflow;
  }

  emitShowExternalProperties() {
    this.showExternalProperties.next(undefined);
  }

  showExternalPropertiesEvent() {
    return this.showExternalProperties;
  }

  emitSetExternalPropertiesAdministrationActive() {
    this.setExternalPropertiesAdministrationActive.next(undefined);
  }

  setExternalPropertiesAdministrationEvent() {
    return this.setExternalPropertiesAdministrationActive;
  }

  emitShowCreateExternalProperties() {
    this.showCreateExternalProperties.next(undefined);
  }

  ShowCreateExternalProperties() {
    return this.showCreateExternalProperties;
  }

  showWebHookSection() {
    return this.webHookSectionActive;
  }

  emitShowWebHookSection() {
    this.webHookSectionActive.next(undefined);
  }

  showCreateWebHookSection() {
    return this.showCreateWebHook;
  }

  emitShowCreateWebHookSection() {
    this.showCreateWebHook.next(undefined);
  }

  showWebHooks() {
    return this.showWebHookList;
  }

  emitShowWebHooks() {
    this.showWebHookList.next(undefined);
  }

  emitSetPrintBarcodeSeparatorsActive() {
    this.setPrintBarcodeSeparatorActive.next(undefined);
  }

  printBarcodeSeparatorsEvent() {
    return this.setPrintBarcodeSeparatorActive;
  }

  emitBatchBarcodeSeparatorConfigurationActive() {
    this.setBatchBarcodeSeparatorConfigurationActive.next(undefined);
  }

  saveBatchBarcodeSeparatorConfiguration() {
    return this.setBatchBarcodeSeparatorConfigurationActive;
  }

  emitDocsBarcodeSeparatorConfigurationActive() {
    this.setDocumentsBarcodeSeparatorConfigurationActive.next(undefined);
  }

  saveDocsBarcodeSeparatorConfiguration() {
    return this.setDocumentsBarcodeSeparatorConfigurationActive;
  }

  emitListOfflineSchedule() {
    this.listOfOfflineSchedule.next(undefined);
  }

  setListOfflineScheduleEvent() {
    return this.listOfOfflineSchedule;
  }

  emitShowCreateOfflineScheduleSection() {
    this.showCreateOfflineSchedule.next(undefined);
  }

  showOfflineSchedule() {
    return this.showCreateOfflineSchedule;
  }

  emitNewOfflineScheduleEvent() {
    this.newOfflineSchedule.next(undefined);
  }

  newOfflineScheduleEventListener() {
    return this.newOfflineSchedule;
  }

  emitShowGeneralLogModule() {
    return this.setGeneralLogVisibility.next(true);
  }

  generalLogModuleVisibility() {
    return this.setGeneralLogVisibility;
  }

  emitShowLicenseModule() {
    return this.setLicenseConfiguration.next(true);
  }

  licenseConfigurationVisibility() {
    return this.setLicenseConfiguration;
  }

  chartMetrictsModuleVisibility() {
    return this.setChartMetrictsVisivility;
  }
  emitShowChartMetricts() {
    return this.setChartMetrictsVisivility.next(undefined)
  }

  emitShowProjectManagementModule() {
    return this.setProjectManagementVisibility.next(undefined);
  }

  projectManagementVisibility() {
    return this.setProjectManagementVisibility;
  }

  emitCreateNewProject() {
    return this.showCreateNewProject.next(undefined);
  }

  setNewProjectEvent() {
    return this.showCreateNewProject
  }

  emitGoToGarbage = () => {
    this.viewGarbage.next(undefined);
  }

  goToGarbage = () => {
    return this.viewGarbage;
  }

  emitResetNotification = () => {
    this.resetNotificationSubject.next(undefined);
  }

  resetNotification = () => {
    return this.resetNotificationSubject;
  }

  emitDeleteAllCacheData = () => {
    this.deleteAllCacheDataSubject.next(undefined);
  }

  deleteAllCacheData = () => {
    return this.deleteAllCacheDataSubject;
  }
}
