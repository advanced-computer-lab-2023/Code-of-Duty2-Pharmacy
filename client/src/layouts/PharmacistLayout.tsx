import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/navigation/Sidebar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import UserPanel from "../components/navigation/UserPanel";

interface PharmacistLayoutProps {
  children: ReactNode;
}

const PharmacistLayout: React.FC<PharmacistLayoutProps> = ({ children }) => {
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

export default PharmacistLayout;
