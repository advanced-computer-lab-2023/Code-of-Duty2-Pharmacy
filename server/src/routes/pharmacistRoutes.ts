import express from "express";
import {
  changePharmacistPassword,
  deletePharmacist,
  getPharmacistInfo,
  getPharmacists,
  searchPharmacists,
  updatePharmacist,
} from "../controllers/pharmacistController";
import { authenticateUser } from "../middlewares/authentication";
import { getAllOrders, getGroupedOrdersData, getMedicinesInOrders } from "../controllers/orderController";

const router = express.Router();

// --> Path: /pharmacists/

router.use(authenticateUser);

router.delete("/:id", deletePharmacist);
router.get("/", getPharmacists);
router.get("/search", searchPharmacists);
router.post("/change-password", changePharmacistPassword);
router.get("/me/complete-info", getPharmacistInfo);
router.patch("/me/complete-info", updatePharmacist);

router.get("/orders", getAllOrders)
router.get("/medicines-in-orders",getMedicinesInOrders )
router.get("/total-sales", getGroupedOrdersData)


export default router;
