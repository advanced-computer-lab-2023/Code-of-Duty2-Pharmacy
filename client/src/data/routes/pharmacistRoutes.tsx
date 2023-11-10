import PharmacistDashboard from "../../pages/pharmacist/PharmacistDashboard";
import { Route } from "../../types";
import PharmacistViewMedicinesPage from "../../pages/pharmacist/PharmacistViewMedicinesPage";
import PharmacistAddMedicinePage from "../../pages/pharmacist/PharmacistAddMedicinePage"; 
import ChangePasswordPage from "../../pages/common/ChangePasswordPage";

export const pharmacistDashboardRoute: Route = {
  path: "/pharmacist/dashboard",
  element: <PharmacistDashboard />,
};

export const viewMedicinesRoute: Route = {
  path: "/pharmacist/view-medicines",
  element: <PharmacistViewMedicinesPage />,
};

export const addMedicineRoute: Route = {
  path: "/pharmacist/add-medicine",
  element: <PharmacistAddMedicinePage />,
};

export const changePharmacistPasswordsRoute: Route = {
  path: "/pharmacist/change-password",
  element: <ChangePasswordPage />,
};

const pharmacistRoutes: Route[] = [
  pharmacistDashboardRoute,
  viewMedicinesRoute,
  addMedicineRoute,
  changePharmacistPasswordsRoute,
];

export default pharmacistRoutes;
