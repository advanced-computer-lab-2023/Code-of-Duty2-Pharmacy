import DashboardIcon from "@mui/icons-material/Dashboard";
import HealingIcon from "@mui/icons-material/Healing";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { SidebarItem } from "../../types";
import { pharmacistDashboardRoute, viewMedicinesRoute, addMedicineRoute } from "../routes/pharmacistRoutes";

export const pharmacistSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: pharmacistDashboardRoute.path,
    icon: <DashboardIcon />
  },
  {
    title: "View Medicines",
    href: viewMedicinesRoute.path,
    icon: <HealingIcon />
  },
  {
    title: "Add Medicine",
    href: addMedicineRoute.path,
    icon: <AddCircleIcon />
  },
  {
    title: "Sales Report",
    href: pharmacistDashboardRoute.path,
    icon: <AttachMoneyIcon />
  }
];

export default pharmacistSidebarItems;
