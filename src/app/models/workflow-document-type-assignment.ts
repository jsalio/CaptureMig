import {DocumentType} from './document-types';

/**
 * Represents a WorkflowDocumentTypeAssignment
 * @export
 * @class WorkflowDocumentTypeAssignment
 */
export class WorkflowDocumentTypeAssignment {
  documentTypeId: number;
  isDefault: boolean;
  workflowId: number;
  documentType: DocumentType;
}
