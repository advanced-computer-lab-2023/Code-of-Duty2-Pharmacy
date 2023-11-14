import { CreateWalletParams } from "../../../types/CreateWalletParams";
import config from "../../../config/config";
import axios from "axios";

export function createNewWallet(createNewWalletRoute: string) {
  return async (newWallet: CreateWalletParams) => {
    await axios.post(`${config.API_URL}${createNewWalletRoute}`, newWallet);
  };
}
