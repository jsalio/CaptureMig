/**
 * Represents the type of event to subscribe
 * @export
 * @enum {number}
 */
export enum EventType {
    /**
     * Represents the event that triggers when the element changes its state
     */
    ChangeState = 'ChangeState',

    /**
     * Represents the event that is triggered when the element has some error in the process
     */
    Error = 'Error',

    /**
     * Represents the event that is triggered when the item is released
     */
    Release = 'Release',

    /**
     *Represents the event that triggers when the element is indexed
     */
    Index = 'Index',

    /**
     * Represents the event that is triggered when the item is recognized
     */
    ScanAndRecognized = 'ScanAndRecognized'
}
