import express from "express";

import { addAdmin, changeAdminPassword, deleteAdmin, getAllNotifications } from "../controllers/adminController";
import { authenticateUser } from "../middlewares/authentication";
import { getAllAdmins } from "../controllers/adminController";

const router = express.Router();

// --> Path: /admins/

router.use(authenticateUser);
router.get("/", getAllAdmins);
router.post("/", addAdmin);
router.post("/change-password", changeAdminPassword);
router.get("/notifications", getAllNotifications);

// WARNING: Keep these routes at the bottom of the file
router.delete("/:id", deleteAdmin);

export default router;
