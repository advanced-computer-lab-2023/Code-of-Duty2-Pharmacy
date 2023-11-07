import express from "express";
import {
  getAllPatients,
  deletePatient,
} from "../controllers/patientController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getAllPatients);
router.delete("/:id", deletePatient);

export default router;
