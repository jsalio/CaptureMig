import { BarcodeFormat } from '../enums/barcode-format.enum';
import { ColorReader } from '../enums/color-reader.enum';
import { ReaderOrientation } from '../enums/reader-orientation.enum';

/**
 * Represent WorkflowSplitter configuration
 * @export
 * @class WorkflowSplitterModel
 */
export interface WorkflowSplitterModel {
    workflowId: number;
    codeFormat: BarcodeFormat;
    coordinateX: number;
    coordinateY: number;
    width: number;
    height: number;
    readerTimeOut: number;
    readerColorMode: ColorReader;
    barcodeLocationConfiguration: any;
    orientation: ReaderOrientation;
    extractedExampleData: string;
    extractedDataExample: string;
    keepPage: boolean;
}
