import AdministratorDashboard from "../../pages/admin/AdministratorDashboard";
import { Route } from "../../types";
import AdminLayout from "../../layouts/AdminLayout";
import AdminViewMedicinesPage from "../../pages/admin/AdminViewMedicinesPage";
import AdminAddAdminPage from "../../pages/admin/AdminAddAdminPage";
import AdminViewPharmacistRequestsPage from "../../pages/admin/AdminViewPharmacistRequestsPage";
import AdminViewPharmacistsPage from "../../pages/admin/AdminViewPharmacistsPage";
import AdminViewPatientsPage from "../../pages/admin/AdminViewPatientsPage";

export const adminDashboardRoute: Route = {
  path: "/admin/dashboard",
  component: (
    <AdminLayout>
      <AdministratorDashboard />
    </AdminLayout>
  ),
};

export const viewMedicinesRoute: Route = {
  path: "/admin/view-medicines",
  component: (
    <AdminLayout>
      <AdminViewMedicinesPage />
    </AdminLayout>
  ),
};

export const addAdminRoute: Route = {
  path: "/admin/add-admins",
  component: (
    <AdminLayout>
      <AdminAddAdminPage />
    </AdminLayout>
  ),
};

export const viewPharmacistRegistrationRequestsRoute: Route = {
  path: "/admin/pharmacist-registration-requests",
  component: (
    <AdminLayout>
      <AdminViewPharmacistRequestsPage />
    </AdminLayout>
  ),
};

export const viewPharmacistsRoute: Route = {
  path: "/admin/view-pharmacists",
  component: (
    <AdminLayout>
      <AdminViewPharmacistsPage />
    </AdminLayout>
  ),
};

export const viewPatientsRoute: Route = {
  path: "/admin/view-patients",
  component: (
    <AdminLayout>
      <AdminViewPatientsPage />
    </AdminLayout>
  ),
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
