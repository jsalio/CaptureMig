import * as moment from "moment";
import { DateInterval } from './dateFilter';

declare module './dateFilter' {
  interface DateInterval {
    startDateString(format?: string): any;
    endDateString(format?: string): any;
    endDateLabelString(format?: string): any;
  }
}

DateInterval.prototype.startDateString = function (format?: string) {
  // tslint:disable-next-line: curly
  if (!format)
    return moment(this.dateStart)
      .format("MM/DD/YYYY")
      .replace(/[\/]/g, "-");
  return moment(this.dateStart).format(format);
}

DateInterval.prototype.endDateString = function (format?: string) {
  const defaultLastHours = 23;
  // tslint:disable-next-line: curly
  if (!format)
    return moment(this.dateEnd)
      .add(defaultLastHours, "hours")
      .format("MM/DD/YYYY")
      .replace(/[\/]/g, "-");
  return moment(this.dateEnd).format(format);
}

DateInterval.prototype.endDateLabelString = function (format?: string) {
  const defaultLastHours = 23;
  // tslint:disable-next-line: curly
  if (!format)
    return moment(this.dateEnd)
      .add(defaultLastHours, "hours")
      .format("MM/DD/YYYY")
      .replace(/[\/]/g, "-");
  return moment(this.dateEnd).add(-1, 'day').format(format);
}
