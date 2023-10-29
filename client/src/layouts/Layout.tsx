import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";

import Navbar from "../components/navigation/Navbar";
import UserPanel from "../components/navigation/UserPanel";
import Sidebar from "../components/navigation/Sidebar";
import Footer from "../components/navigation/Footer";
import {
  pharmacistSidebarItems,
  patientSidebarItems,
  adminSidebarItems,
} from "../data/sidebarItems";
import {
  patientLoginRoute,
  patientRegistrationRoute,
  pharmacistLoginRoute,
  pharmacistRegistrationRoute,
} from "../data/routes/guestRoutes";

interface Props {
  children: React.ReactNode;
}

/*
    TODO: Change checking for first path to checking for user role
*/
const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMediumScreenOrLarger = useMediaQuery(theme.breakpoints.up("md"));
  const sidebarWidth = "17rem";
  // We apply a left margin to the main content in the layout of
  // authenticated users (because only they have a sidebar) when the sidebar
  // is open (on medium screens and larger) to prevent the main content
  // from being hidden behind the sidebar. We don't apply this margin
  // on small screens because the sidebar is hidden on small screens.
  const marginLeft = isMediumScreenOrLarger ? sidebarWidth : "0";
  const firstPath = getFirstPath();

  const MainPageContent = () => {
    return <>{children}</>;
  };

  if (
    firstPath === "admin" ||
    firstPath === "pharmacist" ||
    firstPath === "patient"
  ) {
    const sidebarItems = getRequiredSidebarItems(firstPath);
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
          <MainPageContent />
          <Footer />
        </Box>
      </Box>
    );
  } else if (
    location.pathname !== patientLoginRoute.path &&
    location.pathname !== pharmacistLoginRoute.path &&
    location.pathname !== patientRegistrationRoute.path &&
    location.pathname !== pharmacistRegistrationRoute.path
  ) {
    return (
      <>
        <Navbar />
        <MainPageContent />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <MainPageContent />
        <Footer />
      </>
    );
  }
};

function getRequiredSidebarItems(firstPath: string) {
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
