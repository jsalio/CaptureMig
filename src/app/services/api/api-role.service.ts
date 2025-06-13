import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RolesConfigurationModel } from '../../models/roles-configuration-model';
import { environment } from '../../../environments/environment';
import { RoleWorkflowsAssignment } from '../../models/role-workflows-assignmets';
import { RoleSpecialPermission } from '../../models/role-special-permission';
import { OfflineWorkSetting } from '../../models/offline-work-setting';
import { ScannerProfileAssigments } from '../../models/scanner-profile-assigments';

@Injectable({
  providedIn: 'root'
})
export class ApiRoleService {

  constructor(private http: HttpClient) { }

  /**
 * Performs the request to get roles configuration
 *
 * @returns { Promise<Array<RolesConfigurationModel>> } The suggested name
 * @memberof RolesService
 */
  getRolesConfiguration(): Promise<Array<RolesConfigurationModel>> {
    return this.http.get<Array<RolesConfigurationModel>>(`${environment.proDoCaptureApiUrl}/roles`).toPromise();
  }

  getUsersByRole(id: number): Promise<RolesConfigurationModel> {
    return this.http.get<RolesConfigurationModel>(`${environment.proDoCaptureApiUrl}/roles/${id}`).toPromise();
  }

  getWorkflowAssignedToRole(roleId: number, getNotArchived: boolean = false): Promise<Array<RoleWorkflowsAssignment>> {
    return this.http.get<Array<RoleWorkflowsAssignment>>
    (`${environment.proDoCaptureApiUrl}/roles/${roleId}/workflows?getAvailable=${getNotArchived}`).toPromise();
  }

  getSpecialPermissionsOfRole(roleId: number): Promise<RoleSpecialPermission> {
    return this.http.get<RoleSpecialPermission>(`${environment.proDoCaptureApiUrl}/roles/${roleId}/special-permissions`).toPromise();
  }

  getOfflineWorkSetting(roleId: number): Promise<OfflineWorkSetting> {
    return this.http
    .get<OfflineWorkSetting>(`${environment.proDoCaptureApiUrl}/roles/${roleId}/offline-synchronization-setting`).toPromise();
  }


  updateRoleSetting(role: RolesConfigurationModel): Promise<Array<string>> {
    return this.http.post<Array<string>>(`${environment.proDoCaptureApiUrl}/roles/update`, role).toPromise();
  }

  getScannerProfilesAssignedToRole(roleId: number): Promise<Array<ScannerProfileAssigments>> {
    return this.http.get<Array<ScannerProfileAssigments>>(`${environment.proDoCaptureApiUrl}/roles/${roleId}/scanner-profiles`).toPromise();
  }

  assignScannerProfile(roleId: number, scannerProfileAssigments: ScannerProfileAssigments): Promise<string> {
    return this.http.put<string>(`${environment.proDoCaptureApiUrl}/roles/${roleId}/scanner-profiles`, scannerProfileAssigments)
      .toPromise();
  }

  assignWorkflow(roleId: number, roleWorkflowAssigment: RoleWorkflowsAssignment): Promise<string> {
    return this.http.put<string>(`${environment.proDoCaptureApiUrl}/roles/${roleId}/workflows`, roleWorkflowAssigment).toPromise();
  }
}
