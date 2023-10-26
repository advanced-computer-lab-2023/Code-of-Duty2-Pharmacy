import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Transition } from "react-transition-group";

import { adminSidebarItems } from "../../data";
import { pharmacistSidebarItems } from "../../data";
import { patientSidebarItems } from "../../data";
import { AuthContext } from "../../contexts/AuthContext";
import el7a2niLogo from "../../assets/el7a2ni_logo.png";
import UserRole from "../../types/enums/UserRole";
import UserPanel from "./UserPanel";

type TransitionStyles = {
  entering: { opacity: number };
  entered: { opacity: number };
  exiting: { opacity: number };
  exited: { opacity: number };
  unmounted: { opacity: number };
};

const Sidebar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { authState } = useContext(AuthContext);

  const sidebarContent = (
    <Box>
      <List>
        <ListItem component={RouterLink} to="/">
          <img
            src={el7a2niLogo}
            alt="El7a2ni Logo"
            style={{
              maxWidth: "70%",
              height: "auto",
              marginTop: "3rem",
              marginBottom: "3rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </ListItem>

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
    </Box>
  );

  const duration = 50;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 1,
  };

  const transitionStyles: TransitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 },
  };

  return (
    <>
      <Transition in={!isSmallScreen} timeout={duration} unmountOnExit>
        {(state) => (
          <Box
            sx={{
              minWidth: "17rem",
              maxWidth: "17rem",
              background: (theme) => theme.palette.gradient,
              ...defaultStyle,
              ...transitionStyles[state],
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)", // Add a shadow to the sidebar
            }}
          >
            {sidebarContent}
          </Box>
        )}
      </Transition>
    </>
  );
};

export default Sidebar;
