import { RoleSpecialPermission } from './role-special-permission';
import { RoleWorkflowsAssignment } from './role-workflows-assignmets';
import { ScannerProfileAssigments } from './scanner-profile-assigments';
import { UserProfile } from './user-profile';
import { OfflineWorkSetting } from './offline-work-setting';
import { RoleOfflineWorkSetting } from './role-offline-work-setting';

/**
 * Represents the roles configuration
 *
 * @export
 * @class RolesAdministrationModel
 */
export class RolesConfigurationModel {

    constructor(
        id: number, name: string, users: UserProfile[],
        workflowsAssigneds: RoleWorkflowsAssignment[],
        roleSpecialPermissions: RoleSpecialPermission,
        scannerProfileAssigments: ScannerProfileAssigments[],
        offlineSynchronizationSetting: RoleOfflineWorkSetting) {
        this.roleId = id;
        this.roleName = name;
        this.users = users;
        this.roleWorkflowsAssignments = workflowsAssigneds;
        this.rolesSpecialPermissions = roleSpecialPermissions;
        this.scannerProfilesAssignments = scannerProfileAssigments;
        this.offlineSynchronizationSetting = offlineSynchronizationSetting;
    }

    roleId: number;
    roleName: string;
    users: UserProfile[];
    roleWorkflowsAssignments: RoleWorkflowsAssignment[];
    rolesSpecialPermissions: RoleSpecialPermission;
    scannerProfilesAssignments: ScannerProfileAssigments[];
    assignedScannerProfiles: number;
    offlineSynchronizationSetting: RoleOfflineWorkSetting;
}
