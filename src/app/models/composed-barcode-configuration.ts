// import { SplitterElementType } from '../enum/splitter-element-type.enum';
import { ComposedBarcodeConfigurationDetails } from './composed-barcode-configuration-details';

/**
 * Represents the documents splitter configuration
 * @export
 * @interface ComposedBarcodeConfiguration
 */
export interface ComposedBarcodeConfiguration {
    id?: number;
    composedBarcodeConfigurationDetails: ComposedBarcodeConfigurationDetails[];
    barcodeLocationConfiguration: any;
    barcodeLocationAssignations: any;
    extractedExampleData: string;
    barcodeFormatExternalId: number;
    barcodeFormat: string;
    extractedDataExample: string;
}
