import { DocumentReceiverMode } from "../enum/DocumentReceiverMode";
import { DocumentReceiverStatus } from "../enum/DocumentReceiverStatus";

export type DocumentInput = {
  id: number;
  projectId: number;
  receptionMode: DocumentReceiverMode;
  status: DocumentReceiverStatus;
  numberOfItem: number;
  averagePages: number;
  receptionDate: string;
  receptionTime: string;
  preparationDate: string;
  comment: string;
  totalReceivePage: number;
  receiveBy: string;
  locationId: number;
};


