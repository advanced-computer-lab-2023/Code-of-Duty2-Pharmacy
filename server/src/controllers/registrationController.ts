import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import Patient from "../models/patients/Patient";
import PharmacistRegistrationRequest from "../models/pharmacist_registration_requests/PharmacistRegistrationRequest";

export const registerPatient = async (req: Request, res: Response) => {
  try {
    const {
      username,
      name,
      email,
      password,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContact,
    } = req.body;

    // TODO: Check for username duplication
    // in users collection.

    const existingUserName = await Patient.findOne({ username });

    if (existingUserName) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "username already exists" });
    }
    const existingMail = await Patient.findOne({ email });

    if (existingMail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newPatient = new Patient({
      username,
      name,
      email,
      password,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContact: {
        fullname: emergencyContact.fullname,
        mobileNumber: emergencyContact.mobileNumber,
        relationToPatient: emergencyContact.relationToPatient,
      },
    });

    const savedPatient = await newPatient.save();
    res.status(StatusCodes.CREATED).json(savedPatient);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const registerPharmacist = async (req: Request, res: Response) => {
  try {
    const {
      username,
      name,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
    } = req.body;

    // TODO: Check for username , email, phone number ,etc duplication <----------------------------------------------------
    // in users collection.

    const existingUserName = await PharmacistRegistrationRequest.findOne({
      username,
    });
    if (existingUserName) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "username already exists" });
    }
    const existingMail = await PharmacistRegistrationRequest.findOne({ email });
    if (existingMail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newRequest = new PharmacistRegistrationRequest({
      username,
      name,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
    });

    const savedRegistrationRequest = await newRequest.save();
    res.status(StatusCodes.CREATED).json(savedRegistrationRequest);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
