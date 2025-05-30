/**
 * Represents the assignment of a scanner profile to a role
 * @export
 * @class ExternalPropertiesAssigments
 */
export class ExternalPropertiesAssigments {

    externalPropertyId: number;
    workflowId: number;

    constructor(workflowId: number, externalPropertyId: number) {
        this.workflowId = workflowId;
        this.externalPropertyId = externalPropertyId;
    }
}
