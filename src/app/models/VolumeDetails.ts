/**
 * represents model of volume consumption space in disk
 *
 * @type {VolumeConsumeDetails}
 * @exports VolumeConsumeDetails
 */
export type VolumeConsumeDetails = {

  /**
  * volume id
  *
  * @type {number}
  */
  VolumeId: number;
  /**
    * volume path to disk
    *
    * @type {string}
    */
  volumePath: string;
  /**
  * path to disk
  *
  * @type {string}
  */

  diskPath: string
  /**
    * volume space consume in disk
    *
    * @type {number}
    */
  useSpace: number;
  /**
    * available Disk free size it is available
    *
    * @type {number}
    */
  availableSpace: number;
  /**
   * Validate if path is Local directory or network directory
   ** @type {boolean}
   */
  isUncDirectory: boolean
  /**
   * Disk size it is available
   *
   * @type {number}
   */
  diskSize: number
}
