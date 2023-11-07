import Pharmacist, { IPharmacistModel } from "../../models/pharmacists/Pharmacist";
import Patient from "../../models/patients/Patient";
import { entityEmailDoesNotExistError, entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import { getRequestedTimePeriod } from "../../utils/getRequestedTimePeriod";


export const findAllPharmacists = async () => await Pharmacist.find();

export const findPharmacistById = async (id: string) =>
  await Pharmacist.findById(id).select({
    _id: 1,
    name: 1,
    email: 1,
    mobileNumber: 1,
    hourlyRate: 1,
    affiliation: 1,
    speciality: 1,
    educationalBackground: 1,
    availableSlots: 1,
  });

export const findPharmacistByUsername = async (username: string) =>
  await Pharmacist.findOne({ username }).select({ _id: 1, password: 1 });

export const findPharmacistByEmail = async (
  email: string,
  elementsToSelect?: any
) => {
  const PromisedPharmacist = Pharmacist.findOne({ email });
  if (!elementsToSelect)
    return await PromisedPharmacist.select({ _id: 1, password: 1 });
  return await PromisedPharmacist.select(elementsToSelect);
};

export const deletePharmacistById = async (id: string) =>
  await Pharmacist.findByIdAndDelete(id);

export const createNewPharmacist = async (username: string, password: string) => {
  const newPharmacist = new Pharmacist({ username, password });
  await newPharmacist.save();
};


export const updatePharmacistPasswordByEmail = async (
  email: string,
  newPassword: string
) => {
  const pharmacist = await findPharmacistByEmail(email);
  if (!pharmacist) {
    throw new Error(entityEmailDoesNotExistError("pharmacist", email));
  }
  await updatePharmacistPassword(pharmacist, newPassword);
};

export const updatePasswordById = async (
  pharmacistId: string,
  newPassword: string
) => {
  const pharmacist = await findPharmacistById(pharmacistId);
  if (!pharmacist) {
    throw new Error(entityEmailDoesNotExistError("pharmacist", pharmacistId));
  }
  await updatePharmacistPassword(pharmacist, newPassword);
};

export const updatePharmacistPassword = async (
  pharmacist: IPharmacistModel,
  newPassword: string
) => {
  pharmacist.password = newPassword;
  await pharmacist.save();
};

type PharmacistInfo = {
  _id: string;
  name: string;
  speciality: string | undefined;
  sessionPrice: number;
};





