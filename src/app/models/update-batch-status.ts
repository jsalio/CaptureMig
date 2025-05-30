/**
 * Represent Update batch state model
 * @export
 * @class UpdateBatchStatus
 */
export class UpdateBatchStatus {
    batchId: number;
    newBatchStatus: string;
    /**
     *Create instance with given object
     */
    constructor(batchId: number, batchState: string) {
        this.batchId = batchId;
        this.newBatchStatus = batchState;
    }
}
