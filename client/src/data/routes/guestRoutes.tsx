import PharmacistRegistration from "../../pages/registration/PharmacistRegistration";
import PatientRegistration from "../../pages/registration/PatientRegistration";
import PharmacistLogin from "../../pages/login/PharmacistLogin";
import PatientLogin from "../../pages/login/PatientLogin";
import Welcome from "../../pages/Welcome";
import { Route } from "../../types";

export const welcomeRoute: Route = {
  path: "/",
  component: <Welcome />,
};

export const patientLoginRoute: Route = {
  path: "/login/patient",
  component: <PatientLogin />,
};

export const patientRegistrationRoute: Route = {
  path: "/register/patient",
  component: <PatientRegistration />,
};

export const pharmacistLoginRoute: Route = {
  path: "/login/pharmacist",
  component: <PharmacistLogin />,
};

export const pharmacistRegistrationRoute: Route = {
  path: "/register/pharmacist",
  component: <PharmacistRegistration />,
};

const routes: Route[] = [
  welcomeRoute,
  patientLoginRoute,
  patientRegistrationRoute,
  pharmacistLoginRoute,
  pharmacistRegistrationRoute,
];

export default routes;
