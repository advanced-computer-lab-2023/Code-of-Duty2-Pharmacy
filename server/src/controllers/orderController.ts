// get all orders

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Order from "../models/orders/Order";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import Medicine from "../models/medicines/Medicine";

interface OrderToReportData {
  medicines: Array<{medicineName: string; medicinePrice: number; medicineQuantity: number }>;
  paidAmount: number;
  orderDate : Date;
}
//  
export const getOrdersReportData  = async (req: AuthorizedRequest, res: Response) => {
  try { 
    // the bottom line is commented because currently , all orders will be pending
    // const orders = await Order.find({ orderStatus: "successful" });
    const orders = await Order.find();
    const medicineIds = [...new Set(orders.flatMap(order => order.medicines.map(medicine => medicine.medicineId.toString())))];
    const medicines = await Medicine.find({ '_id': { $in: medicineIds } });

    const orderToReportPage: OrderToReportData[] = [];
    orders.forEach((order) => {
      const orderToReportPageItem: OrderToReportData = {
        medicines: [],
        paidAmount: order.paidAmount,
        orderDate: order.timestamp,
      };
      order.medicines.forEach((medicine) => {
        const medicineData = medicines.find((medicineItem) => medicineItem._id.toString() === medicine.medicineId.toString());
        if (medicineData) {
          orderToReportPageItem.medicines.push({
            medicineName: medicineData.name,
            medicinePrice: medicineData.price,
            medicineQuantity: medicine.quantity,
          });
        }
      });
      orderToReportPage.push(orderToReportPageItem);
    });
    res.status(StatusCodes.OK).json(orderToReportPage);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }

};
