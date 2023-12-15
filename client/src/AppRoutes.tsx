import { Routes, Route } from "react-router-dom";
import LoginRoutesHandler from "./components/auth/LoginRoutesHandler";
import ProtectedRoutesHandler from "./components/auth/ProtectedRoutesHandler";
import PublicRoutesHandler from "./components/auth/PublicRoutesHandler";
import UnverifiedRoutesHandler from "./components/auth/UnverifiedRoutesHandler";
import adminRoutes from "./data/routes/adminRoutes";
import generalRoutes from "./data/routes/generalRoutes";
import guestRoutes from "./data/routes/guestRoutes";
import loginRoutes from "./data/routes/loginRoutes";
import patientRoutes from "./data/routes/patientRoutes";
import pharmacistRoutes from "./data/routes/pharmacistRoutes";
import unverifiedRoutes from "./data/routes/unverifiedRoutes";
import Layout from "./layouts/Layout";
import UserRole from "./types/enums/UserRole";
import doctorRoutes from "./data/routes/doctorRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<LoginRoutesHandler />}>
        {loginRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route element={<UnverifiedRoutesHandler />}>
        {unverifiedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route element={<PublicRoutesHandler />}>
        {generalRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.element} />;
        })}

        {guestRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>} />
        ))}
      </Route>

      <Route element={<ProtectedRoutesHandler role={UserRole.ADMIN} />}>
        {adminRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>} />
        ))}
      </Route>

      <Route element={<ProtectedRoutesHandler role={UserRole.PATIENT} />}>
        {patientRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>} />
        ))}
      </Route>

      <Route element={<ProtectedRoutesHandler role={UserRole.PHARMACIST} />}>
        {pharmacistRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>} />
        ))}
      </Route>

      <Route element={<ProtectedRoutesHandler role={UserRole.DOCTOR} />}>
        {doctorRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>} />
        ))}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
