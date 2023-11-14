import { PaymentMethod } from ".";

interface Order {
  _id: string;
  patientId: string;
  patientName: string;
  patientAddress: string;
  patientMobileNumber: string;
  medicines: Array<{ medicineId: string; quantity: number }>;
  paidAmount: number;
  paymentMethod: PaymentMethod;
  timestamp: Date;
  orderStatus: "successful" | "pending" | "failed";
}

export default Order;
