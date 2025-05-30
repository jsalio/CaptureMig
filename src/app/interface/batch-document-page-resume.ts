import { IDocumentMetaDataInfo } from './document-page-meta-data';

/**
 * Resume of batch information
 *
 * @export
 * @interface IBatchMetaDataInfo
 */
export interface IBatchMetaDataInfo {
  batchId: number;
  /**
   * the batch name
   *
   * @type {string}
   * @memberof IBatchMetaDataInfo
   */
  batchName: string;
  /**
   * Array the documents with pages resume
   * @type {IDocumentMetaDataInfo []}
   * @memberof IBatchMetaDataInfo
   */
  documentMetaData: IDocumentMetaDataInfo[];
  /**
   * batch creation date
   *
   * @type {Date}
   * @memberof IBatchMetaDataInfo
   */
  dateCreated: Date;
}
