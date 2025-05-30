/**
 * Represents a role offline work setting model
 *
 * @export
 * @interface RoleOfflineWorkSetting
 */
export interface RoleOfflineWorkSetting {
  id: number;
  roleId: number;
  offlineWorkSettingId: number;
  isActive: boolean;
  dateCreated: Date;
  dateModified: Date;
  createdBy: string;
  modifiedBy: string;
}
