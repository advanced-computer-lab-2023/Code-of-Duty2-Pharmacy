import express from "express";
import {
  getAllPatients,
  deletePatient,
  changePatientPassword,
  getDeliveryAddresses,
  addDeliveryAddress,
  getPatientDetails,
  getCartItems,
  createOrder,
  clearCart,
  addToCart,
  deleteCartItem,
  getPatientOrders,
  cancelOrder,
} from "../controllers/patientController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

// --> Path: /patients/

router.use(authenticateUser);
router.get("/", getAllPatients);
router.get("/orders", getPatientOrders);
router.delete("/orders/:orderId", cancelOrder);

router.delete("/:id", deletePatient);
router.post("/change-password", changePatientPassword);
router.get("/addresses", getDeliveryAddresses);
router.post("/addresses", addDeliveryAddress);
router.get("/me", getPatientDetails);
router.get("/me/cart", getCartItems);
router.delete("/me/cart", clearCart);
router.post("/me/cart", addToCart);
router.delete("/me/cart/:itemId", deleteCartItem);

router.post("/orders", createOrder);

export default router;
