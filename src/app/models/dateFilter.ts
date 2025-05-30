import * as moment from 'moment';
/**
 * Represents the date interval for filter report
 *
 * @export
 * @class DateInterval
 */
export class DateInterval {
  // tslint:disable-next-line: variable-name
  private _dateStart: string;
  // tslint:disable-next-line: variable-name
  private _dateEnd: string;

  /**
   * Date start value
   *
   * @readonly
   * @type {string}
   * @memberof DateInterval
   */
  public get dateStart(): string {
    return this._dateStart;
  }

  /**
   * Date end value
   *
   * @readonly
   * @type {string}
   * @memberof DateInterval
   */
  public get dateEnd(): string {
    return this._dateEnd;
  }

  /**
   * Creates a new instance of @class DateInterval
   */
  constructor(dateStart: string, dateEnd: string) {
    this._dateStart = dateStart;
    this._dateEnd = dateEnd;
  }

  /**
   * Retrieve interval as Date Values
   *
   * @returns {{ dateStart: Moment, dateEnd: Moment }}
   * @memberof DateInterval
   */
  public castInterval(): { dateStart: moment.Moment, dateEnd: moment.Moment } {
    return {
      dateStart: moment(this._dateStart),
      dateEnd: moment(this._dateEnd)
    }
  }

  /**
   * Compare if date end is equal or after to start date
   *
   * @returns {boolean}
   * @memberof DateInterval
   */
  public isSameDate(): boolean {
    const intervals = this.castInterval();
    const daysDiff = intervals.dateEnd.diff(intervals.dateStart, 'day');
    return daysDiff === 1;
  }

  /**
   * Compare start date with current date
   *
   * @returns
   * @memberof DateInterval
   */
  public isStartDateIsToday() {
    const intervals = this.castInterval();
    let today = moment()
    return intervals.dateStart.diff(today, 'day') === 0
  }

  public toFormat(value: string, format?: string): string {
    const current = moment(value).format(format);
    return current;
  }
}
