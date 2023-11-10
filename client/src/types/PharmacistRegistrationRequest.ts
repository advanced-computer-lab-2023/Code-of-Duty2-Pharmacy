import { VerificationStatus } from ".";
import { UserBaseInfo } from "./UserBaseInfo";

interface PharmacistRegistrationRequest extends UserBaseInfo {
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
  status: VerificationStatus;
}

export default PharmacistRegistrationRequest;
