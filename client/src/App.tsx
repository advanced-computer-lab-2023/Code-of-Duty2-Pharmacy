import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pharmacist from "./pages/Pharmacist";
import Administrator from "./pages/Administrator";
import Patient from "./pages/Patient";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/pharmacist" element={<Pharmacist />} />
      <Route path="/admin" element={<Administrator />} />
      <Route path="/patient" element={<Patient />} />
    </Routes>
  </BrowserRouter>
);

export default App;
