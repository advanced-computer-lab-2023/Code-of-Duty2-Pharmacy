import PatientCartReviewPage from "../../pages/patient/PatientCartReviewPage";
import PatientCheckoutPage from "../../pages/patient/PatientCheckoutPage";
import PatientDashboard from "../../pages/patient/PatientDashboard";
import PatientViewOrdersPage from "../../pages/patient/PatientViewOrdersPage";
import PatientViewMedicinesPage from "../../pages/patient/PatientViewMedicinesPage";
import ChangePasswordPage from "../../pages/common/ChangePasswordPage";
import { Route } from "../../types";

export const patientDashboardRoute: Route = {
  path: "/patient/dashboard",
  element: <PatientDashboard />,
};

export const viewMedicinesRoute: Route = {
  path: "/patient/view-medicines",
  element: <PatientViewMedicinesPage />,
};

export const cartReviewRoute: Route = {
  path: "/patient/review-cart",
  element: <PatientCartReviewPage />,
};

export const viewOrdersRoute: Route = {
  path: "/patient/view-orders",
  element: <PatientViewOrdersPage />,
};

export const checkoutRoute: Route = {
  path: "/patient/checkout",
  element: <PatientCheckoutPage />,
};

export const changePatientPasswordsRoute: Route = {
  path: "/patient/change-password",
  element: <ChangePasswordPage />,
};

const patientRoutes: Route[] = [
  patientDashboardRoute,
  viewMedicinesRoute,
  cartReviewRoute,
  viewOrdersRoute,
  checkoutRoute,
  changePatientPasswordsRoute,
];

export default patientRoutes;
