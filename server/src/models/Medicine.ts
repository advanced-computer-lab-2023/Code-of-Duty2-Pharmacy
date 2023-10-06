import mongoose, { Document, Schema } from 'mongoose';

export interface IMedicine {
    name: string;
    activeIngredients: string[];
    price: number;
    availableQuantity: number;
    pictureUrl?: string;
    description?: string;
    usages?: string[];
    isOverTheCounter?: boolean;
    isArchived?: boolean;
}

export interface IMedicineModel extends IMedicine, Document {}

const MedicineSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true  },
    activeIngredients: { type: [String], required: true },
    price: { type: Number, required: true, min: 0 },
    availableQuantity: { type: Number, required: true },
    pictureUrl: { type: String },
    description: { type: String },
    usages: { type: [String] },
    isOverTheCounter: { type: Boolean },
    isArchived: { type: Boolean }
}, 
    { timestamps: true }
);

export default mongoose.model<IMedicineModel>('Medicine', MedicineSchema);
