import { IAdminModel } from "../models/admins/Admin";
import { IPharmacistModel } from "../models/pharmacists/Pharmacist";
import { IPatientModel } from "../models/patients/Patient";

export type IUserModel = IPatientModel | IPharmacistModel | IAdminModel;
