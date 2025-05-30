/**
 * Represents the model use for supplying the data to the different widget in the dashboard.
 *
 * @export
 * @interface ReportDataSource
 */
export interface ReportDataSource {
  label: string;

  // This is any due to is a generic property that will be used for diffeten widgets.
  value: any;
}
