import React from "react";
import Sidebar from "../components/navigation/Sidebar";
import { useLocation } from "react-router-dom";
import {
  pharmacistSidebarItems,
  patientSidebarItems,
} from "../data/sidebarItems";
import { adminSidebarItems } from "../data/sidebarItems";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import UserPanel from "../components/navigation/UserPanel";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMediumScreenOrLarger = useMediaQuery(theme.breakpoints.up("md"));

  // Sidebar width is 17 rem,
  // so we need to set the margin-left of the main content to 17 rem
  // so the content doesn't overlap with the sidebar.

  const marginLeft = isMediumScreenOrLarger ? "17rem" : "0";
  const firstPath = getFirstPath();

  if (
    firstPath === "admin" ||
    firstPath === "pharmacist" ||
    firstPath === "patient"
  ) {
    const sidebarItems = getRequiredSidebarItems();
    return (
      <Box display="flex">
        <Sidebar sidebarItems={sidebarItems} />
        <Box
          sx={{
            marginLeft,
            transition: "margin-left 0.2s ease-in-out",
            flexGrow: 1,
          }}
        >
          <UserPanel sidebarItems={sidebarItems} />
          {children}
          <Footer />
        </Box>
      </Box>
    );
  } else {
    return (
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    );
  }
};

function getRequiredSidebarItems() {
  const firstPath = getFirstPath();
  switch (firstPath) {
    case "patient":
      return patientSidebarItems;
    case "pharmacist":
      return pharmacistSidebarItems;
    case "admin":
      return adminSidebarItems;
    default:
      return [];
  }
}

function getFirstPath() {
  const location = useLocation();
  const parts = location.pathname.split("/");
  return parts[1];
}

export default Layout;
