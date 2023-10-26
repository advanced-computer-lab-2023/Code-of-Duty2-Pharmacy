import AddMedicineForm from "../../components/medicine/AddMedicineForm";
import MedicineList from "../../components/medicine/MedicineList";
import PharmacistDashboard from "../../pages/pharmacist/PharmacistDashboard";
import { Route } from "../../types";
import PharmacistLayout from "../../layouts/PharmacistLayout";

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
      <MedicineList />
    </PharmacistLayout>
  ),
};

export const addMedicineRoute: Route = {
  path: "/pharmacist/add-medicine",
  component: (
    <PharmacistLayout>
      <AddMedicineForm />
    </PharmacistLayout>
  ),
};

const pharmacistRoutes: Route[] = [
  pharmacistDashboardRoute,
  viewMedicinesRoute,
  addMedicineRoute,
];

export default pharmacistRoutes;
