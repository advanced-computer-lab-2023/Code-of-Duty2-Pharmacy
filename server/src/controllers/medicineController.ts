import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Medicine, { IMedicineModel } from '../models/Medicine';

export const getAllMedicines = async (req: Request, res: Response) => {
    try {
        const allMedicines: IMedicineModel[] = await Medicine.find();
        if (allMedicines.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No medicines found' });
        }
        res.status(StatusCodes.OK).json(allMedicines);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
    } ;
}

export const addMedicine = async (req: Request, res: Response) => {
    try {
        const newMedicineData: IMedicineModel = req.body;
        const newMedicine = new Medicine(newMedicineData);
        const savedMedicine = await newMedicine.save();
        res.status(StatusCodes.CREATED).json(savedMedicine);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
    }
}

export const updateMedicine = async (req: Request, res: Response) => {
    try {
        const updatedMedicineData: IMedicineModel = req.body;
        const medicineId = req.params.id;
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Medicine not found' });
        }
        Object.assign(medicine, updatedMedicineData);
        const updatedMedicine = await medicine.save();
        res.status(StatusCodes.OK).json(updatedMedicine);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
    }
}


export const searchMedicines = async (req: Request, res: Response) => {
    let medicineName: string = req.query.name as string || "";

    if ( medicineName.length === 0){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide a medicine name' });
    }

    try {
        const medicines: IMedicineModel[] = await Medicine.find({ name: { $regex: medicineName, $options: 'i' } });
        if (medicines.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No medicines found' });
        }
        res.status(StatusCodes.OK).json(medicines);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
    }
}

