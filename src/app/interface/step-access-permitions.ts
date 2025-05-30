/**
 * Represents access permissions to the workflow.
 * @export
 * @interface StepAccessPermitions
 */
export interface StepAccessPermitions {
  dashboard: boolean;
  digitalize: boolean;
  qaScan: boolean;
  index: boolean;
  qaIndex: boolean;
    canWorkOwnerDigitalizationBatches: boolean;
    canWorkOwnerQaScanBatches: boolean;
    canWorkOwnerIndexBatches: boolean;
    canWorkOwnerQaIndexBatches: boolean;
    canWorkOwnerIndexSupervisionDocuments: boolean;
    canWorkOwnerDigitalizationExceptionDocuments: boolean;
  controlPanel: boolean;
  indexSupervision: boolean;
  digitalizacionException: boolean;
  configuration: boolean;
}
