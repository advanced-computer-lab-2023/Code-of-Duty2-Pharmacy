import PatientDashboard from "../../pages/patient/PatientDashboard";
import PatientViewMedicinesPage from "../../pages/patient/PatientViewMedicinesPage";
import { Route } from "../../types";

export const patientDashboardRoute: Route = {
  path: "/patient/dashboard",
  component: <PatientDashboard />,
};

export const viewMedicinesRoute: Route = {
  path: "/patient/view-medicines",
  component: <PatientViewMedicinesPage />,
};

const patientRoutes: Route[] = [patientDashboardRoute, viewMedicinesRoute];

export default patientRoutes;
