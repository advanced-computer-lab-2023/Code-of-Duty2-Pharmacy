import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import darkTheme from "./themes/darkTheme";
import lightTheme from "./themes/lightTheme";
import Pharmacist from "./pages/Pharmacist";
import Administrator from "./pages/Administrator";
import Patient from "./pages/Patient";
import PatientRegistration from "./pages/PatientRegistration";
import PharmacistRegistration from "./pages/PharmacistRegistration";
import Welcome from "./pages/Welcome";
import Navbar from "./components/Navbar";

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
        <Navbar darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Routes>
          <Route path="/" element={<Welcome />} />
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
