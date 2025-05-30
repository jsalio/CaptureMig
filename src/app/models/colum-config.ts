/**
 * Represents configuration of a column
 */
export interface ColumnConfiguration {
  /**
   * Represents the field name
   *
   * @type {string}
   */
  field: string;
  /**
   * Represents the label that should be displayed on column header
   *
   * @type {string}
   */
  header: string;
  /**
   * if Value of the cell should be translated
   *
   * @type {boolean}
   */
  translate?: boolean;
  /**
   * if value of the cell should be applied a date format
   *
   * @tutorial the format of this cell set default in dd/
   *
   * @type {boolean}
   */
  isDate?: boolean;
  /**
   * Represent if a cell content is display in a custom content
   *
   * @type {({
   *     containerType?: 'iTag' | 'aTag';
   *     className: string;
   *     toolTipText?: string
   *     text: string
   *   })}
   */
  extra?: {
    containerType?: 'iTag' | 'aTag';
    className: (row: any) => string;
    toolTipText?: (row: any) => string;
    text?: string;
    textFunc?: (row: any) => string;
  };
  style?: any;
  cellStyle?: any;
  styleClass?: string;
  cellStyleClass?: string
};


