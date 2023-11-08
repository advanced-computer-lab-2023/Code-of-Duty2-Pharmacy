import express from "express";
import {
  getAllPatients,
  deletePatient,
  getPatientOrders
} from "../controllers/patientController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getAllPatients);
router.get("/orders", getPatientOrders);

router.delete("/:id", deletePatient);

export default router;
