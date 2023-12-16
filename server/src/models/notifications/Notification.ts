import { Schema } from "mongoose";
import { INotification } from "./interfaces/INotification";

const NotificationSchema = new Schema<INotification>({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, required: true, default: Date.now() },
  isRead: { type: Boolean, default: false, required: false }
});

export default NotificationSchema;
