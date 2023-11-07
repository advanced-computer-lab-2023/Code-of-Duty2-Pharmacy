import express from "express";

import { addAdmin } from "../controllers/adminController";
import { authenticateUser } from "../middlewares/authentication";
import { authorizeUser } from "../middlewares/authorization";
import UserRole from "../types/UserRole";

const router = express.Router();

router.use(authenticateUser);

router.post("/", addAdmin);

export default router;
