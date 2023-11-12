import express from "express";

import { addAdmin, changeAdminPassword } from "../controllers/adminController";
import { authenticateUser } from "../middlewares/authentication";
import { authorizeUser } from "../middlewares/authorization";
import UserRole from "../types/enums/UserRole";

const router = express.Router();

// --> Path: /admins/

router.use(authenticateUser);

router.post("/", addAdmin);

router.post("/change-password", changeAdminPassword);

export default router;
