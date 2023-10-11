import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Patient, { IPatientModel } from '../models/patients/Patient';

export const getAllPatients = async (req: Request, res: Response) => {
    try {
        const allPatients: IPatientModel[] = await Patient.find();
        if (allPatients.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No Patients found' });
        }
        res.status(StatusCodes.OK).json(allPatients);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
    } ;
}

