import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/Home";

import { AuthContext } from "../../contexts/AuthContext";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";
import { pharmacistDashboardRoute } from "../../data/routes/pharmacistRoutes";
import { welcomeRoute } from "../../data/routes/guestRoutes";
import UserTray from "../trays/UserTray";
import AuthTray from "../trays/AuthTray";
import el7a2niLogo from "../../assets/el7a2ni_logo.png";
import UserRole from "../../types/enums/UserRole";

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav>
      <AppBar
        position="sticky"
        sx={{
          height: "4rem",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Button onClick={() => navigate(welcomeRoute.path)}>
            <img
              src={el7a2niLogo}
              alt="Logo"
              style={{ height: "2rem", paddingRight: "1rem" }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color: "white",
              }}
            >
              EL7A2NI PHARMACY
            </Typography>
          </Button>

          {authState.isAuthenticated ? (
            <Box sx={{ marginLeft: "auto", display: "flex" }}>
              <UserTray />

              <Divider
                orientation="vertical"
                flexItem
                sx={{ bgcolor: "white", width: "1px", mx: 2 }}
              />

              <IconButton
                color="inherit"
                onClick={() => {
                  let path;
                  switch (authState.role) {
                    case UserRole.PATIENT:
                      path = patientDashboardRoute.path;
                      break;
                    case UserRole.ADMIN:
                      path = adminDashboardRoute.path;
                      break;
                    case UserRole.PHARMACIST:
                      path = pharmacistDashboardRoute.path;
                      break;
                    default:
                      logout();
                      navigate(welcomeRoute.path);
                      return;
                  }
                  if (path) {
                    navigate(path);
                  }
                }}
              >
                <HomeOutlinedIcon />
              </IconButton>
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
