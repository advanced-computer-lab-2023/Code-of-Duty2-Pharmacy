import axios from "axios";
import config from "../../config/config";

export const getPatientWallet = async () => {
  const response = await axios.get(`${config.API_URL}/patients/wallet`);
  return response.data;
};
