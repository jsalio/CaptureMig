import { ScannerProfile } from './scanner-profile';

/**
 * Represents the assignment of a scanner profile to a role
 * @export
 * @class ScannerProfileAssigments
 */
export interface ScannerProfileAssigments {

    scannerProfileId: number;
    roleId: number;
    isDefault: boolean;
    scannerProfile?: ScannerProfile;
}
