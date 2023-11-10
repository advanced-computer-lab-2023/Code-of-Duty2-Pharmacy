import { UserBaseInfo } from "./UserBaseInfo";
import { SubscribedPackage } from "./SubscribedPackage";
import { DependentFamilyMember } from "./DependentFamilyMember";
import { RegisteredFamilyMember } from "./RegisteredFamilyMember";
import { EmergencyContact } from "./EmergencyContact";
import { CartItem } from "./CartItem";

interface Patient extends UserBaseInfo {
  emergencyContact: EmergencyContact;
  deliveryAddresses?: string[];
  healthRecords?: string[];
  cart?: CartItem[];
  subscribedPackage?: SubscribedPackage;
  dependentFamilyMembers?: DependentFamilyMember[];
  registeredFamilyMembers?: RegisteredFamilyMember[];
}

export default Patient;
