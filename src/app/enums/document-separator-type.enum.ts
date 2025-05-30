/**
 * Represents the document's types separators.
 * @export
 * @enum {number}
 */
export enum DocumentSeparatorType {

    /**
     * Used this for splitting a document by page quantity.
     */
    pageQuantity = 'PageQuantity',

    /**
     * Used this for splitting a document by a barcode.
     */
    barcode = 'Barcode',
    composeBarcode = 'ComposeBarcode',

    /**
     * Used this for splitter pages with ProDoctivity fluency QR
     */
    proDoctivityQr = 'ProDoctivityQr',

    /**
     * Used this for split pages with ProDoctivity fluency QR
     */
    mixed = 'Mixed'
}
