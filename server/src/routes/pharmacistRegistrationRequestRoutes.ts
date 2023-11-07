import express from "express";

import { getAllPharmacistRegistrationRequests } from "../controllers/adminController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getAllPharmacistRegistrationRequests);

export default router;
