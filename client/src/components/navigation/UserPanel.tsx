import { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  Button,
  useTheme,
  useMediaQuery,
  List,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import UserTray from "../trays/UserTray";
import Notifications from "../Notifications";
import { adminSidebarItems } from "../../data";
import { pharmacistSidebarItems } from "../../data";
import { patientSidebarItems } from "../../data";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";

const UserPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isSmallScreen
          ? theme.palette.background.default
          : "transparent", // Use a color from your theme only when the screen is small
        margin: theme.spacing(1), // Add spacing around the component
        padding: theme.spacing(2), // Add padding inside the component
        borderRadius: isSmallScreen ? "10rem" : "none", // Make the two sides completely round only when the screen is small
        position: isSmallScreen ? "sticky" : "static", // Make the position sticky only when the screen is small
        top: isSmallScreen ? 0 : theme.spacing(2), // Add some space at the top of the screen
        zIndex: theme.zIndex.drawer - 1, // Adjust z-index based on whether the drawer is open or not
        boxShadow: isSmallScreen ? "0px 2px 2px rgba(0, 0, 0, 0.25)" : "none", // Add a shadow only when the screen is small
      }}
    >
      {isSmallScreen ? (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ marginLeft: theme.spacing(1) }} // Add space to the left of the icon button
          >
            <MenuIcon />
          </IconButton>

          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ padding: theme.spacing(2) }}>
              <Stack direction="column" spacing={2} alignItems="flex-start">
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
                <List>
                  {/*authState.role === UserRole.ADMIN && (
                  adminSidebarItems.map((item) => ( 
                  <ListItem component={RouterLink} to={item.path}>
                    <ListItemText primary={item.name} />
                  </ListItem>
                  )*/}

                  {/*authState.role === UserRole.PATIENT && (
                  patientSidebarItems.map((item) => ( 
                    <ListItem component={RouterLink} to={item.path}>
                      <ListItemText primary={item.name} />
                    </ListItem>
                )*/}

                  {/*authState.role === UserRole.PHARMACIST && ( 
                  pharmacistSidebarItems.map((item) => ( 
                    <ListItem component={RouterLink} to={item.path}>
                      <ListItemText primary={item.name} />
                   </ListItem>
                ))
                  )*/}
                </List>
              </Stack>
            </Box>
          </Drawer>
        </>
      ) : (
        <Box sx={{ width: "100%" }} /> // Empty box to reserve space
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: theme.spacing(1), // Add space to the right of the notifications and user tray
        }}
      >
        <Notifications />
        <UserTray />
      </Box>
    </Box>
  );
};

export default UserPanel;
