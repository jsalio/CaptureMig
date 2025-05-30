/**
 * Responsable of core's error handling
 *
 * @export
 * @class CustomErrorHandler
 */
export class CustomErrorHandler {
    /**
     * Parsed exception's message from a json
     * @param {*} exception the error that have the Exception
     * @returns {string} The Error message parsed
     * @memberof CustomErrorHandler
     */
    getMessage(exception: any): string {
        try {
            const errorMessageFromApi: string = exception.error.message;
            const errorMessage: string = exception.message;

            if (errorMessageFromApi) {
                return errorMessageFromApi;
            } else if (errorMessage) {
                return errorMessage;
            }
        } catch (error) {
            return exception;
        }
        return ""
    }

}
