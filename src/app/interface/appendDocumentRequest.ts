/**
 * Represents the append document request model.
 * @export
 * @interface IAppendDocumentRequest
 */
export interface IAppendDocumentRequest {
    parentDocumentId: number;
    pagesId: number[];
    currentDocumentId: number;
}
