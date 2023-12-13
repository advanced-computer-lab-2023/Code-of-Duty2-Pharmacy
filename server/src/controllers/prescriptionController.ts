import { Request, Response } from "express";

import Prescription from "../models/prescriptions/Prescription";

export const addMedicine = async (req: Request, res: Response) => {
  try {
    const { medicine } = req.body;
    const { prescriptionId } = req.params;

    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    prescription.medicines.push(medicine);
    await prescription.save();

    res.status(200).json({ message: "Medicine added successfully", prescription });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const { prescriptionId, medicineId } = req.params;

    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    prescription.medicines = prescription.medicines.filter((med) => med.medicineId.toString() !== medicineId);
    await prescription.save();

    res.status(200).json({ message: "Medicine deleted successfully", prescription });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
