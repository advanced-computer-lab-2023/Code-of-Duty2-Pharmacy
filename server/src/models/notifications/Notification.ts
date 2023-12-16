import { INotification } from "./interfaces/INotification";
import { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface INotificationModel extends INotification {}

const NotificationSchema = new Schema<INotificationModel>({
  _id: { type: String, default: uuidv4, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, required: true, default: new Date() },
  isRead: { type: Boolean, default: false, required: true }
});

export default NotificationSchema;

export const newNotification = (subject: string, description: string) => {
  return {
    _id: uuidv4().toString(),
    subject: subject,
    description: description,
    time: new Date(),
    isRead: false
  };
};
