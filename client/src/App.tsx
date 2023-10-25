import { Routes, Route, useLocation } from "react-router-dom";

import PharmacistDashboard from "./pages/pharmacist/PharmacistDashboard";
import AdministratorDashboard from "./pages/admin/AdministratorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientRegistration from "./pages/register/PatientRegistration";
import PharmacistRegistration from "./pages/register/PharmacistRegistration";
import Welcome from "./pages/Welcome";
import Navbar from "./components/navigation/Navbar";
import Sidebar from "./components/navigation/Sidebar";

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <Navbar /> : <Sidebar />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/pharmacist" element={<PharmacistDashboard />} />
        <Route path="/administrator" element={<AdministratorDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route
          path="/pharmacist-registration"
          element={<PharmacistRegistration />}
        />
      </Routes>
    </>
  );
};

export default App;
