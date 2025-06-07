import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workflow } from '../models/workflow';
import { WorkflowList } from '../models/workflow-list';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiWorkflowService {

  constructor(private http: HttpClient) { }
  /**
   * Create a new workflow via Api.
   * @param {*} workflow name of new workflow
   * @returns nothing
   * @memberof WorkflowService
   */
  saveNewWorkflow(workflow: Workflow): Promise<number> {
    return this.http.post<number>(`${environment.proDoCaptureApiUrl}/workflows`, workflow).toPromise();
  }

  /**
   * Get all the workflows from the repository through the web API.
   * @returns {Promise<Array<Workflow>>}
   * @memberof WorkflowService
   */
  getAllWorkflows(): Promise<Array<WorkflowList>> {
    return this.http.get(`${environment.proDoCaptureApiUrl}/workflows/`).
      toPromise().then(data => {
        return data as Array<WorkflowList>;
      });
  }

  /**
   * Get Specific workflow by id
   * @param {*} workflowrequest request
   * @returns  A workflow
   * @memberof WorkflowService
   */
  getWorkflowById(workflowId: number): Promise<Workflow> {
    return this.http.get(`${environment.proDoCaptureApiUrl}/workflows/${workflowId}`).
      toPromise().then(data => {
        return data as Workflow;
      });
  }

  /**
   * Update workflow
   * @param {*} updatedWorkflow for edit.
   * @returns a message
   * @memberof WorkflowService
   */
  updateWorkflow(updatedWorkflow: Workflow): Promise<string> {
    return this.http.put(`${environment.proDoCaptureApiUrl}/workflows/${updatedWorkflow.id}`, updatedWorkflow).toPromise()
      .then(data => {
        return data as string;
      });
  }

  storeWorkflowSplitter(updatedWorkflowSplitter: any) {
    return this.http.post(`${environment.proDoCaptureApiUrl}/workflows/splitter`, updatedWorkflowSplitter).toPromise();
  }

  /**
   * Changes isArchived workflow's status
   * @param {*} request
   * @returns {Promise<string>}
   * @memberof WorkflowService
   */
  changeArchiveWorkflowStatus(request: any): Promise<string> {
    return this.http.patch(`${environment.proDoCaptureApiUrl}/workflows/${request.id}/archive`, request).toPromise()
      .then(data => {
        return data as string;
      });
  }

  /**
   * Get all the workflows according with its archive's status.
   * @returns {Promise<Array<Workflow>>}
   * @memberof WorkflowService
   */
  filterByIsArchivedStatus(isArchived: boolean): Promise<Array<WorkflowList>> {
    return this.http.get(`${environment.proDoCaptureApiUrl}/workflows/isArchived/${isArchived}`).
      toPromise().then(data => {
        return data as Array<WorkflowList>;
      });
  }

  getWorkflowResume(): Promise<any[]> {
    return this.http.get<any[]>(`${environment.proDoCaptureApiUrl}/workflows/splitter/resume`).
      toPromise();
  }
}
