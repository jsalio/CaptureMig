import { BatchStatus } from '../enum/batch-status.enum';


export type FilterPanel = {
  dates: {
    isReset: boolean;
    field: string;
    values: {
      dateStart: Date;
      dateEnd: Date;
    };
  };
  batchStatus: Array<BatchStatus>;
  batchState: Array<any>;
  users: Array<string>;
};
