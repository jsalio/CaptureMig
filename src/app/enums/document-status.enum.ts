/**
 * Represents the status that can be taken by a document
 *
 * @export
 * @enum {number}
 */
export enum DocumentStatus {

    /**
    * This status is used when the document have been approve from QA index
    */
    approvedQaIndex = 'ApprovedQaIndex',

    /**
     * This status is used for indicating that a document is approved for quality assurance
     */
    approvedQaScan = 'ApprovedQaScan',

    /**
    * This status is used when the document have been created in the system.
    */
    created = 'Created',

    /**
    * This status is used when the document have been indexed in the system
    */
    indexed = 'Indexed',

    /**
    * This is the default document status.
    */
    none = 'None',

    /**
    * This status is used when the document have been rejected from QA Scan
    */
    rejectedQaScan = 'RejectedQaScan',

    /**
    * This status is used when the document have been rejected from QA index
    */
    rejectedQaIndex = 'RejectedQaIndex',

    /**
     * This status is used when the document has been rejected from Index.
     */
    rejectedIndex = 'RejectedIndex',

    /**
     * This status is used when the document has been rejected for a exception from index and it send to a supervisor.
     */
    pendingIndexSupervision = 'PendingIndexSupervision',

    /**
    * This status is used when the document has been worked in reject status.
    */
    workedInReject = 'WorkedReject',

    /**
    * This status is used when the document has been Skipped in reject status.
    */
    skipedInReject = 'SkipedReject',

    /**
    * This status is used when the document has been delete in reject.
    */
    deleteInRejected = 'DeleteRejected',

    released = 'Released',

    /**
     * This status is used when the document is pending revision for quality control of the scan
     */
    pendingToQaScan = 'PendingToQaScan',

    indexSupervision = 'IndexSupervision',
    /**
     * This status is used when the document has error on synchronization.
     */
    errorSynchronization = 'ErrorSynchronization',

    /**
     *  This status is used when a document in waiting for being indexed.
     */
    pendingToIndex = 'PendingToIndex',

    /**
     *  This status is used when a document is returned to index from release
     */
    returnedForRelease = 'ReturnedForRelease',

    /**
     *  This status is used when a document in waiting for being released.
     */
    pendingToRelease = 'PendingToRelease',

    /**
     *  This status is used when a document in waiting for being check at QA Index.
     */
    pendingQaIndex = 'PendingQaIndex',

    /**
     *  This status is used when a document in waiting for being check at QA Scan.
     */
    pendingQaScan = 'PendingQaScan',

    /**
     * This status is used when a document has been returned to index from index supervision.
     */
    returnForIndexSupervision = 'ReturnForIndexSupervision',

    /**
     * This status is used when a document has been indexed from index supervision.
     */
    indexedForIndexSupervision = 'IndexedForIndexSupervision',

    /**
     * This status is used when a document has been rejected from index supervision.
     */
    rejectForIndexSupervision = 'RejectForIndexSupervision',

    /**
     * This status is used when a document had a digitalization exception.
     */
    documentAlreadyExist = 'DocumentAlreadyExist',

    /**
     * This status is used when a document are pending to be worked on the digitalization exception.
     */
    pendingOnDigitalizationException = 'PendingOnDigitalizationException',

    /**
     * This status is used the document has been worked for the digitalization exception.
     */
    workedOnDigitalizationException = 'WorkedOnDigitalizationException',

    /**
     * This status is used when the document has been omitted for indexation
     */
    indexationOmitted = 'IndexationOmitted',

    pendingToConvertToPdf = 'PendingToConvertToPdf',

    convertedToPdf = 'ConvertedToPdf'
}
