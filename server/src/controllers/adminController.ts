import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import Admin from "../models/admins/Admin";
import PharmacistRegistrationRequest from "../models/pharmacist_registration_requests/PharmacistRegistrationRequest";
import { findAdminById, updateAdminPasswordById } from "../services/admins";
import { AuthorizedRequest } from "../types/AuthorizedRequest";

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

export const changeAdminPassword = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const adminId = req.user?.id!;
    const admin = await findAdminById(adminId);

    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'admin not found' });
    }
    
    const isPasswordCorrect = await admin.verifyPassword?.(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'old password is not correct' });
    }

    await updateAdminPasswordById(adminId, newPassword);
    return res.status(StatusCodes.OK).json({ message: 'Password updated successfully!' });

  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while updating the password' });
  }
};