import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";

export interface IPharmacist extends IUserBaseInfo {
    hourlyRate: number;
    affiliation: string;
    educationalBackground: string;
    identification?: Buffer;
    pharmacyDegree?: Buffer;
    workingLicense?: Buffer;
}