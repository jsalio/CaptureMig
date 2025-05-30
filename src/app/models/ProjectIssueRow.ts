import { IssueType } from "./IssueType";
export type ProjectIssueRow = {
  dateCreate: string;
  issueType: IssueType;
  reportedBy: string;
  conclusionDate: string;
  id: number;
  projectId: number;
};
