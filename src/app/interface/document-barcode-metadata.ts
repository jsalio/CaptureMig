import { SplitterElementType } from '../enums/splitter-element-type.enum';

export interface DocumentBarcodeMetadata {
    documentId: number;
    metadataId: number;
    splitterElementType: SplitterElementType;
    extractedInfo: string;
    extractedElementKey: string;
}
