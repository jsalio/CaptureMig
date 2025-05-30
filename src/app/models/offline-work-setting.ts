
/**
 * Represents a offline work mode setting
 *
 * @export
 * @class OfflineWorkSettings
 */
export class OfflineWorkSetting {
    id: number;
    name: string;
    retry: number;
    deletedImagesOnComplete: boolean;
    from: any;
    to: any;
    days: any;
}
