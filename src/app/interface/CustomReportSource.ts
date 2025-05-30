import { GenericParameter } from './generic-parameter';
/**
 * Represent a data for a custom report.
 * @export
 * @interface CustomReportSource
 */
export interface CustomReportSource {
  reportHeader: string;
  reportColumns: Array<GenericParameter>;
  reportData: Array<any>;
}
