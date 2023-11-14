import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Patient, { IPatientModel } from "../models/patients/Patient";
import {
  findPatientById,
  updatePatientPasswordById,
} from "../services/patients";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import Medicine, { IMedicineModel } from "../models/medicines/Medicine";
import { ICartItem } from "../models/patients/interfaces/subinterfaces/ICartItem";
import { STATUS_CODES } from "http";
import Order, { IOrderModel } from "../models/orders/Order";
import HealthPackage from "../models/health_packages/HealthPackage";

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
export const changePatientPassword = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const patientId = req.user?.id!;
    const patient = await findPatientById(patientId);

    if (!patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "patient not found" });
    }

    const isPasswordCorrect = await patient.verifyPassword?.(currentPassword);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "old password is not correct" });
    }

    await updatePatientPasswordById(patientId, newPassword);
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

export const getPatientDetails = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const patient = await Patient.findById(userId).select(
      "_id name mobileNumber"
    );

    if (!patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Patient not found" });
    }

    return res.status(StatusCodes.OK).json(patient);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const getCartItems = async (req: AuthorizedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const patient = await Patient.findById(userId)
      .select("subscribedPackage cart")
      .populate({
        path: "cart.medicineId",
        select: "_id name price pictureUrl",
      });

    if (!patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Patient not found" });
    }

    if (!patient.cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cart not found" });
    }

    let discount = 0;

    if (
      patient.subscribedPackage &&
      patient.subscribedPackage.status === "subscribed"
    ) {
      const healthPackage = await HealthPackage.findById(
        patient.subscribedPackage.packageId
      );

      if (healthPackage) {
        discount = healthPackage.discounts.gainedPharamcyMedicinesDiscount;
      }
    }

    const cartItemsWithAppliedDiscount = patient.cart.map((item: any) => {
      const discountedPrice = parseFloat(
        (item.medicineId.price * (1 - discount)).toFixed(2)
      );

      return {
        medicineId: {
          _id: item.medicineId._id,
          name: item.medicineId.name,
          price: discountedPrice,
          pictureUrl: item.medicineId.pictureUrl,
        },
        quantity: item.quantity,
      };
    });

    return res.json(cartItemsWithAppliedDiscount);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      patientId,
      patientName,
      patientAddress,
      patientMobileNumber,
      medicines,
      paidAmount,
      paymentMethod,
    } = req.body;

    const exceedingAvailableQuantityMedicines = [];

    for (const medicine of medicines) {
      const dbMedicine = await Medicine.findById(medicine.medicineId);

      if (!dbMedicine) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `Medicine with id ${medicine.medicineId} not found`,
        });
      }

      if (medicine.quantity > dbMedicine.availableQuantity) {
        exceedingAvailableQuantityMedicines.push(dbMedicine.name);
      }
    }

    if (exceedingAvailableQuantityMedicines.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `The following medicines are out of stock or do not have enough available quantity: ${exceedingAvailableQuantityMedicines.join(
          ", "
        )}. Please go back to your cart and adjust the quantities or remove these items`,
      });
    }

    const newOrder = new Order({
      patientId,
      patientName,
      patientAddress,
      patientMobileNumber,
      medicines,
      paidAmount,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    return res.status(StatusCodes.CREATED).json(savedOrder);
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const clearCart = async (req: AuthorizedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    // Update the patient's cart to an empty array
    const result = await Patient.updateOne(
      { _id: userId },
      { $set: { cart: [] } }
    );

    if (result.matchedCount === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cart not found or already empty" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Cart cleared successfully" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const addToCart = async (req: AuthorizedRequest, res: Response) => {
  try {
    const OTCpurchase = req.body.OTC === "true";
    const userId = req.user?.id;
    const { medicineId, quantity } = req.body;

    // Check if the medicine is actually OTC
    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Medicine not found" });
    } else if (!medicine.isOverTheCounter && OTCpurchase) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Medicine is not OTC" });
    }

    if (quantity <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Quantity must be greater than 0" });
    }

    const patient = await Patient.findOne({
      _id: userId,
      "cart.medicineId": medicineId,
    });

    let currentQuantity = 0;
    if (patient) {
      const item: ICartItem | undefined = patient.cart?.find(
        (item) => item.medicineId.toString() === medicineId
      );
      if (item) {
        currentQuantity = item.quantity;
      }
    }

    // Check if the total quantity exceeds the available quantity
    if (currentQuantity + quantity > medicine.availableQuantity) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Quantity exceeds the available quantity" });
    }

    // Update the patient's cart and add the medicine to it if it is not already present
    let result = await Patient.updateOne(
      { _id: userId, "cart.medicineId": { $ne: medicineId } },
      { $push: { cart: { medicineId, quantity } } }
    );

    // if the medicine is already present in the cart, increment the quantity
    if (result.modifiedCount === 0) {
      result = await Patient.updateOne(
        { _id: userId, "cart.medicineId": medicineId },
        { $inc: { "cart.$.quantity": quantity } }
      );
    }

    if (result.matchedCount === 0 && result.modifiedCount === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Patient not found" });
    }

    return res.status(StatusCodes.OK).json({ message: "Added to cart" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};

export const deleteCartItem = async (req: AuthorizedRequest, res: Response) => {
  try {
    const patientId = req.user?.id;
    const medicineId = req.params.itemId;
    const result = await Patient.updateOne(
      { _id: patientId },
      { $pull: { cart: { medicineId: medicineId } } }
    );
    if (result.matchedCount === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Patient not found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "item Removed from cart successfully" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
export const changeMedicineQuantity = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const { medicineId, newQuantity } = req.params;
    // console.log(req.params);
    // console.log("medicineId", medicineId);
    // console.log("newQuantity", newQuantity);

    const newQuantityNumber = Number(newQuantity);

    if (isNaN(newQuantityNumber) || newQuantityNumber <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Quantity must be a positive number" });
    }

    const patient = await Patient.findOne({
      _id: userId,
      "cart.medicineId": medicineId,
    });

    if (!patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "didn't find a patient with that item in cart" });
    }

    const result = await Patient.updateOne(
      { _id: userId, "cart.medicineId": medicineId },
      { $set: { "cart.$.quantity": newQuantityNumber } }
    );

    if (result.matchedCount === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Medicine not found in cart" });
    }

    return res.status(StatusCodes.OK).json({ message: "Quantity updated" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
export const getCartMedicinesStock = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    try {
      const patient = await Patient.findById(userId).populate({
        path: "cart.medicineId",
        select: "availableQuantity",
      });

      if (!patient) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Patient not found" });
      }

      const availableQuantities = patient.cart
        ? patient.cart.map((item: any) => item.medicineId.availableQuantity)
        : [];

      return res.status(StatusCodes.OK).json({ availableQuantities });
    } catch (err) {
      console.error(err);
      return res.status(StatusCodes.OK).json({ message: "Server error" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
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

    // Fetch the order
    const order: IOrderModel | null = await Order.findById(orderId);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found" });
    }

    // Check the payment method
    if (order.paymentMethod === "wallet") {
      // Fetch the patient
      const patient = await Patient.findById(order.patientId).select("wallet");
      if (!patient || !patient.wallet) {
        console.error("Wallet not found for patient:", order.patientId);
        return;
      }

      // Update the wallet balance
      patient.wallet.amount += order.paidAmount;
      await patient.save();
    }

    // Delete the order
    await Order.deleteOne({ _id: orderId });

    res.status(StatusCodes.OK).json(order);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
