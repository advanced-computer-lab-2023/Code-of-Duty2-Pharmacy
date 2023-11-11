import UserRole from "../../../types/enums/UserRole";
import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";

export interface IPharmacist extends IUserBaseInfo {
  role?: UserRole.PHARMACIST;
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
  identification?: Buffer;
  pharmacyDegree?: Buffer;
  workingLicense?: Buffer;
  passwordReset?: {
    otp: string;
    expiryDate: Date;
  };
  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
}
