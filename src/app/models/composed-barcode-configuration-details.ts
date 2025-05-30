import { SplitterElementType } from '../enum/splitter-element-type.enum';

/**
 * Represents the documents splitter configuration details
 * @export
 * @interface ComposedBarcodeConfigurationDetails
 */
export interface ComposedBarcodeConfigurationDetails {
    id?: number;
    initialPosition: number;
    composedBarcodeConfigurationId?: number;
    finalPosition: number;
    elementType: SplitterElementType;
    elementKey: string;
    example: string;
}
