import DoctorIntermediaryRoutingPage from "../../pages/doctor/DoctorIntermediaryRoutingPage";
import DoctorManagePrescriptionsPage from "../../pages/doctor/DoctorManagePrescriptionsPage";
import { Route } from "../../types";

export const doctorManagePrescriptionsRoute: Route = {
  path: "/doctor/manage-prescription/:prescriptionId/:isDependent",
  element: <DoctorManagePrescriptionsPage />
};

export const doctorIntermediaryRoute: Route = {
  path: "/doctor/intermediary-routing",
  element: <DoctorIntermediaryRoutingPage />
};

const doctorRoutes: Route[] = [doctorManagePrescriptionsRoute, doctorIntermediaryRoute];

export default doctorRoutes;
