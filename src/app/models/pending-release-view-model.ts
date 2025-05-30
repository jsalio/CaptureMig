import { BatchStatus } from "../enum/batch-status.enum";

export type PendingReleaseViewModel = {
  id: number;
  name: string;
  creationDate: string;
  workflow: string;
  username: string;
  documents: string;
  pages: string;
  batchStatus: BatchStatus;
}

// { field: 'id', header: 'BatchId' },
// { field: 'name', header: 'BatchName' },
// { field: 'creationDate', header: 'CreationDate', isDate: true },
// { field: 'workflow', header: 'WorkFlow' },
// { field: 'username', header: 'CreatorUser' },
// { field: 'documents', header: 'TotalDocument' },
// { field: 'pages', header: 'TotalDocumentsSynchronized' },
// { field: 'batchStatus', header: 'BatchStatus', translate: true }
