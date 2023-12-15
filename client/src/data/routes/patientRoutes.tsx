import PatientCartReviewPage from "../../pages/patient/PatientCartReviewPage";
import PatientCheckoutPage from "../../pages/patient/PatientCheckoutPage";
import PatientDashboard from "../../pages/patient/PatientDashboard";
import PatientViewOrdersPage from "../../pages/patient/PatientViewOrdersPage";
import PatientViewMedicinesPage from "../../pages/patient/PatientViewMedicinesPage";
import { Route } from "../../types";
import PatientViewWalletPage from "../../pages/wallet/PatientViewWalletPage";
import PatientCreateWalletPage from "../../pages/wallet/PatientCreateWalletPage";
import PatientChangePasswordPage from "../../pages/patient/PatientChangePasswordPage";
import PatientPrescriptionsPage from "../../pages/patient/PatientPrescriptionsPage";

export const patientDashboardRoute: Route = {
  path: "/patient/dashboard",
  element: <PatientDashboard />
};

export const viewMedicinesRoute: Route = {
  path: "/patient/view-medicines",
  element: <PatientViewMedicinesPage />
};

export const cartReviewRoute: Route = {
  path: "/patient/review-cart",
  element: <PatientCartReviewPage />
};

export const viewOrdersRoute: Route = {
  path: "/patient/view-orders",
  element: <PatientViewOrdersPage />
};

export const checkoutRoute: Route = {
  path: "/patient/checkout",
  element: <PatientCheckoutPage />
};

export const changePatientPasswordsRoute: Route = {
  path: "/patient/change-password",
  element: <PatientChangePasswordPage />
};

export const patientWalletRoute: Route = {
  path: "/patient/wallet",
  element: <PatientViewWalletPage />
};

export const createPatientWalletRoute: Route = {
  path: "/patient/wallet/create",
  element: <PatientCreateWalletPage />
};

export const patientPrescriptionsRoute: Route = {
  path: "/patient/prescriptions",
  element: <PatientPrescriptionsPage />
};

const patientRoutes: Route[] = [
  patientDashboardRoute,
  viewMedicinesRoute,
  cartReviewRoute,
  viewOrdersRoute,
  checkoutRoute,
  changePatientPasswordsRoute,
  patientWalletRoute,
  createPatientWalletRoute,
  patientPrescriptionsRoute
];

export default patientRoutes;
