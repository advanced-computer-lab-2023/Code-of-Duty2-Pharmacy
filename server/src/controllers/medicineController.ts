import { Request, Response } from 'express';
import Medicine, { IMedicineModel } from '../models/Medicine';

export const getAllMedicines = async (req: Request, res: Response) => {
    try {
        const allMedicines: IMedicineModel[] = await Medicine.find();
        res.json(allMedicines);
    } catch (err) {
        res.status(500).json();
    } ;
}

export const addMedicine = async (req: Request, res: Response) => {
    try {
        const newMedicineData: IMedicineModel = req.body;
        const newMedicine = new Medicine(newMedicineData);
        const savedMedicine = await newMedicine.save();
        res.status(201).json(savedMedicine);
    } catch (err) {
        res.status(500).json();
    }
}

export const updateMedicine = async (req: Request, res: Response) => {
    try {
        const updatedMedicineData: IMedicineModel = req.body;
        const medicineId = req.params.id;
        const updatedMedicine = await Medicine.findByIdAndUpdate(medicineId, updatedMedicineData, { new: true });
        res.status(200).json(updatedMedicine);
    } catch (err) {
        res.status(500).json();
    }
}

