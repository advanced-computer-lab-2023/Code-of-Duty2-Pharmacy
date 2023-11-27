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
// import { patientDashboardRoute } from '../../data/routes/patientRoutes';
// import { adminDashboardRoute } from '../../data/routes/adminRoutes';
// import { pharmacistDashboardRoute } from '../../data/routes/pharmacistRoutes';

interface ChangePasswordProps {
  dashBoardpath: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ dashBoardpath }) => {
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

  // const getDashBoardPath = () => {
  //   switch (authState.role) {
  //     case UserRole.PATIENT:
  //       return patientDashboardRoute.path;
  //     case UserRole.ADMIN:
  //       return adminDashboardRoute.path;
  //     case UserRole.PHARMACIST:
  //       return pharmacistDashboardRoute.path;
  //     default:
  //       return "/";
  //   }
            
  // };
  const getRole = () => {
    switch (authState.role) {
      case UserRole.PATIENT:
        return "patients";
      case UserRole.ADMIN:
        return "admins";
      case UserRole.PHARMACIST:
        return "pharmacists";
      default:
        return "";
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
    
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      setNewPasswordError("Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.");
      return; 
    }


    const requestBody = {
      currentPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    const role = getRole();
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
          alert("Something went wrong");
        }
      });
  };

  return (
    <div>
      <Container maxWidth="xs">
        {generalError && <Alert severity="error">{generalError} !</Alert>}{" "}
        {success && (
          <Alert severity="success">
            Password changed successfully !
            <Link
              to={dashBoardpath}
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
