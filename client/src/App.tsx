import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Switch, FormControlLabel, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { AccountCircle } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";

import logoicon from "./assets/logo.png";

import darkTheme from "./themes/darkTheme";
import lightTheme from "./themes/lightTheme";
import Pharmacist from "./pages/Pharmacist";
import Administrator from "./pages/Administrator";
import Patient from "./pages/Patient";
import PatientRegistration from "./pages/PatientRegistration";
import PharmacistRegistration from "./pages/PharmacistRegistration";
import Home from "./pages/Home";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <AppBar position="sticky">
          <Toolbar>
            <a href="/">
              <img
                src={logoicon}
                alt="Logo"
                style={{ height: "30px", paddingRight: "1rem" }}
              />
            </a>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              El7a2ni Pharmacy
            </Typography>
            <Box style={{ marginLeft: "auto" }}>
              <FormControlLabel
                control={
                  <Switch checked={darkMode} onChange={handleThemeChange} />
                }
                label={darkMode ? <Brightness4 /> : <Brightness7 />}
              />
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pharmacist" element={<Pharmacist />} />
          <Route path="/administrator" element={<Administrator />} />
          <Route path="/patient" element={<Patient />} />
          <Route
            path="/patient-registration"
            element={<PatientRegistration />}
          />
          <Route
            path="/pharmacist-registration"
            element={<PharmacistRegistration />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
