import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";

import Pharmacist from "./pages/Pharmacist";
import Administrator from "./pages/Administrator";
import Patient from "./pages/Patient";
import PatientRegistration from "./pages/PatientRegistration";
import PharmacistRegistration from "./pages/PharmacistRegistration";
import Home from "./pages/Home";
import IconButton from "@mui/material/IconButton";
import { AccountCircle } from "@mui/icons-material";
import logoicon from "./assets/logo.png";

const StyledLink = styled(Link)({
  color: "white",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
  },
});

const App = () => (
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
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          style={{ marginLeft: "auto" }}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pharmacist" element={<Pharmacist />} />
      <Route path="/administrator" element={<Administrator />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route
        path="/pharmacist-registration"
        element={<PharmacistRegistration />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
