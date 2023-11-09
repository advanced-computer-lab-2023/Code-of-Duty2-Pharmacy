import mongoose, { Document, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { IPharmacist } from "./interfaces/IPharmacist";
import bcrypt from "mongoose-bcrypt";

export interface IPharmacistModel extends IPharmacist, Document {}

export const PharmacistSchema = new Schema<IPharmacistModel>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, bcrypt: true },
    email: { type: String, validate: [isEmail, "invalid email"], unique: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: false, enum: ["male", "female"] }, //TO BE REQUIRED
    mobileNumber: { type: String, required: false }, //TO BE REQUIRED
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true },
    educationalBackground: { type: String, required: true },
    identification: { type: Buffer },
    pharmacyDegree: { type: Buffer },
    workingLicense: { type: Buffer },
  },
  { timestamps: true }
);

PharmacistSchema.plugin(bcrypt);

export default mongoose.model<IPharmacistModel>("Pharmacist", PharmacistSchema);
