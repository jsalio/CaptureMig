/**
 * Represents the workflow assigned to project
 */
export type AssignedProjectWorkflow = {
  /**
   * the workflow id
   *
   * @type {number}
   */
  workflowId: number;
  /**
   * the workflow name
   *
   * @type {string}
   */
  workflowName: string;
  /**
   * the project Id
   *
   * @type {number}
   */
  projectId: number;
};
