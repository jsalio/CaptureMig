import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigurationService } from '../../../../../../services/ribbons/configuration.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { WorkflowList } from '../../../../../../models/workflow-list';
import { Workflow } from '../../../../../../models/workflow';
import { ApiWorkflowService } from '../../../../../../services/api-workflow.service';
import { ToastNotificationService, ToastType } from '../../../../../../services/toast-notification.service';
import { SharedTableComponent } from '../../../../../../shared/components/table/table.component';


@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [TranslateModule, SharedTableComponent],
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.css',
})
export class WorkflowListComponent implements OnInit,OnDestroy {
  

  // columns = [
  //   { field: 'name', header: 'Name', sortable: true },
  //   { field: 'age', header: 'Age', sortable: true },
  //   // ... more columns
  // ];

  // data = [
  //   { name: 'John', age: 30 },
  //   { name: 'Jane', age: 25 },
  //   // ... more data
  // ];

  // onRowSelect(event: any) {
  //   console.log('Selected row:', event);
  // }

  
  workflows: WorkflowList[];
  cols: any[];
  loading = true;
  displayMessage = false;
  totalRecords: number;
  currentWorkflow: Workflow;
  messageBody: string;
  editingWorkflow = false;
  loadingData = false;

  
  /**
   *
   */
  constructor(
    private readonly configurationRibbonService: ConfigurationService,
              private readonly workflowService: ApiWorkflowService,
              private readonly router: Router,
              private readonly toastNotification: ToastNotificationService,
              private readonly translate: TranslateService,
  ) {
    
    
  }

  ngOnInit(): void {
    this.configurationRibbonService.emitShowCreateWorkflow();
    this.configurationRibbonService.emitSetWorkflowAdministrationActive();
    this.cols = [
      { field: 'name', header: 'WorkflowName',cellStyle: { textAlign: 'center' }  },
      { field: 'creationDate', header: 'CreationDate' , isDate:true ,cellStyle: { textAlign: 'center' } },
      { field: 'batches', header: 'Batches' ,cellStyle: { textAlign: 'center' } },
      { field: 'actions', header: 'Actions', translate: true ,cellStyle: { textAlign: 'center' } }
    ];
    this.loadAllWorkflows()
  }

  ngOnDestroy() {
    this.configurationRibbonService.emitHidingCreateWorkflowButton();
  }

  private loadAllWorkflows() {
    this.loadingData = true;
    this.workflowService.getAllWorkflows().then(data => {
      this.workflows = [];
      this.workflows = data;
      this.loading = false;
      this.loadingData = false;
      console.log(data)
    });
  }

  editWorkflow(workflow: any) {
    this.router.navigate(['configuration/edit-workflow', workflow.id]);
  }

  // tslint:disable-next-line:no-unused-variable
  onRowSelect(event:any) {
    const currentWorkflow = event.data.id as any;
    this.router.navigate(['configuration/edit-workflow', currentWorkflow]);
  }

  // tslint:disable-next-line:no-unused-variable
  archive(workflow: any) {
    this.currentWorkflow = workflow as Workflow;
    if (this.currentWorkflow.isArchived) {
      this.messageBody = 'UnArchiveWorkflowQuestion';
    } else {
      this.messageBody = 'ArchiveWorkflowQuestion';
    }
    this.displayMessage = true;
  }

  // tslint:disable-next-line:no-unused-variable
  private hideModal() {
    // this.archiveQuestionModal.hide();
  }

  // tslint:disable-next-line:no-unused-variable
  private onHidden(): void {
    this.displayMessage = false;
  }

  // tslint:disable-next-line:no-unused-variable
  onSubmitChange() {
    if (this.editingWorkflow) {
      return;
    }
    const editWorkflow = this.getEditedWorkflow();
    const request = { workflowId: editWorkflow.id, isArchived: editWorkflow.isArchived };
    this.editingWorkflow = true;
    this.workflowService.changeArchiveWorkflowStatus(request)
      .then((workflow: any) => {
        this.displaySuccessMessage();
        this.loadAllWorkflows();
        // this.staticTabs.tabs[0].active = true;
        // this.archiveQuestionModal.hide();
        this.editingWorkflow = false;
      })
      .catch(error => {
        this.displayErrorMessage(error);
      });
  }

  private displayErrorMessage(error: any) {
    const failureMessage = error.error.exceptionMessage;
    this.translate.get([failureMessage, 'Workflow']).subscribe(res => {
      // { title: res.Workflow, message: res[failureMessage] }
      this.toastNotification.show({message:res[failureMessage], title:res.Workflow,options:{}}, ToastType.Error);
    });
  }

  private displaySuccessMessage() {
    this.translate.get(['EditWorkflowSuccessMessage', 'Workflow']).subscribe(res => {
      this.toastNotification.show({ title: res.Workflow, message: res.EditWorkflowSuccessMessage,options:{}}, ToastType.Success);
    });
  }

  private getEditedWorkflow(): any {
    this.currentWorkflow.isArchived = !this.currentWorkflow.isArchived;
    return this.currentWorkflow;
  }

  /**
   * Get all the workflows according with its archive's status.
   *
   * @memberof WorkflowlistComponent
   */
  public filterByIsArchivedStatus(isArchive: boolean) {
    this.loadingData = true;
    this.workflowService.filterByIsArchivedStatus(isArchive).then(data => {
      this.workflows = [];
      this.workflows = data;
      this.loadingData = false;
      this.loading = false;
    });
  }


}
