import { DocumentStatus } from '../enum/document-status.enum';
/**
 * Metadata about the document content only Page
 *
 * @export
 * @interface IDocumentMetaDataInfo
 */
export interface IDocumentMetaDataInfo {

  batchId: number;
  /**
   * Page counter
   *
   * @type {number}
   * @memberof IDocumentMetaDataInfo
   */
  pageCounter: number;
  /**
   * the document id
   *
   * @type {number}
   * @memberof IDocumentMetaDataInfo
   */
  documentCounter: number;
  /**
   * the document status
   *
   * @type {DocumentStatus}
   * @memberof IDocumentMetaDataInfo
   */
  documentStatus: DocumentStatus;

  batchName: string;
}
