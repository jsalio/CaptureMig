/**
 * DEfine all function of String interval
 *
 * @interface IInterval
 */
export interface IInterval {
  /**
  * Validate if the string is a valid interval expression
  *
  * @memberof StringInterval
  */
  isValidExpression: () => boolean;
  /**
   *Get all values of the interval with repetition
   *
   * @memberof StringInterval
   */
  getIntervalValues: () => Array<Number>;
  /**
  *Get all values of the interval without repetition
  *
  * @memberof StringInterval
  */
  getUniqueValues: () => Array<number>;
}

/**
 * Class for decode a string interval
 *
 * @export
 * @class StringInterval
 * @implements {IInterval}
 */
export default class StringInterval implements IInterval {

  // tslint:disable-next-line: variable-name
  _value: string;
  // tslint:disable-next-line: variable-name
  _expression: RegExp;
  // tslint:disable-next-line: variable-name
  _interval = new Array<number>();

  singleSplitCharacter = ',';
  groupSplitCharacter = '-';
  nanValue = NaN;
  firstNumber = 1;

  /**
   *Creates an instance of StringInterval.
   * @param {string} value
   * @param {RegExp} [expression=new RegExp(/^(\d+(-\d+)?(,|$))+$/)]
   * @memberof StringInterval
   */
  constructor(
    value: string,
    expression: RegExp = new RegExp(/^(\d+(-\d+)?(,|$))+$/)
  ) {
    this._interval = [];
    this._value = value;
    this._expression = expression;
  }

  isValidExpression = (): boolean => {
    if (
      this._value[this._value.length - this.firstNumber] ===
      this.singleSplitCharacter ||
      this._value[this._value.length - this.firstNumber] ===
      this.groupSplitCharacter
    ) {
      return false;
    }
    return this._expression.test(this._value);
  }


  getIntervalValues = (): Number[] => {
    const firstGroupIndex = 0;
    const lastGroupIndex = this.firstNumber;
    const selectedRange = [];

    const addSingleValue = (interval: string) => {
      if (selectedRange.includes(Number.parseInt(interval))) {
        selectedRange.push(this.nanValue);
      } else {
        selectedRange.push(Number.parseInt(interval));
      }
    };

    const addGroupValue = (interval: string) => {
      const splitRange = interval.split(this.groupSplitCharacter);
      if (
        Number.parseInt(splitRange[firstGroupIndex]) <
        Number.parseInt(splitRange[lastGroupIndex])
      ) {
        for (
          let groupInterval = Number.parseInt(splitRange[firstGroupIndex]);
          groupInterval <= Number.parseInt(splitRange[lastGroupIndex]);
          groupInterval++
        ) {
          if (selectedRange.includes(groupInterval)) {
            selectedRange.push(this.nanValue);
          } else {
            selectedRange.push(groupInterval);
          }
        }
      } else {
        selectedRange.push(this.nanValue);
      }
    };

    this._value.split(this.singleSplitCharacter).forEach(interval => {
      if (!interval.includes(this.groupSplitCharacter)) {
        addSingleValue(interval);
      } else {
        addGroupValue(interval);
      }
    });
    this._interval = selectedRange;
    return selectedRange;
  }


  getUniqueValues = (): number[] => {
    const self = this;
    return this._interval.sort().filter(function (item, pos, ary) {
      return !pos || item !== ary[pos - self.firstNumber];
    });
  }
}

/**
 * Global module for aggregate extensions methods on Array
 * @memberof StringInterval
 *
*/
declare global {
  /**
   *Imitation of Array.prototype
   *
   * @interface Array
   * @template T
   */
  interface Array<T> {
    /**
     * Get length of the array
     *
     * @memberof Array
     */
    count: (this: T) => number;
    /**
    * Get the minimum value of the array
    *
    * @memberof Array
    */
    min: (this: T) => number;
    /**
    * Get the maximum value of the array
    *
    * @memberof Array
    */
    max: (this: T) => number;
  }
}

Array.prototype.min = function () {
  return Math.min(...this);
};

Array.prototype.max = function () {
  return Math.max(...this);
};

Array.prototype.count = function () {
  return this.length;
};
