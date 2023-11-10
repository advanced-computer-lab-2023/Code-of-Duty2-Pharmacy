import express from "express";
import {
  getAllPatients,
  deletePatient,
  getPatientOrders,
  cancelOrder,
} from "../controllers/patientController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getAllPatients);
router.get("/orders", getPatientOrders);
router.delete("/orders/:orderId", cancelOrder);

router.delete("/:id", deletePatient);

export default router;
