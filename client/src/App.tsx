import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pharmacist from "./pages/Pharmacist";
import Administrator from "./pages/Administrator";
import Patient from "./pages/Patient";
import PatientRegistration from "./pages/PatientRegistration";
import PharmacistRegistration from "./pages/PharmacistRegistration";
import Home from "./pages/Home";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Pharmacist" element={<Pharmacist />} />
      <Route path="/Administrator" element={<Administrator />} />
      <Route path="/Patient" element={<Patient />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route path="/pharmacist-registration" element={<PharmacistRegistration />} />

    </Routes>
  </BrowserRouter>
);

export default App;
