import { Batch } from './batch';
import { CompoundSplittersAssignments as CompoundSplittersWorkflowAssigments } from './compound-splitters-assigments';
import { DocumentsSplitter } from '../interface/documents-splitter';
import { ExternalPropertiesAssigments } from './external-properties-assigments';
import { Volume } from '../interface/volume'
import { WorkflowSplitterModel } from './workflow-splitter-model';
import { WorkflowStepsConfiguration } from './workflow-steps-configuration';

/**
 * Represents a workflow.
 *
 * @export
 * @class Workflow
 */
export interface Workflow {

  /**
   * represents the workflow identification
   *
   * @type {number}
   * @memberof Workflow
   */
  id: number;
  /**
   * represents the workflow name
   *
   * @type {string}
   * @memberof Workflow
   */
  name: string;
  /**
   * represents if this workflow is archive
   * @description if {true} this workflow is enable in other case is disable-
   *
   * @type {boolean}
   * @memberof Workflow
   */
  isArchived: boolean;
  /**
   * Represents associated {Batch} tha use this configuration
   *
   * @type {Batch[]}
   * @memberof Workflow
   */
  batches: Batch[];
  /**
   * Represents the creation date
   *
   * @type {Date}
   * @memberof Workflow
   */
  creationDate: Date;
  /**
   * represents tha auto name configuration
   *
   * @type {string}
   * @memberof Workflow
   */
  autoName: string;
  /**
   * represents the steps you need to follow any batch that use this configuration
   *
   * @type {WorkflowStepsConfiguration}
   * @memberof Workflow
   */
  workflowStepsConfiguration: WorkflowStepsConfiguration;
  /**
   * represents if this configuration limited the quantity of documents on batches
   *
   * @type {boolean}
   * @memberof Workflow
   */
  isActiveDocumentLimitPerBatch: boolean;
  /**
   * represents if this configuration limited the quantity of pages on batches
   *
   * @type {boolean}
   * @memberof Workflow
   */
  isActivePageLimitPerBatch: boolean;
  /**
   * represents the limit of pages before launch a warning
   *
   * @type {number}
   * @memberof Workflow
   */
  pageLimitPerBatchAlert: number;
  /**
   * represents the limit of pages before launch a alert
   *
   * @type {number}
   * @memberof Workflow
   */
  pageLimitPerBatchQuantity: number;
  /**
   *  represents the limit of document before launch a warning
   *
   * @type {number}
   * @memberof Workflow
   */
  documentLimitPerBatchAlert: number;
  /**
   *  represents the limit of pages before launch a alert
   *
   * @type {number}
   * @memberof Workflow
   */
  documentLimitPerBatchQuantity: number;
  /**
   * represents the workflow splitter configuration
   *
   * @type {WorkflowSplitterModel}
   * @memberof Workflow
   */
  workflowSplitterConfiguration: WorkflowSplitterModel;
  /**
   * represents the volume Id
   *
   * @type {number}
   * @memberof Workflow
   */
  volumeId: number;
  /**
   * represents the volume configuration
   *
   * @type {Volume}
   * @memberof Workflow
   */
  volume: Volume;
  /**
   *
   *
   * @type {*}
   * @memberof Workflow
   */
  workflowSplitterBarcodeLocationConfigurations: any;
  /**
   *
   *
   * @type {DocumentsSplitter}
   * @memberof Workflow
   */
  documentsSplitter: DocumentsSplitter;
  /**
   * represents the special permission on batch as json string
   * @description this data should be transform before use.Use this
   * function {Utils.castToPermissions}
   * @example {Utils.castToPermissions(this)}
   *
   * @type {string}
   * @memberof Workflow
   */
  specialPermissions: string;
  /**
   *
   *
   * @type {ExternalPropertiesAssigments[]}
   * @memberof Workflow
   */
  externalPropertyAssigments: ExternalPropertiesAssigments[];
  /**
   *
   *
   * @type {CompoundSplittersWorkflowAssigments[]}
   * @memberof Workflow
   */
  compoundSplittersWorkflowAssigments: CompoundSplittersWorkflowAssigments[];
  /**
   * represents if the batches that use this configuration can be use the dynamic assignation
   *
   * @type {boolean}
   * @memberof Workflow
   */
  hasAutomaticAssignmentForDocuments: boolean;
  /**
   * Represents the limit of image size per batch
   *
   * @type {number}
   * @memberof Workflow
   */
  limitSizePerBatch: number;
  /**
   * Represents the limit of image size per batch before launch a warning
   *
   * @type {*}
   * @memberof Workflow
   */
  limitSizePerBatchWarning: any;
  /**
   * Represents the limit of image size in bytes per document
   *
   * @type {number}
   * @memberof Workflow
   */
  limitSizeOfImage: number;
  /**
   * Represents the limit of image size in bytes per document before launch a warning
   *
   * @type {number}
   * @memberof Workflow
   */
  limitSizeOfImageWarning: number;
}
