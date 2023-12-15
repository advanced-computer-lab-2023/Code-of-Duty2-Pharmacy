import DoctorLogin from "../../pages/guest/DoctorLogin";
import PatientLogin from "../../pages/guest/PatientLogin";
import PharmacistLogin from "../../pages/guest/PharmacistLogin";
import ForgetPassword from "../../pages/guest/forget-password/ForgetPassword";
import { Route } from "../../types";

export const patientLoginRoute: Route = {
  path: "/login/patient",
  element: <PatientLogin />
};

export const pharmacistLoginRoute: Route = {
  path: "/login/pharmacist",
  element: <PharmacistLogin />
};

export const doctorLoginRoute: Route = {
  path: "/login/doctor",
  element: <DoctorLogin />
};

export const forgetPasswordRoute: Route = {
  path: "/forget-password",
  element: <ForgetPassword />
};

const routes: Route[] = [patientLoginRoute, pharmacistLoginRoute, doctorLoginRoute, forgetPasswordRoute];

export default routes;
