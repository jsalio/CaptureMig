import { Injectable } from '@angular/core';
import { FormComposition } from '../../models/form-composition';
import { environment } from '../../../environments/environment';
import { WorkflowDocumentTypeAssignment } from '../../models/workflow-document-type-assignment';
import { Observable } from 'rxjs';
import { DocumentTypeForm } from '../../interface/document-type-form';
import { HttpClient } from '@angular/common/http';
import { Keyword } from '../../models/keyword';
import { DocumentType } from '../../models/document-types';

@Injectable({
  providedIn: 'root'
})
export class ApiDocumentTypeService {

  constructor(private http: HttpClient) {
  }

  /**
   * Performs the request to get all the document types that belong to a workflow
   *
   * @param {number} workflowId represents the identifier of the workflow to search his document types
   * @returns {Promise<Array<number>>} the identifier of the document types assigned
   * @memberof DocumentTypesService
   */
  getDocumentTypesThatBelongToWorkflow(workflowId: number): Promise<Array<WorkflowDocumentTypeAssignment>> {
    return this.http.get(`${environment.proDoCaptureApiUrl}/document-types/workflow/${workflowId}`)
      .toPromise()
      .then(documentTypes => {
        return documentTypes as Array<WorkflowDocumentTypeAssignment>;
      });
  }

  getFormConfiguration(documentTypeHandle: number): Promise<FormComposition> {
    return this.http.get<FormComposition>(`${environment.proDoCaptureApiUrl}/document-types/forms/${documentTypeHandle}`)
      .toPromise();
  }

  getKeywords(): Promise<Keyword[]> {
    return this.http.get<Keyword[]>(`${environment.proDoCaptureApiUrl}/document-types/keywords`)
      .toPromise();
  }

  /**
   * Performs the request to get forms layout configuration
   *
   * @returns { Promise<any> } The suggested name
   * @memberof FormLayoutService
   */
  getDocumentTypeFormsAsync(documentsTypeHandle: number[]): Observable<DocumentTypeForm[]> {
    return this.http.post<DocumentTypeForm[]>(`${environment.proDoCaptureApiUrl}/document-types/forms/template`, documentsTypeHandle);
  }

  /**
   * Performs the request to get all the document types
   *
   * @returns {Promise<Array<DocumentType>>} the identifier of the document types
   * @memberof DocumentTypesService
   */
  getDocumentTypes(): Promise<Array<DocumentType>> {
    return this.http.get(`${environment.proDoCaptureApiUrl}/document-types`)
      .toPromise()
      .then(documentTypes => {
        return documentTypes as Array<DocumentType>;
      });
  }
}
