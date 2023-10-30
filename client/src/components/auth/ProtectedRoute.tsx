import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import UserRole from "../../types/enums/UserRole";
import {
  patientLoginRoute,
  pharmacistLoginRoute,
} from "../../data/routes/guestRoutes";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

interface Props {
  role: UserRole;
}

// TODO: Fix this navigation spaghetti messed up logic !!!
const ProtectedRoute: React.FC<Props> = ({ role }) => {
  const { authState, refreshAuth } = useContext(AuthContext);
  const patientLoginPath = patientLoginRoute.path;
  const pharmacistLoginPath = pharmacistLoginRoute.path;
  const [isLoading, setIsLoading] = useState(false); // TODO: Change to true when auth is fully implemented

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
    <Navigate to={`${patientLoginPath}`} />
  ) : (
    <Navigate to={`${pharmacistLoginPath}`} />
  );
};

export default ProtectedRoute;
