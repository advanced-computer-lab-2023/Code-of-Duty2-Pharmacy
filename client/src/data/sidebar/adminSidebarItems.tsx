import {
  addAdminRoute,
  adminDashboardRoute,
  viewMedicinesRoute,
  viewPatientsRoute,
  viewPharmacistRegistrationRequestsRoute,
  viewPharmacistsRoute,
  adminViewTotalSalesRoute
} from "../routes/adminRoutes";
import AdminIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import HealingIcon from "@mui/icons-material/Healing";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { SidebarItem } from "../../types";

export const adminSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: adminDashboardRoute.path,
    icon: <DashboardIcon />
  },
  {
    title: "Manage Users",
    icon: <SupervisorAccountIcon />,
    items: [
      {
        title: "Admins",
        href: addAdminRoute.path,
        icon: <AdminIcon />
      },
      {
        title: "Pharmacists",
        href: viewPharmacistsRoute.path,
        icon: <LocalPharmacyIcon />
      },
      {
        title: "Patients",
        href: viewPatientsRoute.path,
        icon: <PeopleIcon />
      }
    ]
  },
  {
    title: "Registration Requests",
    icon: <AssignmentIcon />,
    items: [
      {
        title: "Pharmacists",
        href: viewPharmacistRegistrationRequestsRoute.path,
        icon: <AssignmentTurnedInIcon />
      }
    ]
  },
  {
    title: "System Services",
    icon: <SettingsApplicationsIcon />,
    items: [
      {
        title: "Medicines",
        href: viewMedicinesRoute.path,
        icon: <HealingIcon />
      }
    ]
  },
  {
    title: "Reports",
    icon: <AssessmentIcon />,
    items: [
      {
        title: "Total Sales",
        href: adminViewTotalSalesRoute.path,
        icon: <AttachMoneyIcon />
      }
    ]
  }
];
