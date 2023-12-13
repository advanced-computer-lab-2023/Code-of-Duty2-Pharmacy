import { usernameOrPasswordIncorrectErrorMessage } from "../../utils/ErrorMessages";
import { signAndGetAccessToken, signAndGetRefreshToken } from "../../utils/jwt";
import UserRole from "../../types/enums/UserRole";
import { User } from "../../types/User";
import Pharmacist from "../../models/pharmacists/Pharmacist";
import Admin from "../../models/admins/Admin";
import Patient from "../../models/patients/Patient";
import Doctor from "../../models/doctors/Doctor";

export const authenticatePatientOrAdmin = async (username: string, password: string) => {
  const adminAuthenticationTokensAndRole = await authenticateUserIfAdmin(username, password);

  if (adminAuthenticationTokensAndRole) {
    return adminAuthenticationTokensAndRole;
  }

  const patientAuthenticationTokensAndRole = await authenticateUserIfPatient(username, password);

  if (patientAuthenticationTokensAndRole) {
    return patientAuthenticationTokensAndRole;
  }

  throw new Error(usernameOrPasswordIncorrectErrorMessage);
};

const authenticateUserIfAdmin = async (username: string, password: string) => {
  const admin = await Admin.findOne({ username }).select("+password");

  if (!admin) {
    return null;
  }

  await validateUserPassword(admin, password);
  const user: User = { id: admin._id, role: UserRole.ADMIN };
  const accessToken = signAndGetAccessToken(user);
  const refreshToken = signAndGetRefreshToken(user);
  return { accessToken, refreshToken, role: UserRole.ADMIN };
};

const authenticateUserIfPatient = async (username: string, password: string) => {
  const patient: any = await Patient.findOne({ username }).select("+password");

  if (!patient) {
    return null;
  }

  await validateUserPassword(patient, password);
  const user = { id: patient._id, role: UserRole.PATIENT };
  const accessToken = signAndGetAccessToken(user);
  const refreshToken = signAndGetRefreshToken(user);
  return { accessToken, refreshToken, role: UserRole.PATIENT };
};

export const authenticatePharmacist = async (username: string, password: string) => {
  const pharmacist = await Pharmacist.findOne({ username }).select("+password");

  if (!pharmacist) {
    throw new Error(usernameOrPasswordIncorrectErrorMessage);
  }

  await validateUserPassword(pharmacist, password);
  const user = { id: pharmacist._id, role: UserRole.PHARMACIST };
  const accessToken = signAndGetAccessToken(user);
  const refreshToken = signAndGetRefreshToken(user);
  return { accessToken, refreshToken, role: UserRole.PHARMACIST };
};

export const authenticateDoctor = async (username: string, password: string) => {
  const doctor = await Doctor.findOne({ username }).select("+password");

  if (!doctor) {
    throw new Error(usernameOrPasswordIncorrectErrorMessage);
  }

  await validateUserPassword(doctor, password);
  const user = { id: doctor._id, role: UserRole.DOCTOR };
  const accessToken = signAndGetAccessToken(user);
  const refreshToken = signAndGetRefreshToken(user);
  return { accessToken, refreshToken, role: UserRole.DOCTOR };
};

const validateUserPassword = async (user: any, password: string) => {
  const isPasswordCorrect = await user.verifyPassword(password);
  if (!isPasswordCorrect) {
    throw new Error(usernameOrPasswordIncorrectErrorMessage);
  }
};
