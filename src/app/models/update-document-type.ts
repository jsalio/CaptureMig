/**
 * Represents the request to update the document type
 * @export
 * @class UpdateDocumentType
 */
export class UpdateDocumentType {
    documentId: number;
    documentTypeId: number;

    /**
     * It creates an instance of the class using given parameters
     */
    constructor(documentId: number, documentTypeId: number) {
        this.documentId = documentId;
        this.documentTypeId = documentTypeId;
    }
}
