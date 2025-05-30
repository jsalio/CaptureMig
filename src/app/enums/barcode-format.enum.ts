/**
 * Represent global types of barcode format
 * @export
 * @enum {number}
 */
export enum BarcodeFormat {
    CODE39 = 'CODE39',
    CODE128 = 'CODE128',
    CODE93 = 'CODE93',
    CODABAR = 'CODABAR',
    ITF = 'ITF',
    EAN13 = 'EAN 13',
    EAN8 = 'EAN 8',
    UPCA = 'UPC A',
    UPCE = 'UPC E',
    INDUSTRIAL25 = 'INDUSTRIAL25',
    OneD = 'OneD',
    PDF417 = 'PDF417',
    DATAMATRIX = 'DATAMATRIX',
    All = 'All'
}
