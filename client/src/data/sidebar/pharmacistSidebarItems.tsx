import DashboardIcon from "@mui/icons-material/Dashboard";
import Wallet from "@mui/icons-material/Wallet";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MedicationIcon from "@mui/icons-material/Medication";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";

import { SidebarItem } from "../../types";
import {
  pharmacistDashboardRoute,
  viewMedicinesRoute,
  addMedicineRoute,
  pharmacistChatPageRoute,
  pharmacistWalletRoute,
  pharmacistViewTotalSalesRoute
} from "../routes/pharmacistRoutes";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const pharmacistSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: pharmacistDashboardRoute.path,
    icon: <DashboardIcon />
  },
  {
    title: "View Medicines",
    href: viewMedicinesRoute.path,
    icon: <MedicationIcon />
  },
  {
    title: "Add Medicine",
    href: addMedicineRoute.path,
    icon: <AddCircleOutlineIcon />
  },
  {
    title: "Chatting",
    href: pharmacistChatPageRoute.path,
    icon: <MarkUnreadChatAltIcon />
  },
  {
    title: "Wallet",
    href: pharmacistWalletRoute.path,
    icon: <Wallet />
  },
  {
    title: "Total Sales",
    href: pharmacistViewTotalSalesRoute.path,
    icon: <AttachMoneyIcon />
  }
];

export default pharmacistSidebarItems;
