/**
 *
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
 *
 */

import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";
import { welcomeRoute } from "../../data/routes/guestRoutes";
import { Box, CircularProgress } from "@mui/material";
import { pharmacistDashboardRoute } from "../../data/routes/pharmacistRoutes";
import UserRole from "../../types/enums/UserRole";

const LoginRoutesHandler = () => {
  const { authState, refreshAuth } = useContext(AuthContext);
  // TODO: Change to true when auth is fully implemented
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const fromOrWelcome = location.state?.from?.pathname || welcomeRoute.path;

  useEffect(() => {
    const checkAuth = async () => {
      if (!authState.isAuthenticated) {
        await refreshAuth();
      }

      setIsLoading(false);
    };

    // TODO: Uncomment this line when auth is fully implemented
    //checkAuth();
  }, [
    authState.isAuthenticated,
    authState.accessToken,
    authState.role,
    refreshAuth,
  ]);

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : authState.isAuthenticated ? (
    authState.role === UserRole.PATIENT &&
    !fromOrWelcome.startsWith("/admin") &&
    !fromOrWelcome.startsWith("/pharmacist") ? (
      <Navigate to={patientDashboardRoute.path} replace />
    ) : authState.role === UserRole.ADMIN &&
      !fromOrWelcome.startsWith("/patient") &&
      !fromOrWelcome.startsWith("/pharmacist") ? (
      <Navigate to={adminDashboardRoute.path} replace />
    ) : authState.role === UserRole.PHARMACIST &&
      !fromOrWelcome.startsWith("/patient") &&
      !fromOrWelcome.startsWith("/admin") ? (
      <Navigate to={pharmacistDashboardRoute.path} replace />
    ) : (
      <Navigate to={fromOrWelcome} replace />
    )
  ) : (
    <Outlet />
  );
};

export default LoginRoutesHandler;
