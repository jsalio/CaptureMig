/**
 * Represents the model for add/ edit /retrieve represent
 */
export type Represent = {
  /**
  * represent Id
  *
  * @type {number}
  */
  id: number;
  /**
  * Represent full name
  *
  * @type {string}
  */
  fullName: string;
  /**
  * Represent position
  *
  * @type {string}
  */
  position: string;
  /**
  * Represent e-mail
  *
  * @type {string}
  */
  email: string;
  /**
  * Represent phone number
  *
  * @type {string}
  */
  phone: string;
  /**
  * Represents location
  *
  * @type {number}
  */
  locationId: number;

  projectId: number;
};
