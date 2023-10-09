import { UserBaseInfo } from "./UserBaseInfo";

interface PharmacistRegistrationRequest extends UserBaseInfo {
    hourlyRate: number;
    affiliation: string;
    educationalBackground: string;
    status: 'pending' | 'accepted' | 'rejected';
}

export default PharmacistRegistrationRequest;