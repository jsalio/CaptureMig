/**
 * Represents a user documents/page action.
 *
 * @export
 * @enum {number}
 */
export enum DocumentsActionTypes {

  /**
   * Represents the action when a user digitalized a document/page.
   */
  digitalizer = 'Digitalized',

  /**
   * Represents the action when a user reviews a document/page at Qa Scan.
   */
  reviewedOnQaScan = 'ReviewedOnQaScan',

  /**
   * Represents the action when a user reviews a document/page at Index.
   */
  reviewedOnIndex = 'ReviewedOnIndex',

  /**
   * Represents the action when a user reviews a document/page at QaIndexed.
   */
  reviewedOnQaIndex = 'ReviewdOnQaIndex',

  /**
   * Represents the action when a user reviews a document/page at IndexSupervision
   */
  reviewedOnSupervisorIndex = 'ReviewedOnSupervisorIndex',

  /**
   * Represents the action when a user reviews document/page in digitalization
   */
  reviewedOnDigitalizer = 'ReviewedOnDigitalizer',
}
