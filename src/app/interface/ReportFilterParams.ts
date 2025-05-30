import { SectionReportViewType } from './../enum/section-report-view-type.enum';
import { GenericParameter } from './generic-parameter';
/**
 * Represents values ​​to apply in the dashboard filters
 * @export
 * @interface ReportFilterParams
 */
export interface ReportFilterParams {
  fromDate: GenericParameter;
  toDate: GenericParameter;
  reportSubLabel?: string;
  sectionReportViewType?: SectionReportViewType;
}
