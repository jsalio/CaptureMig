/**
 *Model for retrieve physical receptions using a filter
 *
 * @export
 * @interface GetPhysicalReceptionById
 */


export interface GetPhysicalReceptionById {
    /**
     * row Id
     */
    id: number;
    /**
    * Location Id to ref on <see cref="Location"/> row table
    */
    locationId: number;
}
