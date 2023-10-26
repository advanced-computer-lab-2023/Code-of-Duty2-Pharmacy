import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/navigation/Sidebar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import UserPanel from "../components/navigation/UserPanel";

interface AdministratorLayoutProps {
  children: ReactNode;
}

const AdministratorLayout: React.FC<AdministratorLayoutProps> = ({
  children,
}) => {
  const theme = useTheme();
  const isLargeOrMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const marginLeft = isLargeOrMediumScreen ? "17rem" : "0";

  return (
    <Box display="flex">
      <Sidebar />
      <Box
        sx={{
          marginLeft,
          transition: "margin-left 0.2s ease-in-out",
          flexGrow: 1,
        }}
      >
        <UserPanel />
        {children}
      </Box>
    </Box>
  );
};

export default AdministratorLayout;
