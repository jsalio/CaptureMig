/**
 * Represents a workflow steps configurations.
 *
 * @export
 * @class Workflow
 */
export class WorkflowStepsConfiguration {
  static maxQaPercent = 100;
  static minQaPercent = 1;
  static minPagePerBatch= 1;
  static minDccumentsPerBatch = 1;
  static maxIndexingNumber = 10;
  static minIndexingNumberWithMultipleIndexing = 2;
  static minIndexingNumber = 1;

  workflowStepsConfigurationId: number;
  qaScanScannedDocumentsPercent: number;
  qaScanDocumentsApprovementPercent: number;
  qaIndexScannedDocumentsPercent: number;
  qaIndexDocumentsApprovementPercent: number;
  indexingNumbers: number;
  isMultipleIndexingActive: boolean;
  isActiveQaScan: boolean;
  isActiveQaIndex: boolean;
  hasIndexSupervision: boolean;
  hasExternalValidation: boolean;
  hasToConvertToPdfToRelease: boolean;
  convertDocumentsToSearchablePdf: boolean;
  hasToReturnAllDocumentFromQAScan: boolean;
  hasToReturnAllDocumentFromQAIndex: boolean;
}
