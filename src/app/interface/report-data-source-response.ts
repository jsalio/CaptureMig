import { DocumentStatus } from '../enum/document-status.enum';

/**
 * Represents the model use for supplying the data to the different widget in the dashboard.
 *
 * @export
 * @interface ReportDataSourceResponse
 */
export interface ReportDataSourceResponse {
  items: Array<IDocumentStatusReportDetails>,
  totalItems: number;
}

export interface IDocumentStatusReportDetails {
  documentStatus: DocumentStatus;
  counter: number;
}
