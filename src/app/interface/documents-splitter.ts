import { DocumentSeparatorType } from '../enums/document-separator-type.enum';

export interface DocumentsSplitter {
    WorkflowId: number;
    documentSplitterType: DocumentSeparatorType;
    pageQuantity: number;
    barcodeLocationConfiguration: any;
    barcodeValue: string;
    configuration: string;
    useCompose?: boolean;
    barcodeFormat: string;
    keepPageSeparator: boolean;
    separatorExpectedValue: string;
}
