import AdministratorDashboard from "../../pages/admin/AdministratorDashboard";
import { Route } from "../../types";
import AdminViewMedicinesPage from "../../pages/admin/AdminViewMedicinesPage";
import AdminAddAdminPage from "../../pages/admin/AdminAddAdminPage";
import AdminViewPharmacistRequestsPage from "../../pages/admin/AdminViewPharmacistRequestsPage";
import AdminViewPharmacistsPage from "../../pages/admin/AdminViewPharmacistsPage";
import AdminViewPatientsPage from "../../pages/admin/AdminViewPatientsPage";

export const adminDashboardRoute: Route = {
  path: "/admin/dashboard",
  element: <AdministratorDashboard />,
};

export const viewMedicinesRoute: Route = {
  path: "/admin/view-medicines",
  element: <AdminViewMedicinesPage />,
};

export const addAdminRoute: Route = {
  path: "/admin/add-admins",
  element: <AdminAddAdminPage />,
};

export const viewPharmacistRegistrationRequestsRoute: Route = {
  path: "/admin/pharmacist-registration-requests",
  element: <AdminViewPharmacistRequestsPage />,
};

export const viewPharmacistsRoute: Route = {
  path: "/admin/view-pharmacists",
  element: <AdminViewPharmacistsPage />,
};

export const viewPatientsRoute: Route = {
  path: "/admin/view-patients",
  element: <AdminViewPatientsPage />,
};

const adminRoutes: Route[] = [
  adminDashboardRoute,
  viewMedicinesRoute,
  addAdminRoute,
  viewPharmacistRegistrationRequestsRoute,
  viewPharmacistsRoute,
  viewPatientsRoute,
];

export default adminRoutes;