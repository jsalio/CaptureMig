import { Page } from "./page";

/**
 * Represents a request to restore a page.
 */
export interface RestorePageRequest {
  /**
   * The document ID.
   */
  documentId: number;
  /**
   * The page ID.
   */
  pageId: number;
  /**S
   * The batch ID.
   */
  batchId: number;
  /**
   * Represents the new position of the page in document.
   */
  newOrder: number;
}
/**
 * Represents a page that was deleted.
 */
export interface DeletePageInfo {
  /**
   * The page that was deleted.
   */
  page:Page;
  /**
   * The reason why the page was deleted.
   */
  reason:string;
  /**
   * The username of the user who deleted the page.
   */
  username:string;
  /**
   * The date when the page was deleted.
   */
  date:string;

}
