import { BatchStatus } from '../enums/batch-status.enum';

/**
 * Represents a batch with pages data
 *
 * @export
 * @class BatchWithPagesModel
 */
export class BatchWithPagesModel {
  id: number;
  name: string;
  workflow: string;
  workflowId: number;
  batchStatus: BatchStatus;
  creationDate: Date;
  pageLimitPerBatchAlert: number;
  pageLimitPerBatchQuantity: number;
  documentLimitPerBatchAlert: number;
  documentLimitPerBatchQuantity: number;
  username: string;
  pages: number;
  pagesNotSynchronized: number;
  isAssignment: boolean;
  isActiveDocumentLimitPerBatch: boolean;
  isActivePageLimitPerBatch: boolean;
  size: number;
  limitSize: number;
  limitWarningSize: number;

  constructor(
    id: number,
    name: string,
    workflow: string,
    workflowId: number,
    batchStatus: BatchStatus,
    creationDate: Date,
    pageLimitPerBatchAlert: number,
    pageLimitPerBatchQuantity: number,
    documentLimitPerBatchAlert: number,
    documentLimitPerBatchQuantity: number,
    username: string,
    pages: number,
    pagesNotSynchronized: number,
    isAssignment: boolean,
    isActiveDocumentLimitPerBatch: boolean,
    isActivePageLimitPerBatch: boolean,
    size: number,
    limitSize: number,
    limitWarningSize: number
  ) {
    this.id = id;
    this.name = name;
    this.workflow = workflow;
    this.workflowId = workflowId;
    this.batchStatus = batchStatus;
    this.creationDate = creationDate;
    this.pageLimitPerBatchAlert = pageLimitPerBatchAlert;
    this.pageLimitPerBatchQuantity = pageLimitPerBatchQuantity;
    this.documentLimitPerBatchAlert = documentLimitPerBatchAlert;
    this.documentLimitPerBatchQuantity = documentLimitPerBatchQuantity;
    this.username = username;
    this.pages = pages;
    this.pagesNotSynchronized = pagesNotSynchronized;
    this.isAssignment = isAssignment;
    this.isActiveDocumentLimitPerBatch = isActiveDocumentLimitPerBatch;
    this.isActivePageLimitPerBatch = isActivePageLimitPerBatch;
    this.size = size;
    this.limitSize = limitSize;
    this.limitWarningSize = limitWarningSize;
  }
}
