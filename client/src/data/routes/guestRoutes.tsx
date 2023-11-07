import PharmacistRegistration from "../../pages/guest/PharmacistRegistration";
import PatientRegistration from "../../pages/guest/PatientRegistration";
import Welcome from "../../pages/guest/Welcome";
import About from "../../pages/guest/About";
import ContactUs from "../../pages/guest/ContactUs";
import { Route } from "../../types";

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

export const patientRegistrationRoute: Route = {
  path: "/register/patient",
  element: <PatientRegistration />,
};

export const pharmacistRegistrationRoute: Route = {
  path: "/register/pharmacist",
  element: <PharmacistRegistration />,
};

const routes: Route[] = [
  welcomeRoute,
  aboutRoute,
  contactUsRoute,
  patientRegistrationRoute,
  pharmacistRegistrationRoute,
];

export default routes;
