import { UserBaseInfo } from "./UserBaseInfo";

interface Pharmacist extends UserBaseInfo {
    hourlyRate: number;
    affiliation: string;
    educationalBackground: string;
    identification?: Buffer;
    pharmacyDegree?: Buffer;
    workingLicense?: Buffer;
}

export default Pharmacist;