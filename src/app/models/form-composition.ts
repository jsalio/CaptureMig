/**
 * Represents a form composition model
 *
 * @export
 * @interface FormComposition
 */
export interface FormComposition {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
  isSystem: boolean;
  isArchived: boolean;
  dateCreated: Date;
  dateModified: Date;
  createdBy: string;
  modifiedBy: string;
  formFields: any[];
  formFieldsCount: number;
  formFieldsActiveCount: number;
  formFieldsInactiveCount: number;
  formFieldsRequiredCount: number;
  formFieldsOptionalCount: number;
  formFieldsSystemCount: number;
  formFieldsCustomCount: number;
  formFieldsArchivedCount: number;
  formFieldsNotArchivedCount: number;
}
  