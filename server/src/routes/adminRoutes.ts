import express from "express";

import { addAdmin, changeAdminPassword, deleteAdmin } from "../controllers/adminController";
import { authenticateUser } from "../middlewares/authentication";
import { authorizeUser } from "../middlewares/authorization";
import { getAllAdmins } from "../controllers/adminController";
import UserRole from "../types/enums/UserRole";
import { getAllOrders, getGroupedOrdersData, getMedicinesInOrders } from "../controllers/orderController";

const router = express.Router();

// --> Path: /admins/

router.use(authenticateUser);

router.get("/", getAllAdmins);

router.post("/", addAdmin);

router.post("/change-password", changeAdminPassword);

router.delete("/:id" , deleteAdmin)

router.get("/orders", getAllOrders)
router.get("/medicines-in-orders",getMedicinesInOrders )
router.get("/total-sales", getGroupedOrdersData)

export default router;
