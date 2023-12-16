interface Notification {
  _id?: string;
  subject: string;
  description: string;
  time?: Date;
  isRead?: boolean;
}

export default Notification;
