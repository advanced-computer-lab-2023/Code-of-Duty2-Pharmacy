import express from "express";
import {
  changePharmacistPassword,
  deletePharmacist,
  getPharmacistById,
  getPharmacistInfo,
  getPharmacists,
  searchPharmacists,
  updatePharmacist
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

// --> Path: /pharmacists/

router.use(authenticateUser);

router.delete("/:id", deletePharmacist);
router.get("/", getPharmacists);
router.get("/:id", getPharmacistById);
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

export default router;
