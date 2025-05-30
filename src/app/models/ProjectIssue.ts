import { IssueType } from "./IssueType";

export type ProjectIssue = {
  id: number;
  projectId: number;
  dateCreate: string;
  issueType: IssueType;
  reportedBy: string;
  conclusionDate: string;
  message: string;
  timeEnd: string;
  timeInit: string;
  userId: number;
  resourceId: number;
  status: IssueStatus;
  locationId: number;
  issueReason: IssueReason;
};

export enum IssueStatus {
  Resolved = 'Resolved',
  Unresolved = 'Unresolved'
}

export enum IssueReason {
  Other = 'Other',

  Energy = 'Energy',
  Internet = 'Internet',
  AirConditioning = 'AirConditioning',
  PhysicalAccess = 'PhysicalAccess',
  Supplies = 'Supplies',

  MaintenanceMissing = 'MaintenanceMissing',
  EquipmentSlowness = 'EquipmentSlowness',
  DamagedEquipment = 'DamagedEquipment',

  SickLeave = 'SickLeave',
  ExcusedAbsence = 'ExcusedAbsence',
  UnexcusedAbsence = 'UnexcusedAbsence',

  ReprimandableConduct = 'ReprimandableConduct',
  SeriousConduct = 'SeriousConduct'
}
