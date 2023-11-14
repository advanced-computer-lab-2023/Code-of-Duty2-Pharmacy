import DashboardIcon from "@mui/icons-material/Dashboard";
import HealingIcon from "@mui/icons-material/Healing";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { SidebarItem } from "../../types";
import {
  patientDashboardRoute,
  viewMedicinesRoute,
  viewOrdersRoute,
} from "../routes/patientRoutes";

export const patientSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: patientDashboardRoute.path,
    icon: <DashboardIcon />,
  },
  {
    title: "Medicines",
    href: viewMedicinesRoute.path,
    icon: <HealingIcon />,
  },
  {
    title: "View Orders",
    href: viewOrdersRoute.path,
    icon: <AssignmentIcon />,
  },
];
export default patientSidebarItems;
