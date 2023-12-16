import AdministratorDashboard from "../../pages/admin/AdministratorDashboard";
import { Route } from "../../types";
import AdminViewMedicinesPage from "../../pages/admin/AdminViewMedicinesPage";
import ManageAdminsPage from "../../pages/admin/AdminAddAdminPage";
import AdminViewPharmacistRequestsPage from "../../pages/admin/AdminViewPharmacistRequestsPage";
import AdminViewPharmacistsPage from "../../pages/admin/AdminViewPharmacistsPage";
import AdminViewPatientsPage from "../../pages/admin/AdminViewPatientsPage";
import AdminViewPharmacistRegistrationRequest from "../../pages/admin/AdminViewPharmacistRegistrationRequest";
import AdminChangePasswordPage from "../../pages/admin/AdminChangePasswordPage";
import AllPatientsPage from "../../components/patient/AllPatients";
import AllPharmacistsPage from "../../components/pharmacist/AllPharmacists";
import AllAdminsPage from "../../components/admin/AllAdmins";
import AllPharmacistRegistrationRequestsPage from "../../components/pharmacist/AllPharmacistsRegistrationRequests";

export const adminDashboardRoute: Route = {
  path: "/admin/dashboard",
  element: <AdministratorDashboard />
};

export const viewMedicinesRoute: Route = {
  path: "/admin/view-medicines",
  element: <AdminViewMedicinesPage />
};

export const addAdminRoute: Route = {
  path: "/admin/add-admins",
  element: <ManageAdminsPage />
};

export const viewPharmacistRegistrationRequestsRoute: Route = {
  path: "/admin/pharmacist-registration-requests",
  element: <AdminViewPharmacistRequestsPage />
};

export const viewPharmacistsRoute: Route = {
  path: "/admin/view-pharmacists",
  element: <AdminViewPharmacistsPage />
};

export const viewPatientsRoute: Route = {
  path: "/admin/view-patients",
  element: <AdminViewPatientsPage />
};
export const viewPharmacistRequestRoute: Route = {
  path: "/admin/view-pharmacist-request",
  element: <AdminViewPharmacistRegistrationRequest />
};

export const changeAdminPasswordsRoute: Route = {
  path: "/admin/change-password",
  element: <AdminChangePasswordPage />
};

export const viewAllPatientsRoute: Route = {
  path: "/admin/view-all-patients",
  element: <AllPatientsPage />
};

export const viewAllPharmacistsRoute: Route = {
  path: "/admin/view-all-pharmacists",
  element: <AllPharmacistsPage />
};

export const viewAllAdminsRoute: Route = {
  path: "/admin/view-all-admins",
  element: <AllAdminsPage />
};

export const viewAllPharmacistRegistrationRequestsRoute: Route = {
  path: "/admin/view-all-pharmacist-registration-requests",
  element: <AllPharmacistRegistrationRequestsPage />
};

const adminRoutes: Route[] = [
  adminDashboardRoute,
  viewMedicinesRoute,
  addAdminRoute,
  viewPharmacistRegistrationRequestsRoute,
  viewPharmacistsRoute,
  viewPatientsRoute,
  changeAdminPasswordsRoute,
  viewPharmacistRequestRoute,
  viewAllPatientsRoute,
  viewAllPharmacistsRoute,
  viewAllAdminsRoute,
  viewAllPharmacistRegistrationRequestsRoute
];

export default adminRoutes;
