import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { sendPasswordResetRequest } from "../services/services";
import { Ref, forwardRef, useContext, useState } from "react";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}
const AlertRef = forwardRef(Alert);

const PasswordResetForm = () => {
  const { setError } = useContext(ForgetPasswordContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        // setError("Passwords do not match");
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage("Passwords do not match");
        return;
      }
      await sendPasswordResetRequest(password, confirmPassword);
      setError("");
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
        <Typography variant="h6" gutterBottom component="div">
          Enter your new password
        </Typography>
        <br />
        <form onSubmit={handlePasswordSubmit}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ width: "50vw", paddingBottom: "1.0rem" }}
          />
          <br />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            style={{ width: "50vw", paddingBottom: "1.0rem" }}
          />
          <br />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
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

export default PasswordResetForm;
