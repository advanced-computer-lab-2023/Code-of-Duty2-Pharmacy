import PharmacistDashboard from "../../pages/pharmacist/PharmacistDashboard";
import { Route } from "../../types";
import PharmacistViewMedicinesPage from "../../pages/pharmacist/PharmacistViewMedicinesPage";
import PharmacistAddMedicinePage from "../../pages/pharmacist/PharmacistAddMedicinePage";
import PharmacistAdditionalInfo from "../../pages/pharmacist/PharmacistAdditionalInfo";
import PharmacistChangePasswordPage from "../../pages/pharmacist/PharmacistChangePasswordPage";
import PharmacistViewWalletPage from "../../pages/wallet/PharmacistViewWalletPage";
import PharmacistCreateWalletPage from "../../pages/wallet/PharmacistCreateWalletPage";

export const pharmacistDashboardRoute: Route = {
  path: "/pharmacist/dashboard",
  element: <PharmacistDashboard />
};

export const viewMedicinesRoute: Route = {
  path: "/pharmacist/view-medicines",
  element: <PharmacistViewMedicinesPage />
};

export const addMedicineRoute: Route = {
  path: "/pharmacist/add-medicine",
  element: <PharmacistAddMedicinePage />
};

export const changePharmacistPasswordsRoute: Route = {
  path: "/pharmacist/change-password",
  element: <PharmacistChangePasswordPage />
};

export const PharmacistAdditionalInfoRoute: Route = {
  path: "/pharmacist/complete-additional-info",
  element: <PharmacistAdditionalInfo />
};

export const pharmacistWalletRoute: Route = {
  path: "/pharmacist/wallet",
  element: <PharmacistViewWalletPage />
};

export const createPharmacistWalletRoute: Route = {
  path: "/pharmacist/wallet/create",
  element: <PharmacistCreateWalletPage />
};

const pharmacistRoutes: Route[] = [
  pharmacistDashboardRoute,
  viewMedicinesRoute,
  addMedicineRoute,
  changePharmacistPasswordsRoute,
  PharmacistAdditionalInfoRoute,
  pharmacistWalletRoute,
  createPharmacistWalletRoute
];

export default pharmacistRoutes;
