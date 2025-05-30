import { AssigmentWorkflow } from '../interface/assigment-workflow';
import { StepAccessPermitions } from '../interface/step-access-permitions';
import { Workflow } from './workflow';

/**
 * Represents the roles configuration
 *
 * @export
 * @class RolesAdministrationModel
 */
export class RoleWorkflowsAssignment {

    constructor(roleId: string, workflow: AssigmentWorkflow) {
        this.roleId = roleId;
        this.workflowId = workflow.workflowId;
        this.accessPermitions = workflow.stepAccess;
        this.queuePermissions = JSON.stringify(this.accessPermitions);
    }

    roleId: string;
    workflowId: number;
    workflow: Workflow;
    accessPermitions: StepAccessPermitions;
    queuePermissions: string;
}
