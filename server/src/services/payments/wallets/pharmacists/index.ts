import { addWallet, authenticateWalletUser, getWallet, updateWalletBalance } from "..";
import { UserRole } from "../../../../types";

export const authenticateWalletPharmacist = async (pharmacistId: string, walletPinCode: string) =>
  await authenticateWalletUser(pharmacistId, UserRole.PHARMACIST, walletPinCode);

export const getPharmacistWallet = async (pharmacistId: string) => {
  const wallet = await getWallet(pharmacistId, UserRole.PHARMACIST);
  return wallet;
};

export const AddPharmacistAWallet = async (pharmacistId: string, desiredCurrency: string, pinCode: string) => {
  await addWallet(pharmacistId, UserRole.PHARMACIST, desiredCurrency, pinCode);
};

export const performWalletTransaction = async (pharmacistId: string, transactionAmount: number) => {
  await updatePharmacistWalletBalance(pharmacistId, -transactionAmount);
};

export const rechargePharmacistWallet = async (pharmacistId: string, transactionAmount: number) => {
  await updatePharmacistWalletBalance(pharmacistId, transactionAmount);
};

const updatePharmacistWalletBalance = async (pharmacistId: string, transactionAmount: number) => {
  await updateWalletBalance(pharmacistId, UserRole.PHARMACIST, transactionAmount);
};
