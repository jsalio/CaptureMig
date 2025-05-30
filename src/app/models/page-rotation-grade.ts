/**
 * Represents image rotation on document-view component
 *
 * @exports PageRotationGrade
 * @example {pageId : 1, grade: 180 } : Represent that this page already rotate in 180 grades respect your original orientation
 */
export interface PageRotationGrade {
  /**
   * the current page Id
   *
   * @type {number}
   * @memberof PageRotationGrade
   */
  pageId: number;
  /**
   * represent grades rotation on numeric values
   *
   * @type {number}
   * @example Possible values (0,90,180,270)
   * @memberof PageRotationGrade
   */
  grade: number;
}
