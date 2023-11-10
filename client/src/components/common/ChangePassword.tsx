import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import zxcvbn from "zxcvbn";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import axios from "axios";
import config from "../../config/config";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";
import { url } from "inspector";
import { link } from "fs";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [newPasswordStrength, setNewPasswordStrength] = useState(0);
  const [confirmPasswordStrength, setConfirmPasswordStrength] = useState(0);

  const { authState } = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setGeneralError("");
    if (newPassword !== confirmPassword) {
      setGeneralError("New passwords do not match.");
      return;
    }

    var role = "";
    if (authState.role === UserRole.PATIENT) {
      role = "patients";
    } else if (authState.role === UserRole.ADMIN) {
      role = "admins";
    } else if (authState.role === UserRole.PHARMACIST) {
      role = "pharmacists";
    }

    const requestBody = {
      currentPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
     const url = `${config.API_URL}/${role}/change-password`;
     console.log(234);
     console.log(url);
    axios
      .post(url, requestBody)
      .then((response) => {
        // navigate("http://localhost:5173/patient/dashboard");
      })
      .catch((error) => {
        if(error.response && error.response.data && error.response.data.message){
        alert(error.response.data.message);
        }
        
      });
    // axios
    //   .post(`${config.API_URL}/${role}/change-password`, requestBody)
    //   .then((response) => {
    //     if (response.data.error) {
    //       throw new Error(response.data.message);
    //     }
    //     alert("Password changed successfully!");
    //     navigate("http://localhost:5173/patient/dashboard");
    //   })
    //   .catch((error) => {
    //     alert("An error occurred while changing the password.");
    //     if (error.response && error.response.data) {
    //       const message = error.response.data.message;
    //       alert(message);
    //     }
    //   });
  };

  return (
    <div>
      <Box display="flex" flexDirection="column">
        {generalError && <Alert severity="error">{generalError} !</Alert>}{" "}
        <Typography variant="h5" gutterBottom style={{ marginLeft: "16px" }}>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="block">
            <TextField
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              margin="normal"
              style={{ marginLeft: "16px" }}
            />
          </Box>
          <Box display="block">
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setNewPasswordStrength(zxcvbn(e.target.value).score);
              }}
              margin="normal"
              style={{ marginLeft: "16px" }}
            />
          </Box>
          <Box display="block">
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordStrength(zxcvbn(e.target.value).score);
              }}
              margin="normal"
              style={{ marginLeft: "16px" }}
            />
          </Box>
          <Box display="block" width="200px">
            <Button
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{ marginTop: "16px", marginLeft: "16px" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      {/* <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Password changed successfully!"
      />
      <Snackbar
        open={!!generalError}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={generalError}
      /> */}
    </div>
  );
};

export default ChangePassword;
