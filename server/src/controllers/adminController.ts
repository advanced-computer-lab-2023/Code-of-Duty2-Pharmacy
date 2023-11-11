import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Admin from "../models/admins/Admin";
import PharmacistRegistrationRequest from "../models/pharmacist_registration_requests/PharmacistRegistrationRequest";
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
