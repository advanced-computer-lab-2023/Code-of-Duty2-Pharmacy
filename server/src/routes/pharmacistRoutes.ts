import express from "express";
import {
  changePharmacistPassword,
  deletePharmacist,
  getPharmacistById,
  getPharmacistInfo,
  getPharmacists,
  searchPharmacists,
  updatePharmacist,
  getAllNotifications
} from "../controllers/pharmacistController";
import {
  addPharmacistAWalletHandler,
  authenticateWalletPharmacistHandler,
  doesAPharmacistHaveAWalletHandler,
  getPharmacistWalletHandler,
  performAWalletTransactionHandler,
  rechargePharmacistWalletHandler
} from "../controllers/payments/wallets/Pharmacist";
import { authenticateWalletUser } from "../middlewares/walletAuthentication";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);

// --> Path: /pharmacists/

router.get("/", getPharmacists);
router.get("/search", searchPharmacists);
router.post("/change-password", changePharmacistPassword);
router.get("/me/complete-info", getPharmacistInfo);
router.patch("/me/complete-info", updatePharmacist);

router.get("/wallets/exists", doesAPharmacistHaveAWalletHandler);
router.post("/validate-wallet-pin-code", authenticateWalletPharmacistHandler);
router.post("/wallets", addPharmacistAWalletHandler);
router.get("/wallets", authenticateWalletUser, getPharmacistWalletHandler);
router.patch("/wallet-transactions", performAWalletTransactionHandler);
router.patch("/wallet-recharge", rechargePharmacistWalletHandler);

router.get("/notifications", getAllNotifications);

// WARNING: Keep these routes at the bottom of the file
router.get("/:id", getPharmacistById);
router.delete("/:id", deletePharmacist);

export default router;
