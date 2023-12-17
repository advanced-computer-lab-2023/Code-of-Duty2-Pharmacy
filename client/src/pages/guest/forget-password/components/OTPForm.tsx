import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { sendOTPRequest } from "../services/services";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const OTPForm = () => {
  const [otp, setOTP] = useState("");
  const { userData, setStep, setError } = useContext(ForgetPasswordContext);
  const navigate = useNavigate();

  const handleOTPSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendOTPRequest(userData, otp);
      setError("");
      setStep(3);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data?.message);
    }
  };

  return (
    <div style={{ padding: "2.0rem" }}>
      <Button startIcon={<ArrowBack />} variant="text" onClick={() => navigate(`/`)}>
        Back To Home
      </Button>
      <Typography my={3} variant="h4" gutterBottom component="div" color="primary">
        Forgot Password
      </Typography>
      <Box
        sx={{
          border: "1px solid #ddd", // Border color
          boxShadow: "0 2px 40px rgba(0, 0, 0, 0.1)", // Box shadow
          padding: "16px", // Adjust padding as needed
          borderRadius: "18px", // Border radius
          gap: 2,
          display: "grid",
          gridTemplateColumns: { md: "1fr 1fr" }
        }}
      >
        <Typography>An OTP is sent to the submitted email if it belongs to a registered user</Typography>
        <br />
        <div>
          <form onSubmit={handleOTPSubmit}>
            <TextField label="OTP" value={otp} onChange={(e) => setOTP(e.target.value)} />
            <Typography variant="caption" gutterBottom component="div" color="primary">
              OTP expires in 10 minutes
            </Typography>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default OTPForm;
