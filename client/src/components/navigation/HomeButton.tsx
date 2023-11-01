import HomeOutlinedIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { patientDashboardRoute } from "../../data/routes/patientRoutes";
import { pharmacistDashboardRoute } from "../../data/routes/pharmacistRoutes";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";
import { welcomeRoute } from "../../data/routes/guestRoutes";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";

const HomeButton = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
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
  );
};

export default HomeButton;
