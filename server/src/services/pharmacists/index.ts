import Pharmacist, { IPharmacistModel } from "../../models/pharmacists/Pharmacist";
import Patient, { IPatientModel } from "../../models/patients/Patient";
import { entityEmailDoesNotExistError, entityIdDoesNotExistError } from "../../utils/ErrorMessages";
import { getRequestedTimePeriod } from "../../utils/getRequestedTimePeriod";
import Admin, { IAdminModel } from "../../models/admins/Admin";
import { getSocketIdForUserId } from "../../socket-connections";
import SocketType from "../../types/SocketType";
import { newNotification } from "../../models/notifications/Notification";
import { sendEmail } from "../../utils/email";
import { env } from "process";

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
export const sendNotificationsToAllPharmacistsWithoutSocket = async (
  title: string | undefined = undefined,
  notification: string
) => {
  const pharmacists = await findAllPharmacists();
  console.log("pharmacistssssssssssssssssssss");
  pharmacists.forEach((pharmacist) => {
    sendNotificationWithoutSocket(pharmacist._id, "pharmacist", notification, title, true);
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
  user.receivedNotifications.push(newNotification(title ? title : "Medicine Out of Stock", notification));
  await user.save();

  socket.to(getSocketIdForUserId(Id)).emit("notification", {
    notification: user.receivedNotifications[user.receivedNotifications.length - 1]
  });

  // await user.save();
};
export const sendNotificationWithoutSocket = async (
  Id: string,
  usertype: string,
  notification: string,
  title: string | undefined = undefined,
  sendEmail: boolean = false
) => {
  let user = null;

  if (usertype === "pharmacist") {
    user = await Pharmacist.findById(Id).select("+receivedNotifications +email +name +_id");
  } else if (usertype === "patient") {
    user = await Patient.findById(Id).select("+receivedNotifications +email +name +_id");
  }
  // else if (usertype === "admin") {
  //   user = await Admin.findById(Id).select("+receivedNotifications +email +name +_id");
  // }
  else {
    throw new Error("Invalid user type");
  }

  if (!user || user === null) {
    throw new Error(entityIdDoesNotExistError("pharmacist", Id));
  }
  console.log("sending notification");
  if (user.receivedNotifications === undefined) {
    user.receivedNotifications = [];
  }
  user.receivedNotifications.push(newNotification(title ? title : "Medicine Out of Stock", notification));
  await user.save();

  if (sendEmail) sendOutOfStockEmailToPharmacist(user.name, notification.split(" is out of stock,")[0], user.email);
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

export const sendOutOfStockEmailToPharmacist = async (
  pharmacistName: string,
  medicineName: string,
  pharmacistEmail: string
) => {
  const outOfStockMessage = `<html lang="en">
  
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Stock Update - Urgent</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f7f7f7;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #064C5B;
          margin-bottom: 20px;
        }
    
        p {
          color: #555;
          line-height: 1.6;
        }
    
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #064C5B;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
    
        .footer {
          margin-top: 20px;
          text-align: center;
          color: #888;
          font-size: 0.8rem;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>Medicine Out of Stock</h1>
        <h3>Dear ${pharmacistName},</h3>
        <p>We want to inform you that ${medicineName} is out stock now.</p>
       <p>Please consider taking an action, we do not want to risk the health of our patients.</p>
        <a class="cta-button" href="${
          env.FRONT_END_URL || "http://localhost:5173"
        }/pharmacist/view-medicines">Medicines Page</a>
        <p>Thank you for your time.</p>
        <p>Best regards,</p>
        <strong>'El7a2ni Team'</strong>
      </div>
    
      <div class="footer">
        <p>This is an automated email. © 2023-2024 El7a2ni. All rights reserved.</p>
      </div>
    </body>
    </html>`;
  await sendEmail({
    to: pharmacistEmail,
    subject: "Medicine Stock Update - Urgent",
    html: outOfStockMessage,
    text: "Job Acceptance",
    from: "El7a2ni Pharmacy"
  })
    .then(() => {
      console.log("Email sent successfully");
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

type PharmacistInfo = {
  _id: string;
  name: string;
  speciality: string | undefined;
  sessionPrice: number;
};
