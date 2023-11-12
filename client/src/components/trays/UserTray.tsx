import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Notifications from "./Notifications";
import Avatar from "./Avatar";
import { cartReviewRoute } from "../../data/routes/patientRoutes";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../../types/enums/UserRole";

const UserTray = () => {
  const navigate = useNavigate();

  const { authState } = useContext(AuthContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3.5,
      }}
    >
      <Notifications />

      {authState.role === UserRole.PATIENT && (
        <IconButton
          color="inherit"
          onClick={() => navigate(cartReviewRoute.path)}
          sx={{ padding: "0" }}
        >
          <ShoppingCartIcon />
        </IconButton>
      )}

      <Avatar />
    </Box>
  );
};

export default UserTray;
