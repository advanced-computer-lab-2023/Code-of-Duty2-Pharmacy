import PatientCartReviewPage from "../../pages/patient/PatientCartReviewPage";
import PatientCheckoutPage from "../../pages/patient/PatientCheckoutPage";
import PatientDashboard from "../../pages/patient/PatientDashboard";
import PatientViewOrdersPage from "../../pages/patient/PatientViewOrdersPage";
import PatientViewMedicinesPage from "../../pages/patient/PatientViewMedicinesPage";
import { Route } from "../../types";
import ViewWallet from "../../pages/wallet/ViewWallet";
import CreateWallet from "../../pages/wallet/CreateWallet";
import PatientChangePasswordPage from "../../pages/patient/PatientChangePasswordPage";
import ChatPage from "../../pages/chat/ChatPage";
import ViewChat from "../../pages/chat/ViewChat";
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
  element: <ViewWallet />
};

export const createPatientWalletRoute: Route = {
  path: "/patient/wallet/create",
  element: <CreateWallet />
};

export const patientChatPageRoute: Route = {
  path: "/patient/chats",
  element: <ChatPage />
};

export const patientChatViewRoute: Route = {
  path: "/patient/current-chat",
  element: <ViewChat />
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
  patientChatPageRoute,
  patientChatViewRoute,
  patientPrescriptionsRoute
];

export default patientRoutes;
