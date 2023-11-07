import axios from "axios";
import User from "../../../../types/User";
import config from "../../../../config/config";

export const sendEmailRequest = async (email: string) => {
  return await axios.post(`${config.API_URL}/auth/reset-password-request`, {
    email,
  });
};

export const sendOTPRequest = async (userData: User, otp: string) => {
  return await axios.post(
    `${config.API_URL}/auth/validate-password-reset-info`,
    { userData, otp }
  );
};

export const sendPasswordResetRequest = async (
  password: string,
  confirmPassword: string
) => {
  return await axios.post(
    `${config.API_URL}/auth/reset-password`,
    {
      password,
      confirmPassword,
    },
    { withCredentials: true }
  );
};
