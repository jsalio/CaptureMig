import { StepAccessPermitions } from './step-access-permitions';
/**
 * Represents a workflow assigned to a Rol
 * @export
 * @interface AssigmentWorkflow
 */
export interface AssigmentWorkflow {
    workflowId: number;
    workflowName: string;
    stepAccess: StepAccessPermitions;
}
