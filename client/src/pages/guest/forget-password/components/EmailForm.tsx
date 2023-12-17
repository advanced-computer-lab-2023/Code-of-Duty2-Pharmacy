import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Ref, forwardRef, useContext, useState } from "react";
import { sendEmailRequest } from "../services/services";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}
const AlertRef = forwardRef(Alert);

interface Props {
  onSubmit: (email: string) => void;
}

const EmailForm: React.FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const { setUserData, setStep, setError } = useContext(ForgetPasswordContext);
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await sendEmailRequest(email);
      setUserData(response.data);
      setError("");
      onSubmit(email);
      setStep(2);
    } catch (error: any) {
      console.log(error);
      // setError(error.response.data?.message);

      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(error.response.data?.message || "Something went wrong!");
    }
  };

  const handleSnackbarClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  return (
    <form onSubmit={handleEmailSubmit}>
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
          <Typography variant="h6" gutterBottom component="div">
            Enter your email address to reset your password:
          </Typography>
          <br />

          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "50vw" }} />

          <Button type="submit" sx={{ width: "10vw" }}>
            Submit
          </Button>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/clinic-pharmacy-21dea.appspot.com/o/files%2Fmedicine-images%2Ff9bc4b08-eda5-4432-9cfd-364ca23b5b50-forgot.png?alt=media&token=dd0bdcd1-9408-4aa5-8d06-ae0dabcaf010"
            alt="verify email icon"
            style={{ width: "25vw", marginLeft: "1.5rem", padding: "1rem", marginTop: "-1rem" }}
          />
        </Box>
      </div>

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
    </form>
  );
};

export default EmailForm;
