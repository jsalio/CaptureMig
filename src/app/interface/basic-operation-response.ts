/**
 * Represents a basic operation response
 *
 * @export
 * @interface BasicOperationResponse
 */
export interface BasicOperationResponse<T> {
    message: string;
    success: boolean;
    operationResult: T;
}
