interface Prescription {
    date: Date;
    doctorId: string;
    patientId: string;
    status: 'filled' | 'unfilled';
    medicines: { medicineName: string; dosage: string; }[];
}

export default Prescription;