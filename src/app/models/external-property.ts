import { ExternalPropertyTypes } from '../enums/external-property-type';

export interface ExternalProperty {
    id: number;
    name: string;
    type: ExternalPropertyTypes;
}
