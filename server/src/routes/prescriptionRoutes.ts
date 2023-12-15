import express from "express";
import { authenticateUser } from "../middlewares/authentication";
import {
  getPrescription,
  addMedicineToPrescription,
  deleteMedicineFromPrescription
} from "../controllers/prescriptionController";

const router = express.Router();

router.use(authenticateUser);
router.get("/:prescriptionId", getPrescription);
router.post("/:prescriptionId/medicines", addMedicineToPrescription);
router.delete("/:prescriptionId/medicines/:medicineId", deleteMedicineFromPrescription);

export default router;
