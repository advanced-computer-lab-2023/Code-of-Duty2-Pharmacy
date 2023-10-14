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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={StyledLink} to="/">
          El7a2ni Pharmacy
        </Typography>
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
