import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { AuthorizedRequest } from "../types/AuthorizedRequest";
import { UserRole } from "../types";
import Doctor from "../models/doctors/Doctor";

export const getAllDoctors = async (req: AuthorizedRequest, res: Response) => {
  const { user } = req;
  if (/*user?.role !== UserRole.PATIENT &&*/ user?.role !== UserRole.ADMIN && user?.role !== UserRole.PHARMACIST) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to perform this action." });
  }
  try {
    const doctors = await Doctor.find();
    res.status(StatusCodes.OK).json(doctors);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const getDoctorById = async (req: AuthorizedRequest, res: Response) => {
  const { user } = req;
  if (/*user?.role !== UserRole.PATIENT && */ user?.role !== UserRole.ADMIN && user?.role !== UserRole.PHARMACIST) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to perform this action." });
  }
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Doctor not found" });
    }
    res.status(StatusCodes.OK).json(doctor);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const searchDoctors = async (req: AuthorizedRequest, res: Response) => {
  const { user } = req;
  if (/*user?.role !== UserRole.PATIENT &&*/ user?.role !== UserRole.ADMIN && user?.role !== UserRole.PHARMACIST) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to perform this action." });
  }
  const { name } = req.query;
  try {
    const doctors = await Doctor.find({
      name: { $regex: name as string, $options: "i" }
      // ,specialization: { $regex: specialization as string, $options: "i" }
    });
    res.status(StatusCodes.OK).json(doctors);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};
