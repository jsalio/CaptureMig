import { WorkflowSplitterModel } from './workflow-splitter-model';

/**
 * Represents a workflow to show on a list.
 *
 * @export
 * @class Workflow
 */
export class WorkflowList {

  id: number;
  name: string;
  isArchived: boolean;
  batches: number;
  creationDate: Date;
  autoName: string;
  volumeId: number;
  specialPermissions: string;
  workflowSplitterConfiguration: WorkflowSplitterModel;
}
