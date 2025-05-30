/**
 *Model for assign physical reception
 *
 * @export
 * @interface AssignPhysicalReception
 */

export interface AssignPhysicalReception {

    /**
    * row Id
    */
    id: number;
    /**
    * Location Id to ref on <see cref="Location"/> row table
    */
    locationId: number;
    /**
  *Assigned to user
  *
  * @type {string}
  */
    userAssigned: string;
}
