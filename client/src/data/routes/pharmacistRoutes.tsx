import PharmacistDashboard from "../../pages/pharmacist/PharmacistDashboard";
import { Route } from "../../types";
import PharmacistViewMedicinesPage from "../../pages/pharmacist/PharmacistViewMedicinesPage";
import PharmacistAddMedicinePage from "../../pages/pharmacist/PharmacistAddMedicinePage";

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

const pharmacistRoutes: Route[] = [
  pharmacistDashboardRoute,
  viewMedicinesRoute,
  addMedicineRoute,
];

export default pharmacistRoutes;
