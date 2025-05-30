import { BarcodeDistribution } from '../enum/generation-type';

export interface BarcodeSeparatorRequest {
    value: string;
    distribution: BarcodeDistribution;
}
