import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Admin from "../models/admins/Admin";
import PharmacistRegistrationRequest from "../models/pharmacist_registration_requests/PharmacistRegistrationRequest";
import { findAdminById, updateAdminPasswordById } from "../services/admins";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import Pharmacist from "../models/pharmacists/Pharmacist";
import Patient from "../models/patients/Patient";
import Doctor from "../models/doctors/Doctor";

export const addAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    const existingPharmacist = await Pharmacist.findOne({ username });
    const existingPatient = await Patient.findOne({ username });
    const existingDoctor = await Doctor.findOne({ username });

    if (
      existingAdmin ||
      existingPharmacist ||
      existingPatient ||
      existingDoctor
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Username already taken" });
    }

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
    const requests = await PharmacistRegistrationRequest.find();

    res.status(StatusCodes.OK).json(requests);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const changeAdminPassword = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const adminId = req.user?.id!;
    const admin = await findAdminById(adminId);

    if (!admin) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Admin not found" });
    }

    const isPasswordCorrect = await admin.verifyPassword?.(currentPassword);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Old password is incorrect" });
    }

    await updateAdminPasswordById(adminId, newPassword);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "An error occurred while updating the password" });
  }
};
