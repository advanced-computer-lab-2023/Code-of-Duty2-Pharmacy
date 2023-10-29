import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";

import Navbar from "../components/navigation/Navbar";
import UserPanel from "../components/navigation/UserPanel";
import Sidebar from "../components/navigation/Sidebar";
import Footer from "../components/navigation/Footer";
import {
  patientLoginRoute,
  patientRegistrationRoute,
  pharmacistLoginRoute,
  pharmacistRegistrationRoute,
} from "../data/routes/guestRoutes";
import useFirstPath from "../hooks/useFirstPath";
import getRequiredSidebarItems from "../utils/getRequiredSidebarItems";

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
  const firstPath = useFirstPath();

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
        <Sidebar sidebarItems={sidebarItems} sidebarWidth={sidebarWidth} />
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

export default Layout;
