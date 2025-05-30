/**
 * Represents a special permission of a role.
 *
 * @export
 * @class RoleSpecialPermission
 */
export interface RoleSpecialPermission {
  roleId: number;
  hasWorkflowsAdministration: boolean;
  hasBatchesControl: boolean;
  hasReleaseBatches: boolean;
  hasDeleteBatches: boolean;
  hasUnblockBatches: boolean;
  hasRenameBatches: boolean;
  hasDeletePages: boolean;
  hasApproveAllDocuments: boolean;
  hasApproveAllDocumentsOnQaIndex: boolean;
  hasIndexOnSupervision: boolean;
  canReleaseOnDigitalizationException: boolean;
  canWorkWithRandomAssignation: boolean;
  canWorkOnOfflineMode: boolean;
  canUpdateScannerProfileOnDigitization: boolean;
}
