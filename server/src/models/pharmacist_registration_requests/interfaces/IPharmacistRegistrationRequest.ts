import { IUserBaseInfo } from "../../IUserBaseInfo";

export interface IPharmacistRegistrationRequest extends IUserBaseInfo {
    hourlyRate: number;
    affiliation: string;
    educationalBackground: string;
    status: 'pending' | 'accepted' | 'rejected';
}
