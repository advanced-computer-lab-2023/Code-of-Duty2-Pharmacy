interface Order {
    patientId: string;
    patientName: string;
    patientAddress: string;
    patientMobileNumber: string;
    medicines: Array<{ medicine_id: string; quantity: number }>;
    paidAmount: number;
    timestamp: Date;
    orderStatus: 'successful' | 'pending' | 'failed';
}

export default Order;