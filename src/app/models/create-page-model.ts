import { PageStatus } from './../enum/page-status.enum';
/**
 * Represents the page data that needs to be created
 *
 * @export
 * @class PageCreateModel
 */
export class PageCreateModel {
  batchId: number;
  documentId: number;
  base64String: string;
  filename: string;
  order: number;
  pageId?: number;
  pageStatus?: PageStatus;
  isBlackAndWhiteScale: boolean;
  isTiffFormat: boolean;
  url?: string;
  pagesOfflineResult?: any[];
  thumbnailImageUrl?: string;
  fileNumber?: number;
  indexOnBuffer?: number;
  pixelType: number;
  size?: number;
  thumbnailSize?: number;
  constructor(batchId: number, base64String: string, order: number, pixelType: number) {
    this.batchId = batchId;
    this.base64String = base64String;
    this.order = order;
    this.pixelType = pixelType;
  }
}
