import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "typeface-montserrat";

import { AuthContext } from "../../contexts/AuthContext";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";
import { pharmacistDashboardRoute } from "../../data/routes/pharmacistRoutes";
import { welcomeRoute } from "../../data/routes/guestRoutes";
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
          justifyContent: "center"
        }}
      >
        <Toolbar>
          <Button onClick={() => navigate(welcomeRoute.path)}>
            <img src={el7a2niLogo} alt="Logo" style={{ height: "2rem", paddingRight: "1rem" }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                mr: 2,
                display: { md: "flex" },
                fontWeight: 500,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color: "white"
              }}
            >
              EL7A2NI PHARMACY
            </Typography>
          </Button>

          {authState.isAuthenticated ? (
            <Box sx={{ marginLeft: "auto", display: "flex" }}>
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
                <DashboardIcon />
                <Typography sx={{ pl: 1 }}>Switch to Dashboard</Typography>
              </IconButton>

              {/* <Divider orientation="vertical" flexItem sx={{ bgcolor: "white", width: "1px", mx: 2 }} />

              <UserTray /> */}
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
