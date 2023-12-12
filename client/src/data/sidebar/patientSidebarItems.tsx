import DashboardIcon from "@mui/icons-material/Dashboard";
import HealingIcon from "@mui/icons-material/Healing";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChatIcon from "@mui/icons-material/Chat";

import { SidebarItem } from "../../types";
import {
  createPatientWalletRoute,
  patientChatPageRoute,
  patientDashboardRoute,
  patientWalletRoute,
  viewMedicinesRoute,
  viewOrdersRoute
} from "../routes/patientRoutes";
import { Wallet } from "@mui/icons-material";

export const patientSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: patientDashboardRoute.path,
    icon: <DashboardIcon />
  },
  {
    title: "Medicines",
    href: viewMedicinesRoute.path,
    icon: <HealingIcon />
  },
  {
    title: "View Orders",
    href: viewOrdersRoute.path,
    icon: <AssignmentIcon />
  },
  {
    title: "Wallet",
    href: patientWalletRoute.path,
    icon: <Wallet />
  },
  {
    title: "Chatting",
    href: patientChatPageRoute.path,
    icon: <ChatIcon />
  }
];
export default patientSidebarItems;
