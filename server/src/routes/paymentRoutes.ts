import express from "express";
import { configurePayment, createPaymentIntent } from "../controllers/paymentController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);
router.get("/config", configurePayment);
router.post("/create-payment-intent", createPaymentIntent);

export default router;
