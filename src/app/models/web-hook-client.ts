import { EventType } from '../enum/event-type.enum';
import { SubscriptionType } from '../enum/subscription-type.enum';
import { VerbType } from '../enum/verb-type.enum';

/**
 * Represents a client that subscribes to web-hook notifications
 * @export
 * @class WebHookClient
 */
export interface WebHookClient {

    /**
     * Represents a web-hook id
     * @type {number}
     * @memberof WebHookClient
     */
    id: number;

    /**
     * Represents a configuration name
     * @type {string}
     * @memberof WebHookClient
     */
    configurationName: string;

    /**
    * Represents a Server Address
    * @type {string}
    * @memberof WebHookClient
    */
    clientServer: string;

    /**
    * Represents a resource {Method} for send request data
    * @type {string}
    * @memberof WebHookClient
    */
    clientResource: string;

    /**
    * Represents the element to subscribe
    * @type {string}
    * @memberof SubscriptionType
    */
    subscriptionType: SubscriptionType;

    /**
    * Represents a type of method tha resource accept
    * @type {string}
    * @memberof WebHookClient
    */
    methodType: VerbType;

    /**
    * Represents the time of wait to complete resource operation
    * @type {string}
    * @memberof WebHookClient
    */
    timeout: number;

    /**
    * Represents the type of event to subscribe
    * @type {string}
    * @memberof EventType
    */
    eventType: EventType;
}
