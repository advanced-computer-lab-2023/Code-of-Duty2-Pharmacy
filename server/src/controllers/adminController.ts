import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import Admin from "../models/admins/Admin";
import PharmacistRegistrationRequest from "../models/pharmacist_registration_requests/PharmacistRegistrationRequest";

export const addAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // check if username exists in admin collection
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "username already exists" });
    }

    // TODO: Check for username duplication
    // in users collection.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({ username, password });
    const savedAdmin = await newAdmin.save();
    res.status(StatusCodes.CREATED).json(savedAdmin);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const getAllPharmacistRegistrationRequests = async (
  req: Request,
  res: Response
) => {
  try {
    const allPharmacistRegistrationRequests =
      await PharmacistRegistrationRequest.find();
    res.status(StatusCodes.OK).json(allPharmacistRegistrationRequests);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
