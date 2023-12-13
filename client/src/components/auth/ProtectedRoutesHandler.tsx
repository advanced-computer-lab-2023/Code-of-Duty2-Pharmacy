import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { doctorLoginRoute, patientLoginRoute, pharmacistLoginRoute } from "../../data/routes/loginRoutes";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";

interface Props {
  role: UserRole;
}

const ProtectedRoutesHandler: React.FC<Props> = ({ role }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { authState, refreshAuth } = useContext(AuthContext);
  const location = useLocation();

  const patientLoginPath = patientLoginRoute.path;
  const doctorLoginPath = doctorLoginRoute.path;
  const pharmacistLoginPath = pharmacistLoginRoute.path;

  useEffect(() => {
    const checkAuth = async () => {
      if (!authState.isAuthenticated) {
        await refreshAuth();
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [authState.isAuthenticated, authState.accessToken, authState.role]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (authState.isAuthenticated && role === authState.role) {
    return <Outlet />;
  }

  if (role === UserRole.ADMIN || role === UserRole.PATIENT) {
    return <Navigate to={`${patientLoginPath}`} state={{ from: location }} replace />;
  }

  if (role === UserRole.DOCTOR) {
    return <Navigate to={`${doctorLoginPath}`} state={{ from: location }} replace />;
  }

  return <Navigate to={`${pharmacistLoginPath}`} state={{ from: location }} replace />;
};

export default ProtectedRoutesHandler;
