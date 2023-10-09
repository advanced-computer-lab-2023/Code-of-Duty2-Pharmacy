import mongoose, { Document, Schema } from 'mongoose';
import { IAdmin } from './interfaces/IAdmin';

export interface IAdminModel extends IAdmin, Document {}

const AdminSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, 
    {timestamps: true}
);

export default mongoose.model<IAdminModel>('Admin', AdminSchema);
