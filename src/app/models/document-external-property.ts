/**
 * Represents a document external property.
 * @export
 * @class DocumentExternalProperty
 */
export class DocumentExternalProperty {
  id: number;
  documentId: number;
  externalPropertyKey: string;
  externalPropertyValue: string;

  constructor(id: number, documentId: number, externalPropertyKey: string, externalPropertyValue: string) {
    this.id = id;
    this.documentId = documentId;
    this.externalPropertyKey = externalPropertyKey;
    this.externalPropertyValue = externalPropertyValue;
  }
}
