import { AssignedProjectWorkflow } from './AssignedProjectWorkflow';

/**
 * Represents project object
 */
export type SystemProject = {
  /**
   * The project Id
   *
   * @type {number}
   */
  id: number;
  /**
   * organization name
   *
   * @type {string}
   */
  organization: string;
  /**
   * the project name
   *
   * @type {string}
   */
  projectName: string;
  /**
   * project name id
   *
   * @type {string}
   */
  projectNumber: string;
  /**
   * project target on pages
   *
   * @type {number}
   */
  targetPages: number;
  /**
   * if project is active
   *
   * @type {boolean}
   */
  active: boolean;
  /**
   * if project is complete
   *
   * @type {boolean}
   */
  complete: boolean;
  /**
   * project start date
   *
   * @type {string}
   */
  dateStart: string;
  /**
   * the approximated end date for project
   *
   * @type {string}
   */
  dateEnd: string;
  /**
   * Date when project really started
   *
   * @type {string}
   */
  effectiveDateStart: string;
  /**
   * Date when project probably end
   *
   * @type {string}
   */
  effectiveDateEnd: string;
  /**
   * Collection of workflows assigned to project
   *
   * @type {Array<AssignedProjectWorkflow>}
   */
  workflows: Array<AssignedProjectWorkflow>;

  usersAssigned: number;
  scheduleAssigned: number;
  locationAssigned: number;
  electronicResourceAssigned: number,
  representsAssigned: number;
};
