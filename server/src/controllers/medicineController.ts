import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Medicine, { IMedicineModel } from "../models/medicines/Medicine";
import Order from "../models/orders/Order";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import Patient from "../models/patients/Patient";
import HealthPackage from "../models/health_packages/HealthPackage";
import { UserRole } from "../types";

export const getAllMedicines = async (req: AuthorizedRequest, res: Response) => {
  try {
    const medicines = await Medicine.find();

    if (medicines.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "No medicines found" });
    }

    const patientId = req.user?.id;

    const patient = await Patient.findById(patientId).select("subscribedPackage");

    let discount = 0;
    let packageName = "";

    if (patient && patient.subscribedPackage && patient.subscribedPackage.status === "subscribed") {
      const healthPackage = await HealthPackage.findById(patient.subscribedPackage.packageId);

      if (healthPackage) {
        discount = healthPackage.discounts.gainedPharmacyMedicinesDiscount;
        packageName = healthPackage.name;
      }
    }

    const medicinesWithDiscount = medicines.map((medicine) => {
      const medicineObject = medicine.toObject();
      const discountedPrice = (medicine.price * (1 - discount)).toFixed(2);
      return {
        ...medicineObject,
        price: discountedPrice,
        originalPrice: medicine.price.toFixed(2)
      };
    });

    res.status(StatusCodes.OK).json({ medicines: medicinesWithDiscount, discount, packageName });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
  }
};

export const addMedicine = async (req: Request, res: Response) => {
  try {
    const newMedicineData: IMedicineModel = req.body;

    const existingMedicine = await Medicine.findOne({
      name: newMedicineData.name
    });

    if (existingMedicine) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "A medicine with this name already exists." });
    }

    const newMedicine = new Medicine(newMedicineData);
    const savedMedicine = await newMedicine.save();
    res.status(StatusCodes.CREATED).json(savedMedicine);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const updateMedicine = async (req: Request, res: Response) => {
  try {
    const updatedMedicineData: IMedicineModel = req.body;
    const medicineId = req.params.id;
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Medicine not found" });
    }
    Object.assign(medicine, updatedMedicineData);
    const updatedMedicine = await medicine.save();
    res.status(StatusCodes.OK).json(updatedMedicine);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const searchMedicines = async (req: Request, res: Response) => {
  let medicineName: string = (req.query.name as string) || "";
  let activeIngredient: string = (req.query.activeIngredient as string) || "";

  if (medicineName.length === 0 && activeIngredient.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide a medicine name or active ingredient" });
  }

  try {
    let query: any = {};
    if (medicineName.length > 0) {
      query.name = { $regex: medicineName, $options: "i" };
    }
    if (activeIngredient.length > 0) {
      query.activeIngredients = { $elemMatch: { $eq: activeIngredient } };
    }

    const medicines: IMedicineModel[] = await Medicine.find(query);
    if (medicines.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "No medicines found" });
    }
    res.status(StatusCodes.OK).json(medicines);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const getMedicineSales = async (req: Request, res: Response) => {
  let medicineId: string = (req.body.medicineId as string) || "";
  const orders = await Order.find();
  let totalSales = 0;
  for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < orders[i].medicines.length; j++) {
      if (orders[i].medicines[j].medicineId.toString() == medicineId) {
        totalSales += orders[i].medicines[j].quantity;
      }
    }
  }
  res.status(StatusCodes.OK).json({ totalSales });
};

export const getAllMedicinesSales = async (req: Request, res: Response) => {
  const orders = await Order.find();
  let medsMap: Map<string, number> = new Map<string, number>();

  for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < orders[i].medicines.length; j++) {
      let quantity = medsMap.get(orders[i].medicines[j].medicineId.toString()) || 0;
      medsMap.set(orders[i].medicines[j].medicineId.toString(), quantity + orders[i].medicines[j].quantity);
    }
  }

  return res.status(StatusCodes.OK).json(Object.fromEntries(medsMap));
};

export const bulkUpdateMedicineQuantities = async (req: AuthorizedRequest, res: Response) => {
  try {
    const updates = req.body;

    const bulkOps = updates.map((update: any) => ({
      updateOne: {
        filter: { _id: update.medicineId },
        update: { $inc: { availableQuantity: -update.boughtQuantity } }
      }
    }));

    await Medicine.bulkWrite(bulkOps);

    res.status(200).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const archiveOrUnarchiveMedicine = async (req: AuthorizedRequest, res: Response) => {
  try {
    // check user role
    if (req.user?.role !== UserRole.PHARMACIST) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }

    const archive: boolean = req.body.archive;
    const medicineId = req.params.id;
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Medicine not found" });
    }
    medicine.isArchived = archive;
    const updatedMedicine = await medicine.save();
    res.status(StatusCodes.OK).json(updatedMedicine);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};

export const getTopThreeMedicines = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    let medsMap: Map<string, number> = new Map<string, number>();

    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].medicines.length; j++) {
        let quantity = medsMap.get(orders[i].medicines[j].medicineId.toString()) || 0;
        medsMap.set(orders[i].medicines[j].medicineId.toString(), quantity + orders[i].medicines[j].quantity);
      }
    }

    // Sort by sales quantity in descending order
    const sortedMedicines = Array.from(medsMap.entries()).sort((a, b) => b[1] - a[1]);

    // Get top three medicines
    const topThreeMedicines = sortedMedicines.slice(0, 3);

    // Fetch medicine details for the top three
    const resultArray = await Promise.all(
      topThreeMedicines.map(async ([medicineId, sales]) => {
        const medicine = await Medicine.findById(medicineId);
        if (medicine) {
          return {
            medicineName: medicine.name,
            price: medicine.price,
            sales
          };
        } else {
          // Handle the case where the medicine is not found
          return {
            medicineName: "Not Found",
            price: 0,
            sales
          };
        }
      })
    );

    res.status(StatusCodes.OK).json(resultArray);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: (err as Error).message });
  }
};
