import { PhysicalReceptionState } from '../../enum/PhysicalReceptionState';

/**
 *Model for  update physical reception state
 *
 * @export
 * @interface UpdateReceptionStatus
 */

export interface UpdateReceptionStatus {
  /**
  * row Id
  */
  id: number;
  /**
  * Location Id to ref on <see cref="Location"/> row table
  */
  locationId: number;
  /**
   *Current state of this reception
   *
   * @type {PhysicalReceptionState}
   */
  receptionState: PhysicalReceptionState;
}
