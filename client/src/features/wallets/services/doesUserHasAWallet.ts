import axios from "axios";
import config from "../../../config/config";

export function doesUserHasAWallet(walletExistsRoute: string) {
  return async () => {
    const response = await axios.get(`${config.API_URL}${walletExistsRoute}`);
    const { exists }: { exists: boolean } = response.data;
    return exists;
  };
}
