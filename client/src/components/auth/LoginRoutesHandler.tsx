/**
 * This handler ensures login routes are not accessible to already authenticated users.
 *
 * Any login route should be a child of this component, thus forcing any access to a login page
 * to pass by this component first before loading the login page, as login routes should only
 * be accessible to unauthenticated users, and after they log in, they shouldn't be able to
 * access the login pages/routes anymore. If a user is already logged in, they should be redirected
 * to their respective dashboard. Thus, this handler wraps the login routes to enforce this logic.
 *
 * Otherwise, actual redirection after actually logging in with credentials should be handled
 * in the actual login page(s).
 */

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { doctorIntermediaryRoute } from "../../data/routes/doctorRoutes";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";
import { pharmacistDashboardRoute } from "../../data/routes/pharmacistRoutes";
import { pharmacistUnverifiedRoute } from "../../data/routes/unverifiedRoutes";
import { pageNotFoundRoute } from "../../data/routes/generalRoutes";
import UserRole from "../../types/enums/UserRole";

type RoleToRoute = {
  [role in UserRole]?: string;
};

const roleToRoute: RoleToRoute = {
  [UserRole.PATIENT]: patientDashboardRoute.path,
  [UserRole.ADMIN]: adminDashboardRoute.path,
  [UserRole.PHARMACIST]: pharmacistDashboardRoute.path,
  [UserRole.UNVERIFIED_PHARMACIST]: pharmacistUnverifiedRoute.path,
  [UserRole.DOCTOR]: doctorIntermediaryRoute.path
};

const LoginRoutesHandler = () => {
  const { authState } = useContext(AuthContext);
  console.log(authState.isAuthenticated);

  const route = roleToRoute[authState.role] || pageNotFoundRoute.path;

  // <Outlet /> renders the elements of the child routes of this route, which are the login pages
  return authState.isAuthenticated ? <Navigate to={route} replace /> : <Outlet />;
};

export default LoginRoutesHandler;
