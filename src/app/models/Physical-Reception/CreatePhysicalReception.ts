import { PhysicalReceptionState } from '../../enum/PhysicalReceptionState';

/**
 * Represents a create physical receipt model
 */



export interface CreatePhysicalReception {
  /**
  * Location Id to ref on <see cref="Location"/> row table
  */
  locationId: number;
  /**
   *Reference name
   *
   * @type {string}
   */
  references: string;
  /**
   *the reference Id
   *
   * @type {string}
   */
  referenceId: string;
  /**
   *Assigned to user
   *
   * @type {string}
   */
  userAssigned: string;
  /**
   *physical reception comment
   *
   * @type {string}
   */
  comment: string;
  /**
   *Current state of this reception
   *
   * @type {PhysicalReceptionState}
   */
  receptionState: PhysicalReceptionState;
}
