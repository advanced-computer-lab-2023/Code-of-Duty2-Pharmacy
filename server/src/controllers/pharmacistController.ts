import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Pharmacist, { IPharmacistModel } from "../models/pharmacists/Pharmacist";
import { SsidChartSharp } from "@mui/icons-material";
import { findPharmacistById, updatePharmacistPasswordById } from "../services/pharmacists";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import { updatePatientPasswordById } from "../services/patients";

export const deletePharmacist = async (req: Request, res: Response) => {
  try {
    const pharmacistId = req.params.id;

    const deletedPharmacist: IPharmacistModel | null =
      await Pharmacist.findByIdAndDelete(pharmacistId);

    if (!deletedPharmacist) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Pharmacist not found" });
    }

    res.status(StatusCodes.OK).json(deletedPharmacist);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const getPharmacists = async (req: Request, res: Response) => {
  try {
    const pharmacists: IPharmacistModel[] = await Pharmacist.find();

    res.status(StatusCodes.OK).json(pharmacists);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const searchPharmacists = async (req: Request, res: Response) => {
  try {
    const username = req.query.username as string;
    const email = req.query.email as string;
    // console.log(username);
    // console.log(email);

    const pharmacists: IPharmacistModel[] =
      (!username || username.length === 0) && (!email || email.length === 0)
        ? await Pharmacist.find()
        : !username || username.length === 0
        ? await Pharmacist.find({ email: { $regex: email, $options: "i" } })
        : await Pharmacist.find({
            username: { $regex: username, $options: "i" },
          });

    if (pharmacists.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No pharmacists found" });
    }
    res.status(StatusCodes.OK).json(pharmacists);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const changePharmacistPassword = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const pharmacistId = req.user?.id!;
    const pharmacist = await Pharmacist.findById(pharmacistId).select('+password');
    if (!pharmacist) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'pharmacist not found' });
    }
    
    const isPasswordCorrect = await pharmacist.verifyPassword?.(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'old password is not correct' });
    }
    await updatePharmacistPasswordById(pharmacistId, newPassword);
    return res.status(StatusCodes.OK).json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error(error); 
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while updating the password' });
  }
};

