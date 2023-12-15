import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MedicationIcon from "@mui/icons-material/Medication";
import Wallet from "@mui/icons-material/Wallet";

import { SidebarItem } from "../../types";
import {
  patientDashboardRoute,
  patientWalletRoute,
  viewMedicinesRoute,
  viewOrdersRoute
} from "../routes/patientRoutes";

export const patientSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: patientDashboardRoute.path,
    icon: <DashboardIcon />
  },
  {
    title: "Medicines",
    href: viewMedicinesRoute.path,
    icon: <MedicationIcon />
  },
  {
    title: "Prescriptions",
    href: "/patient/prescriptions",
    icon: <LocalPharmacyIcon />
  },
  {
    title: "Orders",
    href: viewOrdersRoute.path,
    icon: <AssignmentIcon />
  },
  {
    title: "Wallet",
    href: patientWalletRoute.path,
    icon: <Wallet />
  }
];
export default patientSidebarItems;
