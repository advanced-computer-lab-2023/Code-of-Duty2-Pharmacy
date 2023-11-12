import { User } from "../../types/User";
import { IUserModel } from "../../types/UserModel";
import UserRole from "../../types/enums/UserRole";
import {
  findAllAdmins,
  deleteAdminById,
  findAdminById,
  findAdminByUsername,
  findAdminByEmail,
} from "../admins";
import {
  findAllPatients,
  deletePatientById,
  findPatientById,
  findPatientByUsername,
  findPatientByEmail,
} from "../patients";
import {
  findAllPharmacists,
  findPharmacistByEmail,
  findPharmacistById,
  findPharmacistByUsername,
} from "../pharmacists";

export const findAllUsersByType = async (Type: string) => {
  switch (Type.toLowerCase()) {
    case "patient":
      return await findAllPatients();
    case "pharmacist":
      return await findAllPharmacists();
    case "admin":
      return await findAllAdmins();
    default:
      throw new Error("Invalid user type");
  }
};

export const findUser = async (user: User, elementsToSelect?: any) => {
  switch (user.role) {
    case UserRole.PATIENT:
      return await findPatientById(user.id, elementsToSelect);
    case UserRole.DOCTOR:
      return await findPharmacistById(user.id);
    case UserRole.ADMIN:
      return await findAdminById(user.id, elementsToSelect);
    default:
      throw new Error("Invalid user type");
  }
};

export const findUserByUsername = async (username: string, Type: string) => {
  switch (Type.toLowerCase()) {
    case "patient":
      return await findPatientByUsername(username);
    case "pharmacist":
      return await findPharmacistByUsername(username);
    case "admin":
      return await findAdminByUsername(username);
    default:
      throw new Error("Invalid user type");
  }
};
export const findUserByEmail = async (
  email: string,
  elementsToSelect?: any
) => {
  const admin = await findAdminByEmail(email, elementsToSelect);
  if (admin) {
    admin.role = UserRole.ADMIN;
    return admin;
  }

  const pharmacist = await findPharmacistByEmail(email, elementsToSelect);
  if (pharmacist) {
    pharmacist.role = UserRole.PHARMACIST;
    return pharmacist;
  }

  const patient = await findPatientByEmail(email, elementsToSelect);
  if (patient) {
    patient.role = UserRole.PATIENT;
    return patient;
  }

  throw new Error("User not found");
};

export const updateUserPassword = async (
  user: IUserModel,
  newPassword: string
) => {
  user.password = newPassword;
  await user.save();
};

export const updatePassword = async (
  userPayload: User,
  newPassword: string
) => {
  const user = await findUser(userPayload);

  if (!user) throw new Error("User not found");

  const isSameOldPassword = await user.verifyPassword?.(newPassword);
  if (isSameOldPassword) throw new Error("New password is the same as old");

  updateUserPassword(user, newPassword);
  return user;
};
