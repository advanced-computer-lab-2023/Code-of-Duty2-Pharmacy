import { Response } from "express";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import {
  AddPharmacistAWallet,
  authenticateWalletPharmacist,
  getPharmacistWallet,
  performWalletTransaction,
  rechargePharmacistWallet
} from "../../../services/payments/wallets/pharmacists";
import { findPharmacistById } from "../../../services/pharmacists";
import Pharmacist from "../../../models/pharmacists/Pharmacist";

export const doesAPharmacistHaveAWalletHandler = async (req: AuthorizedRequest, res: Response) => {
  const pharmacistId = req.user?.id!;
  const pharmacist = await Pharmacist.findById(pharmacistId).select("wallet");
  if (!pharmacist) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Pharmacist not found" });
  }
  if (!pharmacist.wallet) {
    return res.status(StatusCodes.OK).json({ exists: false });
  }
  return res.status(StatusCodes.OK).json({ exists: true });
};

export const authenticateWalletPharmacistHandler = async (req: AuthorizedRequest, res: Response) => {
  const { pinCode } = req.body;
  try {
    const walletToken = await authenticateWalletPharmacist(req.user?.id!, pinCode);
    res.cookie("walletToken", walletToken, { httpOnly: true, path: "/" });
    res.status(StatusCodes.OK).json({ message: "Wallet is Authenticated successfully" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const getPharmacistWalletHandler = async (req: AuthorizedRequest, res: Response) => {
  const pharmacistId = req.user?.id!;
  try {
    const pharmacistWallet = await getPharmacistWallet(pharmacistId);
    res.status(StatusCodes.OK).json(pharmacistWallet);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const addPharmacistAWalletHandler = async (req: AuthorizedRequest, res: Response) => {
  const pharmacistId = req.user?.id!;
  const { desiredCurrency, pinCode, confirmPinCode } = req.body;
  if (pinCode !== confirmPinCode) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Pin code and confirm pin code don't match" });
  }
  try {
    await AddPharmacistAWallet(pharmacistId, desiredCurrency, pinCode);
    res.status(StatusCodes.OK).json({ message: "Wallet added successfully" });
  } catch (error: any) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const performAWalletTransactionHandler = async (req: AuthorizedRequest, res: Response) => {
  const pharmacistId = req.user?.id!;
  const { transactionAmount } = req.body;
  try {
    await performWalletTransaction(pharmacistId, transactionAmount);
    res.status(StatusCodes.OK).json({ message: "Transaction successful" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const rechargePharmacistWalletHandler = async (req: AuthorizedRequest, res: Response) => {
  const pharmacistId = req.user?.id!;
  const { transactionAmount } = req.body;
  try {
    await rechargePharmacistWallet(pharmacistId, transactionAmount);
    res.status(StatusCodes.OK).json({ message: "Wallet recharged successfully" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
