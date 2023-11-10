import { Route } from "../../types";

export const pharmacistUnverifiedRoute: Route = {
  path: "/verify/pharmacist",
  element: <div>Pharmacist Verify</div>,
};

const unverifiedRoutes: Route[] = [pharmacistUnverifiedRoute];

export default unverifiedRoutes;
