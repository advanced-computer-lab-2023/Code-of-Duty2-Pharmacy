import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Patient, { IPatientModel } from "../models/patients/Patient";
import { findPatientById , updatePatientPasswordById } from "../services/patients";
import { AuthorizedRequest } from "../types/AuthorizedRequest";

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const allPatients: IPatientModel[] = await Patient.find();

    if (allPatients.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No Patients found" });
    }

    res.status(StatusCodes.OK).json(allPatients);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.id;

    const deletedPatient: IPatientModel | null =
      await Patient.findByIdAndDelete(patientId);

    if (!deletedPatient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Patient not found" });
    }

    res.status(StatusCodes.OK).json(deletedPatient);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const changePatientPassword = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const patientId = req.user?.id!;
    const patient = await findPatientById(patientId);

    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'patient not found' });
    }
    
    const isPasswordCorrect = await patient.verifyPassword?.(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'old password is not correct' });
    }

    await updatePatientPasswordById(patientId, newPassword);
    return res.status(StatusCodes.OK).json({ message: 'Password updated successfully!' });

  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while updating the password' });
  }
};



