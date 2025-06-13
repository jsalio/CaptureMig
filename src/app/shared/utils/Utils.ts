import { WorkflowSpecialPermissions } from '../../interface/workflow-special-permissions';
import { CustomErrorHandler } from '../../models/CustomErrorHandler';

/**
 * Utility class
 * @export
 * @class Utils
 */
export class Utils {

  /**
   * Validate that a value is empty
   * @static
   * @param {string} value
   * @returns {boolean}
   * @memberof Utils
   */
  public static isEmpty(value: string): boolean {
    return value === '' || value === null;
  }

  /**
   *  Cast string value on Permission object
   * @static
   * @param {string} stringPermissions
   * @returns {WorkflowSpecialPermissions}
   * @memberof Utils
   */
  public static castToPermissions(stringPermissions: string): WorkflowSpecialPermissions {
    return JSON.parse(stringPermissions);
  }

  /**
   * Cast error provide to Api for get string message that contains the error
   * @static
   * @param {*} error
   * @returns {string}
   * @memberof Utils
   */
  public static getErrorMessage(error: any): string {
    const errorhandler = new CustomErrorHandler();

    return errorhandler.getMessage(error);
  }

  public static search = (dataSet: Array<any>, searchText: string, cols: Array<any>) => {
    if (searchText === '') {
      return dataSet;
    }
    const searchTextLower = searchText.toLowerCase();
    return dataSet.filter((row) => {
      let isFound = false;
      cols.forEach((col) => {
        if (row[col.field].toString().toLowerCase().indexOf(searchTextLower) !== -1) {
          isFound = true;
        }
      });
      return isFound;
    });
  }

  public static getStorageValue = <T extends {}>(key: string, defaultValue: T): T => {
    const value = localStorage.getItem(key);
    const initial = JSON.parse(value as any) as T;
    return initial || defaultValue;
  }

  public static destroyStorageValue = (key: string): void => {
    localStorage.removeItem(key);
  }

  public static setStorageValue = <T extends {}>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
