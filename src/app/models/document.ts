import {Index} from '.';
import {DocumentStatus} from '../enums/document-status.enum';
import {DocumentAssignment} from '../interface/document-assignment';
import {DocumentComment} from '../interface/document-comment' //'../interface/document-comment';
import {Batch} from './batch';
import {Page} from './page';
import { DocumentQrMetadata } from './document-qr-metadata';
import { DocumentExternalProperty } from './document-external-property';
import { DocumentBarcodeMetadata } from '../interface/document-barcode-metadata';

/**
 * Represents a Document.
 * @export
 * @class Document
 */
export interface Document {
  id: number;
  batchId: number;
  batch: Batch;
  documentType: number;
  order: number;
  dateCreated: Date;
  pages: Page[];
  status: DocumentStatus;
  userBatchCreated?: string;
  indices: Index[];
  comments: DocumentComment[];
  assignment: DocumentAssignment;
  documentQrMetadata: DocumentQrMetadata;
  externalProperties: DocumentExternalProperty[];
  documentBarcodeMetadata: DocumentBarcodeMetadata[];
}
