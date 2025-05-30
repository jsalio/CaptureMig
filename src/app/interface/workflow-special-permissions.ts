/**
 * Represents special permissions on workflows
 *
 * @export
 * @interface WorkflowSpecialPermissions
 */
export interface WorkflowSpecialPermissions {
  /**
   * Set if the user can be deleted pages on Scan step
   *
   * @type {boolean}
   * @memberof WorkflowSpecialPermissions
   */
  deletePageScan: boolean;
  /**
   * Set if the user can be deleted pages on Qa Scan step
   *
   * @type {boolean}
   * @memberof WorkflowSpecialPermissions
   */
  deletePageQaScan: boolean;
  /**
   * Set if the user can be deleted pages on Index step
   *
   * @type {boolean}
   * @memberof WorkflowSpecialPermissions
   */
  deletePageIndex: boolean;
  /**
   * Set if the user can be deleted pages on Qa-index step
   *
   * @type {boolean}
   * @memberof WorkflowSpecialPermissions
   */
  deletePageQaIndex: boolean;
  /**
   * Set if the user can be deleted pages on index supervision special step
   *
   * @type {boolean}
   * @memberof WorkflowSpecialPermissions
   */
  deletePageInIndexSupervision: boolean;
  /**
   * Set if the user should be use approve all document option on Qa Scan.
   *
   * @type {boolean}
   * @memberof WorkflowSpecialPermissions
   */
  approveAllDocumentsQaScan: boolean;
  /**
 * Set if the user should be use approve all document option on Qa Scan.
 *
 * @type {boolean}
 * @memberof WorkflowSpecialPermissions
 */
  approveAllDocumentsQaIndex: boolean;
  /**
   * Set if the user can be delete documents
   *
   * @type {boolean}
   * @memberof WorkflowSpecialPermissions
   */
  deleteDocuments: boolean;
  /**
   *
   *
   * @type {boolean}
   * @memberof WorkflowSpecialPermissions
   */
  ignoreDefaultDocumentType: boolean;
}

