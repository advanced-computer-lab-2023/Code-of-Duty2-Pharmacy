import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Pharmacist, { IPharmacistModel } from '../models/pharmacists/Pharmacist';

export const deletePharmacist = async (req: Request, res: Response) => {
    try {
        const pharmacistId = req.params.id;
        
        const deletedPharmacist: IPharmacistModel | null = await Pharmacist.findByIdAndDelete(pharmacistId);

        if (!deletedPharmacist) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Pharmacist not found' });
        }

        res.status(StatusCodes.OK).json(deletedPharmacist);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
    }
};
