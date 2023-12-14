import UserRole from "../../../types/enums/UserRole";
import { INotification } from "../../notifications/interfaces/INotification";
import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";

export interface IPharmacist extends IUserBaseInfo {
  role?: UserRole.PHARMACIST;
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
  identification?: string;
  pharmacyDegree?: string;
  workingLicense?: string;
  passwordReset?: {
    otp: string;
    expiryDate: Date;
  };
  receivedNotifications?: INotification[];

  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
}
