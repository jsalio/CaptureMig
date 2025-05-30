import { PageStatus } from '../enum/page-status.enum';

/**
 * @interface DocumentViewerImageModel
 */
export interface DocumentViewerImageModel {
  url: string;
  thumbnailImageUrl?: string;
  exceptionMessage?: string;
  isSelected?: boolean;
  hasDigitalizationException?: boolean;
  pageId: number;
  batchId?: number;
  pageIdOffline: number;
  isTheImageCurrentlyDisplay: boolean;
  orientationDegree: number;
  isMissingImage?: boolean;
  pageNotSaved?: boolean;
  version: number;
  order: number;
  dateSelected?: Date;
  pageStatus: PageStatus;
  size?: number;
  thumbnailSize?: number;
  limitSizeOfImage?: number;
  limitSizeOfImageWarning?: number;
}
