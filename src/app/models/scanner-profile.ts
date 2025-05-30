import { PaperSizeConfiguration } from './paper-size-configuration';
import { PixelTypeConfiguration } from './pixel-type-configuration';

/**
 * Represents the scanner profile configuration items.
 *
 * @export
 * @class ScannerProfile
 */
export class ScannerProfile {
  id: number;
  name: string;
  profileStatus: string;
  automaticBrightness: boolean;
  bothSides: boolean;
  automaticFeeding: boolean;
  automaticScan: boolean;
  pixelTypeConfigurationId: number;
  pixelTypeConfiguration: PixelTypeConfiguration;
  imageQuality: number;
  resolution: number;
  paperSizeConfiguration: PaperSizeConfiguration;
  paperSizeConfigurationId: number;
  autoDetectedSize: boolean;
  skipBlankPage: boolean;
  automaticAlignment: boolean;
  scannerUi: boolean;
  showIndicator: boolean;

  constructor(
    id: number,
    name: string,
    profileStatus: string,
    automaticBrightness: boolean,
    bothSides: boolean,
    automaticFeeding: boolean,
    automaticScan: boolean,
    pixelTypeConfigurationId: number,
    pixelTypeConfiguration: PixelTypeConfiguration,
    imageQuality: number,
    resolution: number,
    paperSizeConfiguration: PaperSizeConfiguration,
    paperSizeConfigurationId: number,
    autoDetectedSize: boolean,
    skipBlankPage: boolean,
    automaticAlignment: boolean,
    scannerUi: boolean,
    showIndicator: boolean
  ) {
    this.id = id;
    this.name = name;
    this.profileStatus = profileStatus;
    this.automaticBrightness = automaticBrightness;
    this.bothSides = bothSides;
    this.automaticFeeding = automaticFeeding;
    this.automaticScan = automaticScan;
    this.pixelTypeConfigurationId = pixelTypeConfigurationId;
    this.pixelTypeConfiguration = pixelTypeConfiguration;
    this.imageQuality = imageQuality;
    this.resolution = resolution;
    this.paperSizeConfiguration = paperSizeConfiguration;
    this.paperSizeConfigurationId = paperSizeConfigurationId;
    this.autoDetectedSize = autoDetectedSize;
    this.skipBlankPage = skipBlankPage;
    this.automaticAlignment = automaticAlignment;
    this.scannerUi = scannerUi;
    this.showIndicator = showIndicator;
  }
}
