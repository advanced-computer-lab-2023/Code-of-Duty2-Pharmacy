import AdminIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import HealingIcon from "@mui/icons-material/Healing";
import PeopleIcon from "@mui/icons-material/People";

import { SidebarItem } from "../../types";
import {
  addAdminRoute,
  viewMedicinesRoute,
  viewPharmacistRegistrationRequestsRoute,
  viewPatientsRoute,
  viewPharmacistsRoute,
  adminDashboardRoute,
} from "../routes/adminRoutes";

/**
 * One href for each admin page route.
 */
export const adminSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: adminDashboardRoute.path,
    icon: <DashboardIcon />,
  },
  {
    title: "Manage Users",
    items: [
      {
        title: "Admins",
        href: addAdminRoute.path,
        icon: <AdminIcon />,
      },
      {
        title: "Pharmacists",
        href: viewPharmacistsRoute.path,
        icon: <LocalPharmacyIcon />,
      },
      {
        title: "Patients",
        href: viewPatientsRoute.path,
        icon: <PeopleIcon />,
      },
    ],
  },
  {
    title: "Registration Requests",
    icon: <AssignmentIcon />,
    items: [
      {
        title: "View Pharmacist Requests",
        href: viewPharmacistRegistrationRequestsRoute.path,
        icon: <AssignmentTurnedInIcon />,
      },
    ],
  },
  {
    title: "System Services",
    icon: <SettingsApplicationsIcon />,
    items: [
      {
        title: "Medicines",
        href: viewMedicinesRoute.path,
        icon: <HealingIcon />,
      },
    ],
  },
];
