/**
 * Represent rectangle draw for barcode on page
 * @export
 * @class BarcodeRectangle
 */
export class BarcodeRectangle {
    X: number;
    Y: number;
    width: number;
    height: number;

    constructor(X: number, Y: number, width: number, height: number) {
        this.X = X;
        this.Y = Y;
        this.width = width;
        this.height = height;
    }
}
