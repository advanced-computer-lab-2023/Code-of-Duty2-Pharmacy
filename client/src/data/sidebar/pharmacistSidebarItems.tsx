import DashboardIcon from "@mui/icons-material/Dashboard";
import HealingIcon from "@mui/icons-material/Healing";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Wallet from "@mui/icons-material/Wallet";

import { SidebarItem } from "../../types";
import {
  pharmacistDashboardRoute,
  viewMedicinesRoute,
  addMedicineRoute,
  pharmacistWalletRoute
} from "../routes/pharmacistRoutes";

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
    title: "Wallet",
    href: pharmacistWalletRoute.path,
    icon: <Wallet />
  }
];

export default pharmacistSidebarItems;
