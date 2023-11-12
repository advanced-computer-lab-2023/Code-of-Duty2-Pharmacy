import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import Patient from "../models/patients/Patient";
import PharmacistRegistrationRequest from "../models/pharmacist_registration_requests/PharmacistRegistrationRequest";
import Pharmacist from "../models/pharmacists/Pharmacist";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import {
  sendAcceptanceEmailToPharmacist,
  sendRejectionEmailToPharmacist,
} from "../services/admins";
import Admin from "../models/admins/Admin";
import Doctor from "../models/doctors/Doctor";
import { error } from "console";

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

    const existingMail = await Patient.findOne({ email });

    if (existingMail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already taken by another patient" });
    }

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

    const existingMail = await PharmacistRegistrationRequest.findOne({ email });

    if (existingMail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already taken by another pharmacist" });
    }

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

export const acceptPharmacistRegistrationRequest = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const request = await PharmacistRegistrationRequest.findOne({
    username: req.body.username,
  });

  if (!request) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "pharmacist request not found" });
  }

  const newPharmacist = new Pharmacist({
    username: request.username,
    password: request.password,
    email: request.email,
    name: request.name,
    gender: request.gender,
    dateOfBirth: request.dateOfBirth,
    hourlyRate: request.hourlyRate,
    affiliation: request.affiliation,
    educationalBackground: request.educationalBackground,
  });

  const savedPharmacist = await newPharmacist.save();

  await PharmacistRegistrationRequest.findOneAndDelete({
    username: req.body.username,
  });

  // TODO: send an email to the pharmacist with the acceptance message and ask them to complete their info
  sendAcceptanceEmailToPharmacist(newPharmacist.name, newPharmacist.email);

  return res.status(StatusCodes.OK).json(savedPharmacist);
};

export const rejectPharmacistRegistrationRequest = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const deletedRequest = await PharmacistRegistrationRequest.findOneAndDelete({
    username: req.body.username,
  });

  // TODO: send an email to the pharmacist with the reason of rejection
  if (deletedRequest?.name && deletedRequest?.email) {
    sendRejectionEmailToPharmacist(deletedRequest.name, deletedRequest.email);
  }

  res.status(StatusCodes.OK).json(deletedRequest);
};
