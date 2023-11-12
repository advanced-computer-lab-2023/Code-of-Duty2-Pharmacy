import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";

import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import axios from "axios";
import config from "../../config/config";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { set } from "mongoose";

const ChangePassword = () => {
  const [dashboardRoutePath, setDashboardRoutePath] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { authState } = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const getDashBoardPath = () => {
    switch (authState.role) {
      case UserRole.PATIENT:
        return "/patient/dashboard";
      case UserRole.ADMIN:
        return "/admin/dashboard";
      case UserRole.PHARMACIST:
        return "/pharmacist/dashboard";
      default:
        return "/";
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setGeneralError("");
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setSuccess(false);

    if (oldPassword === "") {
      setOldPasswordError("Old password is required.");
      return;
    }

    if (newPassword === "") {
      setNewPasswordError("New password is required.");
      return;
    }

    if (confirmPassword === "") {
      setConfirmPasswordError("Confirm password is required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setGeneralError("New passwords do not match.");
      return;
    }
    if (oldPassword === newPassword) {
      setGeneralError("New password cannot be the same as old password.");
      return;
    }

    var role = "";
    if (authState.role === UserRole.PATIENT) {
      role = "patients";
      setDashboardRoutePath("/patient/dashboard");
    } else if (authState.role === UserRole.ADMIN) {
      role = "admins";
      setDashboardRoutePath("/admin/dashboard");
    } else if (authState.role === UserRole.PHARMACIST) {
      role = "pharmacists";
      setDashboardRoutePath("/pharmacist/dashboard");
    }

    console.log(dashboardRoutePath);

    const requestBody = {
      currentPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    axios
      .post(`${config.API_URL}/${role}/change-password`, requestBody)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setGeneralError(error.response.data.message);
        } else {
          alert("Something went wrong !");
        }
      });
  };

  return (
    <div>
      <Container maxWidth="xs">
        {/* Your code here */}
        {/* display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="60vh"
        // width="100%" */}
        {/* // style={{ transform: "scale(1.2)" }} */}
        {generalError && <Alert severity="error">{generalError} !</Alert>}{" "}
        {success && (
          <Alert severity="success">
            Password changed successfully !
            <Link
              to={getDashBoardPath()}
              style={{
                // color: theme.palette.primary.main,
                display: "inline-block",
                padding: "5px 10px",
                borderRadius: "4px",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
            >
              Go to home
            </Link>{" "}
          </Alert>
        )}
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginTop: "30px", textAlign: "center" }}
        >
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="block">
            <TextField
              fullWidth
              label="Old Password"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              margin="normal"
              error={oldPasswordError !== ""}
              helperText={oldPasswordError !== "" ? oldPasswordError : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box display="block">
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              margin="normal"
              error={newPasswordError !== ""}
              helperText={newPasswordError !== "" ? newPasswordError : " "}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box display="block">
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError !== ""}
              helperText={
                confirmPasswordError !== "" ? confirmPasswordError : " "
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box display="block">
            <Button
              style={{ marginTop: "20px" }}
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
        {/* </Box> */}
      </Container>
    </div>
  );
};

export default ChangePassword;
