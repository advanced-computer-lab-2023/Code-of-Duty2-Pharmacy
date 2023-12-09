import React, { useState } from "react";
import axios from "axios";

import config from "../../config/config";
import { Alert, Box, Button, Container, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const AddAdminForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsernameErrorMessage("");
    setPasswordError(false);
    setShowSuccessAlert(false);

    const requestBody = {
      username,
      password
    };
    if (username === "") {
      setUsernameErrorMessage("Username is required");
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }

    setIsLoading(true);
    axios
      .post(`${config.API_URL}/admins`, requestBody)
      .then((_response) => {
        setShowSuccessAlert(true);
        // alert("Admin added successfully!");
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          setUsernameErrorMessage(error.response.data.message);
        } else {
          alert("An error occurred while adding the admin.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container maxWidth="xs">
      {showSuccessAlert && (
        <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
          Admin <strong>{username}</strong> added successfully!
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Add Admin </h1>
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          placeholder="Enter username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={usernameErrorMessage !== ""}
          helperText={usernameErrorMessage !== "" ? usernameErrorMessage : ""}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          error={passwordError}
          helperText={passwordError ? "Password is required" : ""}
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
            )
          }}
        />
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isLoading}>
            Add Admin
          </LoadingButton>
        </Box>
      </form>
    </Container>
  );
};

export default AddAdminForm;
