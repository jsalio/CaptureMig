import { DocumentReceiverMode } from "../enum/DocumentReceiverMode";
import { DocumentReceiverStatus } from "../enum/DocumentReceiverStatus";


export type DocumentInputRow = {
    id: number;
    projectId: number;
    receiveBy: string;
    receptionMode: DocumentReceiverMode;
    status: DocumentReceiverStatus;
    numberOfItem: number;
    averagePages: number;
    receptionDate: string;
};
