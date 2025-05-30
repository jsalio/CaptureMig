/**
 * Represents the data handle by the login
 *
 * @export
 * @class Keyword
 */
export class Keyword {
    name: string;
    dataType: string;
    required: boolean;

    constructor(name: string, dataType: string, required: boolean) {
        this.name = name;
        this.dataType = dataType;
        this.required = required;
    }
}
