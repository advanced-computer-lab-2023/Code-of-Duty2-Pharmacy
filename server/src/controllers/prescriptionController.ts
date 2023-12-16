import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Prescription from "../models/prescriptions/Prescription";
import DependentPrescription from "../models/prescriptions/DependentPrescription";
import Medicine from "../models/medicines/Medicine";
import mongoose from "mongoose";

export const getPrescription = async (req: Request, res: Response) => {
  try {
    const { prescriptionId } = req.params;
    const isDependent = req.query.isDependent === "true";

    const Model = mongoose.model(isDependent ? "DependentPrescription" : "Prescription");

    const prescription = await Model.findById(prescriptionId)
      .populate("doctorId", "name")
      .populate("patientId", "name")
      .populate("medicines.medicineId", "name description pictureUrl");

    if (!prescription) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Prescription not found" });
    }

    res.status(StatusCodes.OK).json({ message: "Prescription found", prescription });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
  }
};

export const addMedicineToPrescription = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.body;
    const { prescriptionId } = req.params;
    const isDependent = req.query.isDependent === "true";

    const Model = mongoose.model(isDependent ? "DependentPrescription" : "Prescription");

    const prescription = await Model.findById(prescriptionId);

    if (!prescription) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Prescription not found" });
    }

    // Double check that the received medicineId is valid & exists for an actual medicine
    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Medicine not found" });
    }

    const newMedicine = {
      medicineId: medicine._id,
      name: medicine.name,
      dosage: "N/A", // Can't be empty as 'required: true' in the mongoose schema definition doesn't allow empty strings
      quantity: 0
    };

    prescription.medicines.push(newMedicine);
    await prescription.save();

    res.status(StatusCodes.OK).json({ message: "Medicine added successfully", prescription });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
  }
};

export const deleteMedicineFromPrescription = async (req: Request, res: Response) => {
  try {
    const { prescriptionId, medicineId } = req.params;
    const isDependent = req.query.isDependent === "true";

    const Model = mongoose.model(isDependent ? "DependentPrescription" : "Prescription");

    const prescription = await Model.findById(prescriptionId);

    if (!prescription) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Prescription not found" });
    }

    const originalMedicineCount = prescription.medicines.length;

    // TODO: Change this 'any' type to a proper type
    prescription.medicines = prescription.medicines.filter((med: any) => med.medicineId.toString() !== medicineId);

    if (prescription.medicines.length === originalMedicineCount) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Medicine not found in the prescription" });
    }

    await prescription.save();

    res.status(StatusCodes.OK).json({ message: "Medicine deleted successfully", prescription });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
  }
};
