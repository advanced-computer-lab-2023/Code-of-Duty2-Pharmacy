import mongoose, { Document, Schema } from 'mongoose';
import { IOrder } from './interfaces/IOrder';

export interface IOrderModel extends IOrder, Document {}

export const OrderSchema = new Schema<IOrderModel>({
    patientId: { type: Schema.Types.ObjectId, required: true },
    patientName: { type: String, required: true },
    patientAddress: { type: String, required: true },
    patientMobileNumber: { type: String, required: true },
    medicines: [
        {
            medicine_id: { type: Schema.Types.ObjectId, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    paidAmount: { type: Number, required: true },
    timestamp: { type : Date, default : Date.now },
    orderStatus : { type : String, enum : ['successful', 'pending', 'failed'], default : 'pending' }
}, 
    {timestamps: true}
);

export default mongoose.model<IOrderModel>('Order', OrderSchema);
