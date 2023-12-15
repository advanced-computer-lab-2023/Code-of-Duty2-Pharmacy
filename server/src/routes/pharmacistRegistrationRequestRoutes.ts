import express from "express";

import { getAllPharmacistRegistrationRequests } from "../controllers/adminController";
import { authenticateUser } from "../middlewares/authentication";
import {
  acceptPharmacistRegistrationRequest,
  rejectPharmacistRegistrationRequest
} from "../controllers/registrationController";

const router = express.Router();

router.use(authenticateUser);
router.get("/", getAllPharmacistRegistrationRequests);
router.post("/accept-pharmacist-request", acceptPharmacistRegistrationRequest);
router.post("/reject-pharmacist-request", rejectPharmacistRegistrationRequest);

export default router;
