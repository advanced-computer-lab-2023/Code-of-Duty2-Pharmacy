interface Notification {
  _id: string;
  email: string;
  title: string;
  description: string;
  dateTime: Date;
  methods: { method: "SMS" | "email" }[];
}

export default Notification;
