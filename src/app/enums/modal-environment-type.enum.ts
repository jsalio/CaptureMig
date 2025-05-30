/**
 * Represent state of document worked in returned document view
 *
 * @export
 * @enum {number}
 */
export enum ModalEnvironmentType {
    IgnoredPending = 0,
    FinishReview = 1,
    ExistsPendingDocumentsOnExceptionQueue = 2,
    BatchOnRecognitionError = 3
  }
