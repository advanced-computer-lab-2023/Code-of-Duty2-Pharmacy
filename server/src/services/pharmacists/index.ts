import Pharmacist, { IPharmacistModel } from "../../models/pharmacists/Pharmacist";
import Patient, { IPatientModel } from "../../models/patients/Patient";
import { entityEmailDoesNotExistError, entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import { getRequestedTimePeriod } from "../../utils/getRequestedTimePeriod";
import Admin, { IAdminModel } from "../../models/admins/Admin";
import { getSocketIdForUserId } from "../../socket-connections";
import SocketType from "../../types/SocketType";

export const findAllPharmacists = async () => await Pharmacist.find();

export const findPharmacistById = async (id: string) => await Pharmacist.findById(id);
// .select({
//   _id: 1,
//   name: 1,
//   email: 1,
//   password: 1,
//   username: 1,
//   mobileNumber: 1,
//   hourlyRate: 1,
//   affiliation: 1,
//   educationalBackground: 1,
//   identification: 1,
//   pharmacyDegree: 1,

// });

export const findPharmacistByIdAndSelect = async (id: string, elementsToSelect: any) =>
  await Pharmacist.findById(id).select(elementsToSelect);

export const findPharmacistByUsername = async (username: string) =>
  await Pharmacist.findOne({ username }).select({ _id: 1, password: 1 });

export const findPharmacistByEmail = async (email: string, elementsToSelect?: any) => {
  const PromisedPharmacist = Pharmacist.findOne({ email });
  if (!elementsToSelect) return await PromisedPharmacist.select({ _id: 1, password: 1 });
  return await PromisedPharmacist.select(elementsToSelect);
};

export const deletePharmacistById = async (id: string) => await Pharmacist.findByIdAndDelete(id);

export const createNewPharmacist = async (username: string, password: string) => {
  const newPharmacist = new Pharmacist({ username, password });
  await newPharmacist.save();
};

export const updatePharmacistPasswordByEmail = async (email: string, newPassword: string) => {
  const pharmacist = await findPharmacistByEmail(email);
  if (!pharmacist) {
    throw new Error(entityEmailDoesNotExistError("pharmacist", email));
  }
  await updatePharmacistPassword(pharmacist, newPassword);
};

export const updatePharmacistPasswordById = async (pharmacistId: string, newPassword: string) => {
  const pharmacist = await findPharmacistById(pharmacistId);
  if (!pharmacist) {
    throw new Error(entityEmailDoesNotExistError("pharmacist", pharmacistId));
  }
  await updatePharmacistPassword(pharmacist, newPassword);
};

export const updatePharmacistPassword = async (pharmacist: IPharmacistModel, newPassword: string) => {
  pharmacist.password = newPassword;
  await pharmacist.save();
};

export const sendNotificationsToAllPharmacists = async (
  title: string | undefined = undefined,
  notification: string,
  socket: SocketType
) => {
  const pharmacists = await findAllPharmacists();
  pharmacists.forEach((pharmacist) => {
    sendNotification(pharmacist._id, "pharmacist", notification, title, socket);
  });
};

export const sendNotification = async (
  Id: string,
  usertype: string,
  notification: string,
  title: string | undefined = undefined,
  socket: SocketType
) => {
  let user: IPharmacistModel | IAdminModel | IPatientModel | null = null;

  if (usertype === "pharmacist") {
    user = await Pharmacist.findOne({ _id: Id });
  } else if (usertype === "patient") {
    user = await Patient.findOne({ _id: Id });
  } else if (usertype === "admin") {
    user = await Admin.findOne({ _id: Id });
  } else {
    throw new Error("Invalid user type");
  }

  if (!user) {
    throw new Error(entityIdDoesNotExistError("pharmacist", Id));
  }

  if (!user.receivedNotifications) {
    user.receivedNotifications = [];
  }
  user.receivedNotifications.push({
    subject: title ? title : "Medicine Out of Stock",
    description: notification
  });

  socket.to(getSocketIdForUserId(Id)).emit(`outOfStock`, {
    notification: user.receivedNotifications[user.receivedNotifications.length - 1]
  });

  await user.save();
};

export const markNotificationAsRead = async (
  user: IAdminModel | IPatientModel | IPharmacistModel,
  notificationId: string
) => {
  const notification = user.receivedNotifications?.find(
    (notification) => notification._id?.toString() === notificationId
  );
  if (!notification) {
    throw new Error(entityIdDoesNotExistError("Notification", notificationId));
  }
  notification.isRead = true;
  await user.save();
};

type PharmacistInfo = {
  _id: string;
  name: string;
  speciality: string | undefined;
  sessionPrice: number;
};
