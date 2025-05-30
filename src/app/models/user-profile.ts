import { RoleSpecialPermission } from './role-special-permission';
import { RolesConfigurationModel } from './roles-configuration-model';
import { StepAccessPermitions } from '../interface/step-access-permitions';
import { OfflineWorkSetting } from './offline-work-setting';

/**
 * Represents a user profile model
 *
 * @export
 * @interface UserProfile
 */
export interface UserProfile {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isSystem: boolean;
    isArchived: boolean;
    dateCreated: Date;
    dateModified: Date;
    createdBy: string;
    modifiedBy: string;
    roles: string[];
    permissions: string[];
    settings: any;
    workflowStepsPermissions:StepAccessPermitions
    offlineSynchronizationSettings:Array<OfflineWorkSetting>
    tokenExpirationDate:string
}
