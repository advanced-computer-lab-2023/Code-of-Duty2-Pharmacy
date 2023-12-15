import axios from "axios";
import config from "../../config/config";

// TODO:
// This file seems unused; delete this file.
// Also, move the wallet pages under their respective patient and pharmacist folders,
// but BEWARE that causes some breaking circular dependency that must be tackled if you do so.
export const getPatientWallet = async () => {
  const response = await axios.get(`${config.API_URL}/patients/wallet`);
  return response.data;
};
