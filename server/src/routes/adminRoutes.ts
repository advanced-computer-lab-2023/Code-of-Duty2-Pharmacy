import express from "express";

import { addAdmin, changeAdminPassword, deleteAdmin } from "../controllers/adminController";
import { authenticateUser } from "../middlewares/authentication";
import { getAllAdmins } from "../controllers/adminController";
import { getOrdersReportData } from "../controllers/orderController";

const router = express.Router();

// --> Path: /admins/

router.use(authenticateUser);

router.get("/", getAllAdmins);

router.post("/", addAdmin);

router.post("/change-password", changeAdminPassword);

router.delete("/:id" , deleteAdmin)

router.get("/orders-report-data", getOrdersReportData)

export default router;
