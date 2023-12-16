import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Admin, { IAdminModel } from "../models/admins/Admin";
import PharmacistRegistrationRequest from "../models/pharmacist_registration_requests/PharmacistRegistrationRequest";
import { findAdminById, updateAdminPasswordById } from "../services/admins";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import Patient from "../models/patients/Patient";
import Doctor from "../models/doctors/Doctor";

export const getAllAdmins = async (req: AuthorizedRequest, res: Response) => {
  try {
    const admins = await Admin.find();

    res.status(StatusCodes.OK).json(admins);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};
export const addAdmin = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    const existingPharmacist = await Admin.findOne({ username });
    const existingPatient = await Patient.findOne({ username });
    const existingDoctor = await Doctor.findOne({ username });

    if (existingAdmin || existingPharmacist || existingPatient || existingDoctor) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Username already taken" });
    }

    const newAdmin = new Admin({ username, password });

    const savedAdmin = await newAdmin.save();

    res.status(StatusCodes.CREATED).json(savedAdmin);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const deleteAdmin = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Admin not found" });
    }

    res.status(StatusCodes.OK).json(deletedAdmin);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const getAllPharmacistRegistrationRequests = async (req: AuthorizedRequest, res: Response) => {
  try {
    const requests = await PharmacistRegistrationRequest.find();

    res.status(StatusCodes.OK).json(requests);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const changeAdminPassword = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const adminId = req.user?.id!;
    const admin = await findAdminById(adminId);

    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Admin not found" });
    }

    const isPasswordCorrect = await admin.verifyPassword?.(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Old password is incorrect" });
    }

    await updateAdminPasswordById(adminId, newPassword);
    return res.status(StatusCodes.OK).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "An error occurred while updating the password" });
  }
};

// export const searchAdmins = async (req: AuthorizedRequest, res: Response) => {
//   try {
//     const { query } = req.query;
//     const admins = await Admin.find({
//       username: { $regex: query as string, $options: "i" },
//     });
//     res.status(StatusCodes.OK).json(admins);
//   } catch (err) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: (err as Error).message });
//   }

export const getAllNotifications = async (req: AuthorizedRequest, res: Response) => {
  try {
    const adminId = req.user?.id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Admin not found" });
    }

    res.status(StatusCodes.OK).json(admin.receivedNotifications ? admin.receivedNotifications : []);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};
