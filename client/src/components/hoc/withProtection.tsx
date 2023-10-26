import { ComponentType } from "react";
import ProtectedRoute from "../../components/navigation/ProtectedRoute";
import UserRole from "../../types/enums/UserRole";

const withProtection =
  (role: UserRole) =>
  (Component: ComponentType<any>): ComponentType<any> => {
    const WrappedComponent = (props: any): JSX.Element => (
      <ProtectedRoute
        routeProps={{ path: props.path }}
        element={<Component {...props} />}
        requiredRole={role}
      />
    );

    return WrappedComponent;
  };

export default withProtection;
