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
  component: <Welcome />,
};

export const aboutRoute: Route = {
  path: "/about",
  component: <About />,
};

export const contactUsRoute: Route = {
  path: "/contact-us",
  component: <ContactUs />,
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
  aboutRoute,
  contactUsRoute,
  patientLoginRoute,
  patientRegistrationRoute,
  pharmacistLoginRoute,
  pharmacistRegistrationRoute,
];

export default routes;
