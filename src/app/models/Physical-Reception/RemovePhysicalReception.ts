/**
 *Model for remove physical reception
 *
 * @export
 * @interface RemovePhysicalReception
 */

export interface RemovePhysicalReception {
    /**
    * row Id
    */
    id: number;
    /**
    * Location Id to ref on <see cref="Location"/> row table
    */
    locationId: number;
}
