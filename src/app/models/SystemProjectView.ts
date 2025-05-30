/**
 * Represents row view for project
 */
export type SystemProjectView = {
  /**
   * project id
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
   * project number
   *
   * @type {string}
   */
  projectNumber: string;
  /**
   *Project name
   *
   * @type {string}
   */
  projectName: string;
  /**
   * date started
   *
   * @type {string}
   */
  dateStarted: string;
  /**
   * compromised pages
   *
   * @type {number}
   */
  targetPages: number;
  /**
   * workflows selected
   *
   * @type {number}
   */
  workflowActives: number;
  /**
   * if project is active
   *
   * @type {boolean}
   */
  active: boolean;
};
