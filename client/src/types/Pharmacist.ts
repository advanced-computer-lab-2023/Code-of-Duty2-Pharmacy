import { UserBaseInfo } from "./UserBaseInfo";

interface Pharmacist extends UserBaseInfo {
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
  identification?: string;
  pharmacyDegree?: string;
  workingLicense?: string;
}

export default Pharmacist;
