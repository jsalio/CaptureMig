/**
 * Model for retrieve Resume information about batch and documents
 *
 * @export
 * @interface IDocumentPageResume
 */
export interface IDocumentPageResume {
  /**
   * Document Type name
   *
   * @type {string}
   * @memberof IDocumentPageResume
   */
  documentTypeName: string;
  /**
   * Document count create under this Document type name
   *
   * @type {string}
   * @memberof IDocumentPageResume
   */
  documentCounter: number;
  /**
   * pages count create under this Document type name and document
   *
   * @type {string}
   * @memberof IDocumentPageResume
   */
  documentPageCounter: number;

  isSummary: boolean;
}
