interface Prescription {
  _id: string;
  date: Date;
  doctorId: string;
  patientId: string;
  status: "filled" | "unfilled";
  isSubmitted: boolean;
  medicines: {
    medicineId: string;
    name: string;
    dosage: string;
    quantity: number;
  }[];
}

export default Prescription;
