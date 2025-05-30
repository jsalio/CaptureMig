/**
 * Represents actions performed by user on different configurations
 *
 * @export
 * @class UserActionLog
 */
export class UserActionLog {
  username: string;
  message: string;
  date: Date;

  constructor(username: string, message: string, date: Date) {
    this.username = username;
    this.message = message;
    this.date = date;
  }
}
