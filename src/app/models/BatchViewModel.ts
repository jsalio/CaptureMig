
export type BatchViewModel = {
  id: number;
  name: string;
  creationDate: string;
  workflowId: string;
  username: string;
  batchDocuments: string;
  batchStatus: string;
  pages?: string,
  size: number;
  limitSize: number;
  limitWarningSize: number;
};
