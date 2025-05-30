/**
 * Represents a batch creation model
 *
 * @export
 * @interface BatchCreateModel
 */
export interface BatchCreateModel {
  id: number;
  name: string;
  description: string;
  workflowId: number;
  dateCreated: Date;
  dateModified: Date;
  createdBy: string;
  modifiedBy: string;
}
