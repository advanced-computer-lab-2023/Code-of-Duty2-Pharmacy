import e, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Pharmacist, { IPharmacistModel } from "../models/pharmacists/Pharmacist";
import { findPharmacistById, updatePharmacistPasswordById } from "../services/pharmacists";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import { updatePatientPasswordById } from "../services/patients";

export const deletePharmacist = async (req: Request, res: Response) => {
  try {
    const pharmacistId = req.params.id;

    const deletedPharmacist: IPharmacistModel | null = await Pharmacist.findByIdAndDelete(pharmacistId);

    if (!deletedPharmacist) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Pharmacist not found" });
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

export const getPharmacistById = async (req: Request, res: Response) => {
  try {
    const pharmacistId = req.params.id;
    const pharmacist: IPharmacistModel | null = await Pharmacist.findById(pharmacistId);

    if (!pharmacist) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Pharmacist not found" });
    }

    res.status(StatusCodes.OK).json(pharmacist);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const getPharmacistInfo = async (req: AuthorizedRequest, res: Response) => {
  try {
    const pharmacistId = req.user?.id;
    const pharmacist: IPharmacistModel | null = await Pharmacist.findById(pharmacistId);
    if (!pharmacist) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not Logged In" });
    }
    return res.status(StatusCodes.OK).json(pharmacist);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const searchPharmacists = async (req: Request, res: Response) => {
  try {
    const username = req.query.username as string;
    const email = req.query.email as string;

    const pharmacists: IPharmacistModel[] =
      (!username || username.length === 0) && (!email || email.length === 0)
        ? await Pharmacist.find()
        : !username || username.length === 0
          ? await Pharmacist.find({ email: { $regex: email, $options: "i" } })
          : await Pharmacist.find({
              username: { $regex: username, $options: "i" }
            });

    if (pharmacists.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "No pharmacists found" });
    }
    res.status(StatusCodes.OK).json(pharmacists);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

// TODO: Remove this "confirmPassword" as it is not needed
export const changePharmacistPassword = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const pharmacistId = req.user?.id!;
    const pharmacist = await Pharmacist.findById(pharmacistId).select("+password");
    if (!pharmacist) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Pharmacist not found" });
    }

    const isPasswordCorrect = await pharmacist.verifyPassword?.(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Old password is incorrect" });
    }
    await updatePharmacistPasswordById(pharmacistId, newPassword);
    return res.status(StatusCodes.OK).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "An error occurred while updating the password" });
  }
};

export const updatePharmacist = async (req: AuthorizedRequest, res: Response) => {
  try {
    const pharmacistId = req.user?.id;
    const pharmacist = await Pharmacist.findById(pharmacistId);

    if (!pharmacist) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Pharmacist not found" });
    }

    const updatedPharmacist = await Pharmacist.findByIdAndUpdate(pharmacistId, req.body, { new: true });

    if (!updatedPharmacist) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Pharmacist not found" });
    }

    res.status(StatusCodes.OK).json(updatedPharmacist);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};
