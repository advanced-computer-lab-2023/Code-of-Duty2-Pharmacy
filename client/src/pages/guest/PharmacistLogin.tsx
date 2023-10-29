import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { pharmacistRegistrationRoute } from "../../data/routes/guestRoutes";
import { NavLink, useNavigate } from "react-router-dom";
import pharmacistImage from "../../assets/pharmacist.jpg";

export default function PharmacistLogin() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO: Handle login here...
  };

  return (
    <Container component="main" maxWidth="lg">
      <Grid container columnSpacing={7}>
        <Grid item xs={12} md={6}>
          <img
            src={pharmacistImage}
            alt="El7a2ni Logo"
            style={{
              width: "100%",
              marginTop: "3.5rem",
              boxShadow:
                "0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0px rgba(0, 0, 0, 0.19)",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/")}
              sx={{ mb: 5, fontSize: "1.2rem" }}
            >
              Back to Home
            </Button>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* TODO: Add Forgot password href here */}
                  <NavLink to="/" style={{ color: "inherit" }}>
                    Forgot password?
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink
                    to={pharmacistRegistrationRoute.path}
                    style={{ color: "inherit" }}
                  >
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
