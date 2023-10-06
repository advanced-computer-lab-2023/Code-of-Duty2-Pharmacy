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
