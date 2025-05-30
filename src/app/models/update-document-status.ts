import { DocumentStatus } from '../enum/document-status.enum';
/**
 * Represents the request to update the document status
 * @export
 * @class UpdateDocumentStatus
 */
export class UpdateDocumentStatus {
    documentId: number;
    newStatus: DocumentStatus;

    /**
     * It creates an instance of the class using given parameters
     */
    constructor(documentId: number, newStatus: DocumentStatus) {
        this.documentId = documentId;
        this.newStatus = newStatus;
    }
}
