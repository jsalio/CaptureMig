import { DocumentStatus } from '../enum/document-status.enum';
  /**
 *
 * represent a document rejected with your comments
 * @export
 * @interface DocumentRejectedRow
 */
export interface DocumentRejectedRow {
    documentId: number;
    annotation: string;
    status: DocumentStatus;
  }
