import { Routes, Route } from "react-router-dom";

import PharmacistLayout from "./layouts/PharmacistLayout";
import AdministratorLayout from "./layouts/AdministratorLayout";
import PatientLayout from "./layouts/PatientLayout";
import PatientRegistration from "./pages/PatientRegistration";
import PharmacistRegistration from "./pages/PharmacistRegistration";
import Welcome from "./pages/Welcome";
import PatientDashboard from "./pages/patient/PatientDashboard";
import AdministratorDashboard from "./pages/admin/AdministratorDashboard";
import PharmacistDashboard from "./pages/pharmacist/PharmacistDashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route
        path="/pharmacist"
        element={
          <PharmacistLayout>
            <PharmacistDashboard />
          </PharmacistLayout>
        }
      />
      <Route
        path="/administrator"
        element={
          <AdministratorLayout>
            <AdministratorDashboard />
          </AdministratorLayout>
        }
      />
      <Route
        path="/patient"
        element={
          <PatientLayout>
            <PatientDashboard />
          </PatientLayout>
        }
      />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route
        path="/pharmacist-registration"
        element={<PharmacistRegistration />}
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
