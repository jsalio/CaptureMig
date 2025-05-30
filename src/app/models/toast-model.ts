/**
 * Represents the data to be send to the toastcontrol
 *
 * @export
 * @class ToastModel
 */
export class ToastModel {
    title: string;
    message: string;
    options: any;

    constructor(title: string, message: string, options: any = null) {
        this.title = title;
        this.message = message;
        this.options = options;
    }
}
