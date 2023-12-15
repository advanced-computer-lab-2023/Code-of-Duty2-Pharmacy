// get all orders

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Order from "../models/orders/Order";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import Medicine from "../models/medicines/Medicine";

export const getAllOrders = async (req: AuthorizedRequest, res: Response) => {
  try {
    const orders = await Order.find();

    res.status(StatusCodes.OK).json(orders);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
// get all the orders , return an array of objects , each object contain 
// medicine name , medicine price, the total quantity sold of each medicine , and the total price of each medicine
export const getGroupedOrdersData = async (req: AuthorizedRequest, res: Response) => {
  
  const orders = await Order.find();
  const medicineIds = [...new Set(orders.flatMap(order => order.medicines.map(medicine => medicine.medicineId.toString())))];
  const medicines = await Medicine.find({ '_id': { $in: medicineIds } });
  const medicineMap = new Map();
  medicines.forEach((medicine) => {  
    medicineMap.set(medicine._id.toString(), {
      name: medicine.name,
      price: medicine.price,
      totalQuantitySold: 0,
      totalPrice: 0,
    });
  });
  orders.forEach((order) => {
    order.medicines.forEach((medicine) => {
      const medicineData = medicineMap.get(medicine.medicineId.toString());
      if (medicineData) {
        medicineData.totalQuantitySold += medicine.quantity;
        medicineData.totalPrice += medicine.quantity * medicineData.price;
      }
    });
  });
  const returndata = Array.from(medicineMap.values());
  res.status(StatusCodes.OK).json(returndata);
}

// get the name , id, and price of all the medicines in the orders
export const getMedicinesInOrders = async (req: AuthorizedRequest, res: Response) => {
  const orders = await Order.find();
  const medicineIds = [...new Set(orders.flatMap(order => order.medicines.map(medicine => medicine.medicineId.toString())))];
  const medicines = await Medicine.find({ '_id': { $in: medicineIds } });
  const medicineMap = new Map();
  medicines.forEach((medicine) => {  
    medicineMap.set(medicine._id.toString(), {
      name: medicine.name,
      price: medicine.price,
    });
  });
  const returndata = Array.from(medicineMap.values());
  res.status(StatusCodes.OK).json(returndata);
}