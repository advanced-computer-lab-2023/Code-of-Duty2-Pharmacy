import { IUserBaseInfo } from '../../users/interfaces/IUserBaseInfo';
import { ISubscribedPackage } from './subinterfaces/ISubscribedPackage';
import { IDependentFamilyMember } from './subinterfaces/IDependentFamilyMember';
import { IRegisteredFamilyMember } from './subinterfaces/IRegisteredFamilyMember';
import { IEmergencyContact } from './subinterfaces/IEmergencyContact';

export interface IPatient extends IUserBaseInfo {
  emergencyContact: IEmergencyContact;
  deliveryAddresses?: string[];
  healthRecords?: Buffer[];
  subscribedPackage?: ISubscribedPackage;
  dependentFamilyMembers?: IDependentFamilyMember[];
  registeredFamilyMembers?: IRegisteredFamilyMember[];
}