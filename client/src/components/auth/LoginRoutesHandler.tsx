import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";
import { welcomeRoute } from "../../data/routes/guestRoutes";
import { Box, CircularProgress } from "@mui/material";

/**
 * Login routes should only be accessible to unauthenticated users.
 * If a user is already logged in, they should be redirected to the dashboard.
 * This, this handler wraps the login routes to handle this logic.
 */
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
    fromOrWelcome.startsWith("/admin") ? (
      <Navigate to={patientDashboardRoute.path} replace />
    ) : authState.role === UserRole.ADMIN &&
      fromOrWelcome.startsWith("/patient") ? (
      <Navigate to={adminDashboardRoute.path} replace />
    ) : (
      <Navigate to={fromOrWelcome} replace />
    )
  ) : (
    <Outlet />
  );
};

export default LoginRoutesHandler;
