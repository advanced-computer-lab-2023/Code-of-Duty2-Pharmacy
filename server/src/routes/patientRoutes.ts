import express from "express";
import {
  getAllPatients,
  deletePatient,
  getDeliveryAddresses,
  addDeliveryAddress,
} from "../controllers/patientController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getAllPatients);
router.delete("/:id", deletePatient);
router.get("/addresses", getDeliveryAddresses);
router.post("/addresses", addDeliveryAddress);

export default router;
