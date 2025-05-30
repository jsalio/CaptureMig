/**
 * Represents the assignment of composed barcode splitter configuration assigned to this workflow
 * @export
 * @class CompoundSplittersAssignments
 */
export class CompoundSplittersAssignments {
  /**
   * represents the id of composed bar-code configuration
   *
   * @type {number}
   * @memberof CompoundSplittersAssignments
   */
  composedBarcodeConfigurationId: number;
  /**
   * represents the id of current workflow
   *
   * @type {number}
   * @memberof CompoundSplittersAssignments
   */
  workflowId: number;

  /**
   * Creates a new instance of  <{CompoundSplittersAssignments}>
   * @param workflowId workflow id
   * @param composedBarcodeConfigurationId composed barcode configuration id
   */
  constructor(workflowId: number, composedBarcodeConfigurationId: number) {
    this.workflowId = workflowId;
    this.composedBarcodeConfigurationId = composedBarcodeConfigurationId;
  }
}
