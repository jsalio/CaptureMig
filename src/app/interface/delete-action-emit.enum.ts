import { DeleteMode } from '../enum/delete-mode.enum';

/**
 * Represents work object for delete item since document viewer
 * @export
 * @interface ActionEventEmmit
 */
export interface DeleteActionEmit {
    action: DeleteMode;
    pageId: number;
    pageExists: boolean;
    comment:string;
  }
