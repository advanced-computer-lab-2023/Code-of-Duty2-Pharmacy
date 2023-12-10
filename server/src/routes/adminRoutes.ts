import express from "express";

import { addAdmin, changeAdminPassword, deleteAdmin } from "../controllers/adminController";
import { authenticateUser } from "../middlewares/authentication";
import { authorizeUser } from "../middlewares/authorization";
import { getAllAdmins } from "../controllers/adminController";
import UserRole from "../types/enums/UserRole";

const router = express.Router();

// --> Path: /admins/

router.use(authenticateUser);

router.get("/", getAllAdmins);

router.post("/", addAdmin);

router.post("/change-password", changeAdminPassword);

router.delete("/:id" , deleteAdmin)

export default router;
