/**
 * Represents the status that can be taken by a batch
 *
 * @export
 * @enum {number}
 */
/**
 * Represents the status that can be taken by a batch
 *
 * @export
 * @enum {number}
 */
export enum BatchStatus {

  /**
   * This status is the default status for a batch.
   */
  None = 'None',

  /**
   * This status is used when a batch have been created in the system.
   */
  Created = 'Created',

  /**
   * This status is used when an user has not deferred a batch.
   */
  Opened = 'Opened',

  /**
   * This status is used when an user releases a batch.
   */
  Deferred = 'Deferred',

  /**
   * This status is used when a batch has been returned from QA Scan.
   */
  ReturnedQaScan = 'ReturnedQaScan',

  /**
   * This status is used when a batch has been returned from QA Index.
   */
  ReturnedQaIndex = 'ReturnedQaIndex',

  /**
 * This status is used when a batch has been returned from QA Index.
 */
  ErrorOnRecognition = 'ErrorOnRecognition',

  ErrorOnRouting = 'ErrorOnRouting',

  RecognizingDocuments = 'RecognizingDocuments',

  /**
   * This status is used when a batch has been released to ProDoctivity.
   */
  Released = 'Released',

  /**
   This status is used to mark a batch as available for page recognition.
   */
  PendingRecognition = 'PendingRecognition',

  /**
   This status is used to mark a batch as available for indexing.
   */
  PendingToIndex = 'PendingToIndex',

  /**
   This status is used to mark a batch as available for QA Scan process.
   */
  PendingQAScan = 'PendingQaScan',

  /**
   * This status is used to mark a batch as pending from QA index.
   */
  PendingQaIndex = 'PendingQaIndex',

  /**
  This status is used to mark a batch as pending release
  */
  PendingRelease = 'PendingRelease',

  /**
   * This status is used when a batch has been returned from Index.
   */
  ReturnedIndex = 'ReturnedIndex',

  /**
 * This status is used when a batch has been deleted from batch Control.
 */
  Deleted = 'Deleted',

  /**
   * This status is used when the batch has been indexed.
   */
  Indexed = 'Indexed',

  /**
   * Represents a batch's status of returned of release
   */
  ReturnedOfRelease = 'ReturnedOfRelease',

  /**
   * This status is used when the batch has been returned by the recognition process document.
   */
  ReturnedRecognition = 'ReturnedRecognition',

  /**
   * This status is used when the batch is pending to convert his documents to pdf to the release process.
   */
  PendingToConvertToPdf = 'PendingToConvertToPdf',
  ErrorConvertingToPdf = 'ErrorConvertingToPdf',

  ConvertedToPdf = 'ConvertedToPdf',

  ConvertingToPdf = 'ConvertingToPdf'
}
