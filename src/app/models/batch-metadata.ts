/**
 * Represents a batch metadata
 *
 * @export
 * @class BatchMetadata
 */
export class BatchMetadata {
    id: number;
    name: string;
    pages: number;
    documents: number;

    constructor(id: number, name: string, pages: number, documents: number) {
        this.id = id;
        this.name = name;
        this.pages = pages;
        this.documents = documents;
    }
}
