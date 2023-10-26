import { useContext } from "react";
import { AppBar, Toolbar, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import el7a2niLogo from "../../assets/el7a2ni_logo.png";
import UserTray from "../trays/UserTray";
import AuthTray from "../trays/AuthTray";

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
          <Link component={RouterLink} to="/">
            <img
              src={el7a2niLogo}
              alt="Logo"
              style={{ height: "2rem", paddingRight: "1rem" }}
            />
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            <div style={{ marginLeft: "auto" }}>
              <UserTray />
            </div>
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
