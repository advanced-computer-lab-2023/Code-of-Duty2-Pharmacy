import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Patient, { IPatientModel } from "../models/patients/Patient";
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

export const getDeliveryAddresses = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const deliveryAddresses = await Patient.findById(userId).select(
      "deliveryAddresses"
    );

    if (!deliveryAddresses) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Delivery addresses not found" });
    }

    res.status(StatusCodes.OK).json(deliveryAddresses);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const addDeliveryAddress = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const { address } = req.body;

    const patient = await Patient.findById(userId).select("+deliveryAddresses");

    if (!patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Patient not found" });
    }

    patient.deliveryAddresses?.push(address);

    await patient.save();

    res.status(StatusCodes.OK).json(patient.deliveryAddresses);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
