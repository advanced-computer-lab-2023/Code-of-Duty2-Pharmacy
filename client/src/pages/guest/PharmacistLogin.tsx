import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { pharmacistRegistrationRoute, welcomeRoute } from "../../data/routes/guestRoutes";
import pharmacistImage from "../../assets/pharmacist.jpg";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import UserRole from "../../types/enums/UserRole";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AlertTitle } from "@mui/material";
import { pharmacistDashboardRoute } from "../../data/routes/pharmacistRoutes";
import axios from "axios";
import config from "../../config/config";
import { forgetPasswordRoute } from "../../data/routes/loginRoutes";
import { pharmacistUnverifiedRoute } from "../../data/routes/unverifiedRoutes";
import { UserContext } from "../../contexts/UserContext";
import { LoginResponse } from "../../types/LoginResponse";
import { establishSocketConnection } from "../../services/Socket";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />
));

export default function PharmacistLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showInvalidLoginAlert, setShowInvalidLoginAlert] = useState(false);
  const location = useLocation();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const fromOrWelcome = location.state?.from?.pathname || welcomeRoute.path;

  function storePharmacistInfo(data: LoginResponse) {
    setUser(
      data.info
        ? {
            id: data.info.id,
            name: data.info.name,
            email: data.info.email,
            role: "PHARMACIST",
            photoUrl: data.info.imageUrl
          }
        : null
    );
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUsernameError(false);
    setPasswordError(false);
    setShowInvalidLoginAlert(false);

    if (username === "") {
      setUsernameError(true);
      return;
    }

    if (password === "") {
      setPasswordError(true);
      return;
    }

    try {
      const response = await axios.post(`${config.API_URL}/auth/pharmacist-login`, {
        username,
        password
      });

      const data = response.data;
      login(data.accessToken, data.role);
      storePharmacistInfo(data);
      establishSocketConnection(data.accessToken, data.info!.id);

      if (data.role === UserRole.UNVERIFIED_PHARMACIST) {
        navigate(pharmacistUnverifiedRoute.path);
      } else if (data.role === UserRole.PHARMACIST && fromOrWelcome.startsWith("/pharmacist")) {
        navigate(fromOrWelcome);
      } else if (data.role === UserRole.PHARMACIST) {
        navigate(pharmacistDashboardRoute.path);
      }
    } catch (error) {
      setShowInvalidLoginAlert(true);
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ pb: 6 }}>
      <Grid container columnSpacing={7}>
        <Grid item xs={12} md={6}>
          <img
            src={pharmacistImage}
            alt="Pharmacist"
            style={{
              width: "100%",
              marginTop: "3.5rem",
              boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0px rgba(0, 0, 0, 0.19)"
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Button onClick={() => navigate(welcomeRoute.path)} sx={{ mb: 5, fontSize: "1.2rem" }}>
              Back to Home
            </Button>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {showInvalidLoginAlert && (
              <Alert
                variant="outlined"
                severity="error"
                sx={{ mt: 4, mb: 2 }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShowInvalidLoginAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Oops!</AlertTitle>
                Something's wrong with your credentials — <strong>please make sure they're correct!</strong>
              </Alert>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Pharmacist Username"
                name="username"
                placeholder="Enter your pharmacist account's username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={usernameError}
                helperText={usernameError ? "Username is required" : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Enter your password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError ? "Password is required" : ""}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* TODO: Add Forgot password href here but use Navigate instead */}
                  <NavLink to={forgetPasswordRoute.path} style={{ color: "inherit" }}>
                    Forgot password?
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to={pharmacistRegistrationRoute.path} style={{ color: "inherit" }}>
                    Don't have an account? Sign Up
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
