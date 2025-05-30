import { PageStatus } from '../enums/page-status.enum';

/**
 * Represent a page
 * @export
 * @class Page
 */
export interface Page {
  id: number;
  batchId: number;
  filename: string;
  order: number;
  version: number;
  pageStatus: PageStatus;
  pageMetadata: any;
  /**
   * The size of the page in bytes
   * @type {number}
   * @memberof Page
   */
  size: number;
  /**
   * the size of the thumbnail in bytes
   *
   * @type {number}
   * @memberof Page
   */
  thumbnailSize: number;
  garbage?:{
    date:string;
    reason:string;
    username:string;
  }
}
