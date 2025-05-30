/**
 * Represents the data handle by the login
 *
 * @export
 * @class LoginModel
 */
export class LoginModel {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
