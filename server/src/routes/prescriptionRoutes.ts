import express from "express";
import { authenticateUser } from "../middlewares/authentication";
import { addMedicine, deleteMedicine } from "../controllers/prescriptionController";

const router = express.Router();

router.use(authenticateUser);
router.post("/:prescriptionId/medicines", addMedicine);
router.delete("/:prescriptionId/medicines/:medicineId", deleteMedicine);

export default router;
