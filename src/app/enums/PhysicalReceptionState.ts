/**
 * Represents a physical reception model
 *
 * @export
 * @enum {number}
 */


export enum PhysicalReceptionState {
  /**
   *
   */
  PendingAssign = 'PendingAssign',
  /**
   *
   */
  Assigned = 'Assigned',
  /**
   *
   */
  PendingToPrepare = 'PendingToPrepare',
  /**
   *
   */
  Prepared = 'Prepared'
}
