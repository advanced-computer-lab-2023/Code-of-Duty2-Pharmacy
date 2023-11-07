import mongoose, { Document, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { IPharmacistRegistrationRequest } from "./interfaces/IPharmacistRegistrationRequest";

export interface IPharmacistRegistrationRequestModel
  extends IPharmacistRegistrationRequest,
    Document {}

export const PharmacistRegistrationRequestSchema =
  new Schema<IPharmacistRegistrationRequestModel>(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      email: {
        type: String,
        validate: [isEmail, "invalid email"],
        unique: true,
      },
      name: { type: String, required: true },
      dateOfBirth: { type: Date, required: true },
      hourlyRate: { type: Number, required: true },
      affiliation: { type: String, required: true },
      educationalBackground: { type: String, required: true },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    },
    { timestamps: true }
  );

export default mongoose.model<IPharmacistRegistrationRequestModel>(
  "PharmacistRegistrationRequest",
  PharmacistRegistrationRequestSchema
);
