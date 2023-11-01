import PatientLogin from "../../pages/guest/PatientLogin";
import PharmacistLogin from "../../pages/guest/PharmacistLogin";
import { Route } from "../../types";

export const patientLoginRoute: Route = {
  path: "/login/patient",
  element: <PatientLogin />,
};

export const pharmacistLoginRoute: Route = {
  path: "/login/pharmacist",
  element: <PharmacistLogin />,
};

const routes: Route[] = [patientLoginRoute, pharmacistLoginRoute];

export default routes;
