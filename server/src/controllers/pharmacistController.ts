import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Pharmacist, { IPharmacistModel } from "../models/pharmacists/Pharmacist";
import { AuthorizedRequest } from "../types/AuthorizedRequest";

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

export const getPharmacistInfo = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const pharmacistId = req.user?.id;
    const pharmacist: IPharmacistModel | null = await Pharmacist.findById(
      pharmacistId
    );
    if (!pharmacist) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Not Logged In" });
    }
    return res.status(StatusCodes.OK).json(pharmacist);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
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
