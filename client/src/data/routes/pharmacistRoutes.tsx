import PharmacistDashboard from "../../pages/pharmacist/PharmacistDashboard";
import { Route } from "../../types";
import PharmacistViewMedicinesPage from "../../pages/pharmacist/PharmacistViewMedicinesPage";
import PharmacistAddMedicinePage from "../../pages/pharmacist/PharmacistAddMedicinePage";

export const pharmacistDashboardRoute: Route = {
  path: "/pharmacist/dashboard",
  component: <PharmacistDashboard />,
};

export const viewMedicinesRoute: Route = {
  path: "/pharmacist/view-medicines",
  component: <PharmacistViewMedicinesPage />,
};

export const addMedicineRoute: Route = {
  path: "/pharmacist/add-medicine",
  component: <PharmacistAddMedicinePage />,
};

const pharmacistRoutes: Route[] = [
  pharmacistDashboardRoute,
  viewMedicinesRoute,
  addMedicineRoute,
];

export default pharmacistRoutes;
