import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import {
  patientLoginRoute,
  pharmacistLoginRoute,
} from "../../data/routes/loginRoutes";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";

interface Props {
  role: UserRole;
}

const ProtectedRoutesHandler: React.FC<Props> = ({ role }) => {
  const { authState, refreshAuth } = useContext(AuthContext);
  const patientLoginPath = patientLoginRoute.path;
  const pharmacistLoginPath = pharmacistLoginRoute.path;
  // TODO: Change to true when auth is fully implemented
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

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
  ) : authState.isAuthenticated && role === authState.role ? (
    <Outlet />
  ) : role === UserRole.ADMIN || role === UserRole.PATIENT ? (
    <Navigate to={`${patientLoginPath}`} state={{ from: location }} replace />
  ) : (
    <Navigate
      to={`${pharmacistLoginPath}`}
      state={{ from: location }}
      replace
    />
  );
};

export default ProtectedRoutesHandler;
