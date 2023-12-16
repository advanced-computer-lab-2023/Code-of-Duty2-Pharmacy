import { Schema } from "mongoose";

export interface INotification {
  _id: string | Schema.Types.ObjectId;
  subject: string;
  description: string;
  time: Date;
  isRead: boolean;
}
