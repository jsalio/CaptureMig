import { Batch } from './batch';
/**
 * Represents an assignment of a batch to a user.
 * @export
 * @class Assignment
 */
export class Assignment {
    username: string;
    batch: Batch;

    constructor(username: string, batch: Batch) {
        this.username = username;
        this.batch = batch;
    }
}
