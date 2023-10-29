import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import UserRole from "../../types/enums/UserRole";
import { patientLoginRoute } from "../../data/routes/guestRoutes";

interface Props {
  role: UserRole;
}

const ProtectedRoute: React.FC<Props> = ({ role }) => {
  const { authState } = useContext(AuthContext);
  const loginPath = patientLoginRoute.path;

  console.log("authState:", authState);

  return authState.isAuthenticated && authState.role === role ? (
    <Outlet />
  ) : (
    <Navigate to={`${loginPath}`} />
  );
};

export default ProtectedRoute;
