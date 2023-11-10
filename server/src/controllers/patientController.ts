import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Order, { IOrderModel } from "../models/orders/Order";
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

export const getPatientOrders = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const patientId = req.user?.id;

    const orders: IOrderModel[] = await Order.find({
      patientId: patientId,
    }).populate({
      path: "medicines.medicineId",
      select: "name",
    });

    if (!orders) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No orders found" });
    }

    res.status(StatusCodes.OK).json(orders);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;

    const deletedOrder: IOrderModel | null = await Order.findByIdAndDelete(
      orderId
    );

    if (!deletedOrder) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found" });
    }

    res.status(StatusCodes.OK).json(deletedOrder);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
