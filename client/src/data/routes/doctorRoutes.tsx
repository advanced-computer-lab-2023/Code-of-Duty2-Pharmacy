import DoctorManagePrescriptionsPage from "../../pages/doctor/DoctorManagePrescriptionsPage";
import { Route } from "../../types";

export const doctorManagePrescriptionsRoute: Route = {
  path: "/doctor/manage-prescription/:prescriptionId",
  element: <DoctorManagePrescriptionsPage />
};

const doctorRoutes: Route[] = [doctorManagePrescriptionsRoute];

export default doctorRoutes;
