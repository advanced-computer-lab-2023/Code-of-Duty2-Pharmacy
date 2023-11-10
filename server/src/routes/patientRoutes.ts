import express from "express";
import {
  getAllPatients,
  deletePatient,
  changePatientPassword,
} from "../controllers/patientController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getAllPatients);
router.delete("/:id", deletePatient);
router.post("/change-password", changePatientPassword);

export default router;
