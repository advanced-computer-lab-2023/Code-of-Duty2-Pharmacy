import express from "express";

import {
  getAllPatients,
  searchPatients,
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
  changeMedicineQuantity,
  getCartMedicinesStock,
  getPatientOrders,
  cancelOrder,
  getPatientById,
  getPatientPayablePrescriptions
} from "../controllers/patientController";
import {
  addPatientAWalletHandler,
  authenticateWalletPatientHandler,
  doesAPatientHaveAWalletHandler,
  getPatientWalletHandler,
  performAWalletTransactionHandler,
  rechargePatientWalletHandler
} from "../controllers/payments/wallets/Patient";
import { authenticateWalletUser } from "../middlewares/walletAuthentication";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

// --> Path: /patients/

router.use(authenticateUser);
router.get("/", getAllPatients);
router.get("/orders", getPatientOrders);
router.delete("/orders/:orderId", cancelOrder);
router.get("/search", searchPatients);
router.post("/change-password", changePatientPassword);
router.get("/addresses", getDeliveryAddresses);
router.post("/addresses", addDeliveryAddress);
router.get("/me", getPatientDetails);
router.get("/me/cart", getCartItems);
router.delete("/me/cart", clearCart);
router.post("/me/cart", addToCart);
router.delete("/me/cart/:itemId", deleteCartItem);
router.patch("/me/cart/:medicineId/change-quantity/:newQuantity", changeMedicineQuantity);
router.get("/me/cart-medicines-stock", getCartMedicinesStock);
router.post("/orders", createOrder);

router.get("/wallets/exists", doesAPatientHaveAWalletHandler);
router.post("/validate-wallet-pin-code", authenticateWalletPatientHandler);
router.post("/wallets", addPatientAWalletHandler);
router.get("/wallets", authenticateWalletUser, getPatientWalletHandler);
router.patch("/wallet-transactions", performAWalletTransactionHandler);
router.patch("/wallet-recharge", rechargePatientWalletHandler);

router.get("/payable-prescriptions", getPatientPayablePrescriptions);

// WARNING: Keep these routes at the bottom of the file
router.get("/:id", getPatientById);
router.delete("/:id", deletePatient);

export default router;
