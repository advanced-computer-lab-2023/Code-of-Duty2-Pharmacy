import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Ref, forwardRef, useContext, useState } from "react";
import { sendOTPRequest } from "../services/services";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "../../../../components/others/CountDownTimer";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import axios from "axios";
import config from "../../../../config/config";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}
const AlertRef = forwardRef(Alert);

interface Props {
  email: string;
}

const OTPForm: React.FC<Props> = ({ email }) => {
  const [otp, setOTP] = useState("");
  const { userData, setStep, setError } = useContext(ForgetPasswordContext);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");

  const handleOTPSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendOTPRequest(userData, otp);
      setError("");
      setStep(3);
    } catch (error: any) {
      console.log(error);
      // setError(error.response.data?.message);
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Something went wrong!");
    }
  };

  const handleSnackbarClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleTokenExpire = async () => {
    setSnackbarOpen(true);
    setSnackbarSeverity("error");
    setSnackbarMessage("OTP expired!");
    setStep(1);
    if (email === "") return;
    await axios.delete(`${config.API_URL}/auth/delete-password-reset-info`, { data: { email: email } });
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
              OTP expires in <CountdownTimer initialSeconds={20} whenTimeIsUp={handleTokenExpire} />
            </Typography>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AlertRef onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </AlertRef>
      </Snackbar>
    </div>
  );
};

export default OTPForm;
