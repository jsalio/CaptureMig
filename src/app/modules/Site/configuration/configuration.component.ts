import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigurationService } from '../../../services/ribbons/configuration.service';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css',
  providers:[ConfigurationService]
})
export class ConfigurationComponent {
  private workflowListSubscription: Subscription;
  private volumesListSubscription: Subscription;

  private newWorkflowSubscription: Subscription;
  private scanProfileSubscription: Subscription;
  private createScanProfilesSubscription: Subscription;
  private rolesPermissionsSubscription: Subscription;
  private externalPropertiesSubscription: Subscription;
  private newExternalPropertySubscription: Subscription;
  private webHookSubscription: Subscription;
  private createWebHookSubscription: Subscription;
  private printBarcodeSeparatorsSubscription: Subscription;
  private saveBatchBarcodeSeparatorsSubscription: Subscription;
  private saveDocumentsBarcodeSeparatorsSubscription: Subscription;
  private scheduleConfigurationSubscription: Subscription;
  private chartConfigurationSubscription: Subscription;
  private generalLogSubscription: Subscription;
  private licenseConfigurationsSubscription: Subscription;
  private projectManagementSubscription: Subscription;
  private createProjectSubscription: Subscription;
  private garbageSubcription: Subscription;

  constructor(
    private configurationRibbonService: ConfigurationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.workflowListSubscription = this.configurationRibbonService
      .listWorkflowEventListener()
      .subscribe(() => {
        debugger
        this.router.navigate(['site/configuration/workflow']);
      });

      this.newWorkflowSubscription = this.configurationRibbonService
      .newWorkflowEventListener()
      .subscribe(() => {
        this.router.navigate(['site/configuration/new-workflow']);
      });


    this.volumesListSubscription = this.configurationRibbonService
      .volumeModuleVisibility()
      .subscribe(() => {
        this.router.navigate(['site/configuration/volumes']);
      });



    this.scanProfileSubscription = this.configurationRibbonService
      .scanProfileEventListener()
      .subscribe(() => {
        this.router.navigate(['site/configuration/scanner-profiles']);
      });

    this.rolesPermissionsSubscription = this.configurationRibbonService
      .showRolesPermissionEventListener()
      .subscribe(() => {
        this.router.navigate(['site/configuration/roles']);
      });

    this.createScanProfilesSubscription = this.configurationRibbonService
      .createScanProfileEventListener()
      .subscribe(() => {
        this.router.navigate(['site/configuration/scanner-profiles/new']);
      });

    this.externalPropertiesSubscription = this.configurationRibbonService
      .showExternalPropertiesEvent()
      .subscribe(() => {
        this.router.navigate(['site/configuration/external-properties']);
      });

    this.newExternalPropertySubscription = this.configurationRibbonService
      .ShowCreateExternalProperties()
      .subscribe(() => {
        this.router.navigate(['site/configuration/external-properties/new']);
      });

    this.webHookSubscription = this.configurationRibbonService
      .showWebHooks()
      .subscribe(() => {
        this.router.navigate(['site/configuration/web-hooks']);
      });

    this.createWebHookSubscription = this.configurationRibbonService
      .showCreateWebHookSection()
      .subscribe(() => {
        this.router.navigate(['site/configuration/web-hooks/new']);
      });

    this.printBarcodeSeparatorsSubscription = this.configurationRibbonService
      .printBarcodeSeparatorsEvent()
      .subscribe(() => {
        this.router.navigate(['site/configuration/barcode']);
      });

    this.saveBatchBarcodeSeparatorsSubscription = this.configurationRibbonService
      .saveBatchBarcodeSeparatorConfiguration()
      .subscribe(() => {
        this.router.navigate(['site/configuration/batch-separators']);
      });

    this.saveDocumentsBarcodeSeparatorsSubscription = this.configurationRibbonService
      .saveDocsBarcodeSeparatorConfiguration()
      .subscribe(() => {
        this.router.navigate(['site/configuration/document-separators']);
      });

    this.scheduleConfigurationSubscription = this.configurationRibbonService
      .setListOfflineScheduleEvent()
      .subscribe(() => {
        this.router.navigate(['site/configuration/schedule']);
      });

    this.chartConfigurationSubscription = this.configurationRibbonService
      .chartMetrictsModuleVisibility()
      .subscribe(() => {
        this.router.navigate(['site/configuration/chart-parameters']);
      });

    this.projectManagementSubscription = this.configurationRibbonService
      .projectManagementVisibility()
      .subscribe(() => {
        // this.router.navigate(['site/configuration/project']);
      });

    this.garbageSubcription = this.configurationRibbonService
      .goToGarbage()
      .subscribe(() => {
        this.router.navigate(['site/configuration/garbage']);
      });

    this.createProjectSubscription = this.configurationRibbonService
      .setNewProjectEvent()
      .subscribe(() => {
        this.router.navigate(['site/configuration/project/new'])
      });

    this.generalLogSubscription = this.configurationRibbonService
      .generalLogModuleVisibility()
      .subscribe(() => {
        this.router.navigate(['site/configuration/general-logs']);
      });

    this.licenseConfigurationsSubscription = this.configurationRibbonService
      .licenseConfigurationVisibility()
      .subscribe(() => {
        this.router.navigate(['site/configuration/licenses']);
      });
  }

  ngOnDestroy() {
    this.workflowListSubscription.unsubscribe();
    this.volumesListSubscription.unsubscribe();
    this.newWorkflowSubscription.unsubscribe();
    this.scanProfileSubscription.unsubscribe();
    this.rolesPermissionsSubscription.unsubscribe();
    this.createScanProfilesSubscription.unsubscribe();
    this.externalPropertiesSubscription.unsubscribe();
    this.newExternalPropertySubscription.unsubscribe();
    this.webHookSubscription.unsubscribe();
    this.createWebHookSubscription.unsubscribe();
    this.printBarcodeSeparatorsSubscription.unsubscribe();
    this.saveBatchBarcodeSeparatorsSubscription.unsubscribe();
    this.generalLogSubscription.unsubscribe();
    this.licenseConfigurationsSubscription.unsubscribe();
    this.projectManagementSubscription.unsubscribe();
    this.createProjectSubscription.unsubscribe();
    this.garbageSubcription.unsubscribe();
  }
}
