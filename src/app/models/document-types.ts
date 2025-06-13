import { DocumentTypesStatus } from "../enums/document-type.enum";


/**
 * Represents a document type.
 * @export
 * @class DocumentType
 */
export class DocumentType {
  id: number;
  name: string;
  status: DocumentTypesStatus;
}
