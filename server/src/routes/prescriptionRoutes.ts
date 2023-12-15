import express from "express";
import { authenticateUser } from "../middlewares/authentication";
import {
  getPrescription,
  addMedicineToPrescription,
  deleteMedicineFromPrescription
} from "../controllers/prescriptionController";

const router = express.Router();

router.use(authenticateUser);
router.post("/:prescriptionId/medicines", addMedicineToPrescription);
router.delete("/:prescriptionId/medicines/:medicineId", deleteMedicineFromPrescription);

// WARNING: Keep these routes at the bottom of the file
router.get("/:prescriptionId", getPrescription);

export default router;
