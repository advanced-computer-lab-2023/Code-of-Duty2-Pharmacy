import PatientCheckoutPage from "../../pages/patient/PatientCheckoutPage";
import PatientDashboard from "../../pages/patient/PatientDashboard";
import PatientViewMedicinesPage from "../../pages/patient/PatientViewMedicinesPage";
import { Route } from "../../types";

export const patientDashboardRoute: Route = {
  path: "/patient/dashboard",
  element: <PatientDashboard />,
};

export const viewMedicinesRoute: Route = {
  path: "/patient/view-medicines",
  element: <PatientViewMedicinesPage />,
};

export const checkoutRoute: Route = {
  path: "/patient/checkout",
  element: <PatientCheckoutPage />,
};

const patientRoutes: Route[] = [
  patientDashboardRoute,
  viewMedicinesRoute,
  checkoutRoute,
];

export default patientRoutes;