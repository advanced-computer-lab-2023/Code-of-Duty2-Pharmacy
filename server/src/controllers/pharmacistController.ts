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
export const getPharmacists = async (req: Request, res: Response) => {
    try {
        const pharmacists: IPharmacistModel[] = await Pharmacist.find();

        res.status(StatusCodes.OK).json(pharmacists);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
    }
};

export const searchPharmacists = async (req: Request, res: Response) => {
    try {
        
        const username = req.params.username as string;
        const email = req.params.email as string;



        const pharmacists: IPharmacistModel[] = ((!username || username.length ===0) && (!email || email.length ===0))? 
                                                await Pharmacist.find() :(!username || username.length ===0) ?
                                                await Pharmacist.find({ username: { $regex: username, $options: 'i' } }) :  
                                                await Pharmacist.find({email: { $regex: email, $options: 'i' } });
        

        res.status(StatusCodes.OK).json(pharmacists);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
    }
}
