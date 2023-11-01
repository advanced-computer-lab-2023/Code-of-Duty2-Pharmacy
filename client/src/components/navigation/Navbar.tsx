import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Divider } from "@mui/material";

import el7a2niLogo from "../../assets/el7a2ni_logo.png";
import UserTray from "../trays/UserTray";
import AuthTray from "../trays/AuthTray";
import { AuthContext } from "../../contexts/AuthContext";
import HomeButton from "./HomeButton";
import { welcomeRoute } from "../../data/routes/guestRoutes";

const Navbar = () => {
  const { authState } = useContext(AuthContext);

  return (
    <nav>
      <AppBar
        position="sticky"
        sx={{
          background: (theme) => theme.palette.gradient,
          height: "4rem",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <NavLink to="/">
            <img
              src={el7a2niLogo}
              alt="Logo"
              style={{ height: "2rem", paddingRight: "1rem" }}
            />
          </NavLink>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href={welcomeRoute.path}
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EL7A2NI PHARMACY
          </Typography>

          {authState.isAuthenticated ? (
            <Box sx={{ marginLeft: "auto", display: "flex" }}>
              <UserTray />

              <Divider
                orientation="vertical"
                flexItem
                sx={{ bgcolor: "white", width: "1px", mx: 2 }}
              />

              <HomeButton />
            </Box>
          ) : (
            <div style={{ marginLeft: "auto" }}>
              <AuthTray />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
