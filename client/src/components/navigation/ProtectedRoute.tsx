import { Route, Navigate } from "react-router-dom";
import { RouteProps } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import UserRole from "../../types/enums/UserRole";
import { patientLoginRoute } from "../../data/routes/guestRoutes";

interface ProtectedRouteProps {
  routeProps: RouteProps;
  element: React.ReactElement;
  requiredRole: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  requiredRole,
  routeProps,
}) => {
  const { authState } = useContext(AuthContext);
  const loginPath = patientLoginRoute.path;

  if (!authState.isAuthenticated || authState.role !== requiredRole)
    return <Navigate to={`${loginPath}`} replace />;

  return <Route {...routeProps} element={element} />;
};

export default ProtectedRoute;
