import PaymentMethod from "./PaymentMethod";
import Medicine from "./Medicine"; // import your Medicine interface

interface OrderMedicine {
  medicineId: Medicine;
  quantity: number;
}

interface Order {
  _id: string;
  patientId: string;
  patientName: string;
  patientAddress: string;
  patientMobileNumber: string;
  medicines: OrderMedicine[];
  paidAmount: number;
  paymentMethod: PaymentMethod;
  timestamp: Date;
  orderStatus: "successful" | "pending" | "failed";
}

export default Order;
