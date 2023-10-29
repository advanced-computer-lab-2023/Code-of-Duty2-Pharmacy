import PharmacistRegistration from "../../pages/guest/PharmacistRegistration";
import PatientRegistration from "../../pages/guest/PatientRegistration";
import PharmacistLogin from "../../pages/guest/PharmacistLogin";
import PatientLogin from "../../pages/guest/PatientLogin";
import Welcome from "../../pages/guest/Welcome";
import About from "../../pages/guest/About";
import { Route } from "../../types";
import ContactUs from "../../pages/guest/ContactUs";

export const welcomeRoute: Route = {
  path: "/",
  element: <Welcome />,
};

export const aboutRoute: Route = {
  path: "/about",
  element: <About />,
};

export const contactUsRoute: Route = {
  path: "/contact-us",
  element: <ContactUs />,
};

export const patientLoginRoute: Route = {
  path: "/login/patient",
  element: <PatientLogin />,
};

export const patientRegistrationRoute: Route = {
  path: "/register/patient",
  element: <PatientRegistration />,
};

export const pharmacistLoginRoute: Route = {
  path: "/login/pharmacist",
  element: <PharmacistLogin />,
};

export const pharmacistRegistrationRoute: Route = {
  path: "/register/pharmacist",
  element: <PharmacistRegistration />,
};

const routes: Route[] = [
  welcomeRoute,
  aboutRoute,
  contactUsRoute,
  patientLoginRoute,
  patientRegistrationRoute,
  pharmacistLoginRoute,
  pharmacistRegistrationRoute,
];

export default routes;
