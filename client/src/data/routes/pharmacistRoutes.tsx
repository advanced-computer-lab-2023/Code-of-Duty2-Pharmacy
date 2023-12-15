import PharmacistDashboard from "../../pages/pharmacist/PharmacistDashboard";
import { Route } from "../../types";
import PharmacistViewMedicinesPage from "../../pages/pharmacist/PharmacistViewMedicinesPage";
import PharmacistAddMedicinePage from "../../pages/pharmacist/PharmacistAddMedicinePage";
import ChangePasswordPage from "../../pages/common/ChangePasswordPage";
import PharmacistAdditionalInfo from "../../pages/pharmacist/PharmacistAdditionalInfo";
import PharmacistChangePasswordPage from "../../pages/pharmacist/PharmacistChangePasswordPage";
import PharmacistTotalSalesViewPage from "../../pages/pharmacist/PharmacistTotalSalesView";

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

export const pharmacistViewTotalSalesRoute: Route = {
  path: "/pharmacist/view-total-sales",
  element: <PharmacistTotalSalesViewPage />
};

const pharmacistRoutes: Route[] = [
  pharmacistDashboardRoute,
  viewMedicinesRoute,
  addMedicineRoute,
  changePharmacistPasswordsRoute,
  PharmacistAdditionalInfoRoute,
  pharmacistViewTotalSalesRoute
];

export default pharmacistRoutes;
