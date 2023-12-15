import UserRole from "../../../types/enums/UserRole";
import { INotification } from "../../notifications/interfaces/INotification";
import { IUserBaseInfo } from "../../users/interfaces/IUserBaseInfo";
import { ICartItem } from "./subinterfaces/ICartItem";
import { IDependentFamilyMember } from "./subinterfaces/IDependentFamilyMember";
import { IEmergencyContact } from "./subinterfaces/IEmergencyContact";
import { IRegisteredFamilyMember } from "./subinterfaces/IRegisteredFamilyMember";
import { ISubscribedPackage } from "./subinterfaces/ISubscribedPackage";

export interface IPatient extends IUserBaseInfo {
  role?: UserRole.PATIENT;
  emergencyContact: IEmergencyContact;
  deliveryAddresses?: string[];
  healthRecords?: string[];
  cart?: ICartItem[];
  subscribedPackage?: ISubscribedPackage;
  dependentFamilyMembers?: IDependentFamilyMember[];
  registeredFamilyMembers?: IRegisteredFamilyMember[];
  wallet?: {
    amount: number;
    currency: string;
    pinCode: string;
  };
  passwordReset?: {
    otp: string;
    expiryDate: Date;
  };
  receivedNotifications?: INotification[];

  verifyPasswordResetOtp?: (otp: string) => Promise<boolean>;
  verifyWalletPinCode?: (pinCode: string) => Promise<boolean>;
  verifyPassword?: (password: string) => Promise<boolean>;
}
