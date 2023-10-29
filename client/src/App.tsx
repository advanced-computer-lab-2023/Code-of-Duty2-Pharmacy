import { Routes, Route } from "react-router-dom";

import guestRoutes from "./data/routes/guestRoutes";
import patientRoutes from "./data/routes/patientRoutes";
import pharmacistRoutes from "./data/routes/pharmacistRoutes";
import adminRoutes from "./data/routes/adminRoutes";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserRole from "./types/enums/UserRole";
import Layout from "./layouts/Layout";
import generalRoutes from "./data/routes/generalRoutes";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

const App = () => {
  const { authState } = useContext(AuthContext);
  return (
    <Routes>
      {generalRoutes.map((route, index) => {
        console.log("authState:", authState);
        return <Route key={index} path={route.path} element={route.element} />;
      })}

      {guestRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<Layout>{route.element}</Layout>}
        />
      ))}

      <Route element={<ProtectedRoute role={UserRole.ADMIN} />}>
        {adminRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        ))}
      </Route>

      <Route element={<ProtectedRoute role={UserRole.PATIENT} />}>
        {patientRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        ))}
      </Route>

      <Route element={<ProtectedRoute role={UserRole.PHARMACIST} />}>
        {pharmacistRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
