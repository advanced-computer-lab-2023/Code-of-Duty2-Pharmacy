import PharmacistDashboard from "../../pages/pharmacist/PharmacistDashboard";
import { Route } from "../../types";
import PharmacistLayout from "../../layouts/PharmacistLayout";
import PharmacistViewMedicinesPage from "../../pages/pharmacist/PharmacistViewMedicinesPage";
import PharmacistAddMedicinePage from "../../pages/pharmacist/PharmacistAddMedicinePage";

export const pharmacistDashboardRoute: Route = {
  path: "/pharmacist/dashboard",
  component: (
    <PharmacistLayout>
      <PharmacistDashboard />
    </PharmacistLayout>
  ),
};

export const viewMedicinesRoute: Route = {
  path: "/pharmacist/view-medicines",
  component: (
    <PharmacistLayout>
      <PharmacistViewMedicinesPage />
    </PharmacistLayout>
  ),
};

export const addMedicineRoute: Route = {
  path: "/pharmacist/add-medicine",
  component: (
    <PharmacistLayout>
      <PharmacistAddMedicinePage />
    </PharmacistLayout>
  ),
};

const pharmacistRoutes: Route[] = [
  pharmacistDashboardRoute,
  viewMedicinesRoute,
  addMedicineRoute,
];

export default pharmacistRoutes;
