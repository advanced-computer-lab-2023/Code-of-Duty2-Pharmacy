import DashboardIcon from "@mui/icons-material/Dashboard";
import HealingIcon from "@mui/icons-material/Healing";

import { SidebarItem } from "../../types";
import {
  patientDashboardRoute,
  viewMedicinesRoute,
} from "../routes/patientRoutes";

export const patientSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: patientDashboardRoute.path,
    icon: <DashboardIcon />,
  },
  {
    title: "View Medicines",
    href: viewMedicinesRoute.path,
    icon: <HealingIcon />,
  },
];

export default patientSidebarItems;
