import { Assignment } from './assignment';
import { BatchStatus } from '../enums/batch-status.enum';
import { Document } from './document';
import { ExternalPropertyValue } from './external-property-value';
import { Page } from './page';
import { Workflow } from './workflow';

/**
 * Represents a batch
 *
 * @export
 * @class Batch
 */
export class Batch {
  /**
   * represents a batch Identification
   *
   * @type {number}
   * @memberof Batch
   */
  id: number;
  /**
   * the batch name
   *
   * @type {string}
   * @memberof Batch
   */
  name: string;
  /**
   * represents the associated workflow
   *
   * @type {Workflow}
   * @memberof Batch
   */
  workflow: Workflow;
  /**
   * the workflow id
   *
   * @type {number}
   * @memberof Batch
   */
  workflowId: number;
  /**
   * the current batch status
   *
   * @type {BatchStatus}
   * @memberof Batch
   */
  batchStatus: BatchStatus;
  /**
   * string representation for BatchStatus
   *
   * @type {string}
   * @memberof Batch
   */
  batchStatusString: string;
  /**
   * creation date
   *
   * @type {Date}
   * @memberof Batch
   */
  creationDate: Date;
  /**
   * username of the user that create this
   *
   * @type {string}
   * @memberof Batch
   */
  username: string;
  /**
   * represents if this batch on row has change
   *
   * @memberof Batch
   */
  hasChanged: boolean = false;
  /**
   * represents  the pages associate of this.
   *
   * @type {Page[]}
   * @memberof Batch
   */
  pages: Page[];
  /**
   * represents the documents associates of this.
   *
   * @type {Document[]}
   * @memberof Batch
   */
  documents: Document[];
  /**
   * represents assignment of this to user
   *
   * @type {Assignment}
   * @memberof Batch
   */
  assignment: Assignment;
  /**
   *Represents the external properties  of this batch
   *
   * @type {ExternalPropertyValue[]}
   * @memberof Batch
   */
  externalProperties: ExternalPropertyValue[] = [];
  size: number;
  limitSize: number;
  limitWarningSize: number;

  constructor(
    id: number,
    name: string,
    workflow: Workflow,
    workflowId: number,
    batchStatus: BatchStatus,
    batchStatusString: string,
    creationDate: Date,
    username: string,
    pages: Page[],
    documents: Document[],
    assignment: Assignment,
    externalProperties: ExternalPropertyValue[] = [],
    size: number = 0,
    limitSize: number = 0,
    limitWarningSize: number = 0,
    hasChanged: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.workflow = workflow;
    this.workflowId = workflowId;
    this.batchStatus = batchStatus;
    this.batchStatusString = batchStatusString;
    this.creationDate = creationDate;
    this.username = username;
    this.pages = pages;
    this.documents = documents;
    this.assignment = assignment;
    this.externalProperties = externalProperties;
    this.size = size;
    this.limitSize = limitSize;
    this.limitWarningSize = limitWarningSize;
    this.hasChanged = hasChanged;
  }
}
