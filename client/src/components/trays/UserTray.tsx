import { Box, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Notifications from "./Notifications";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import { cartReviewRoute } from "../../data/routes/patientRoutes";

const UserTray = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3.5,
      }}
    >
      <Notifications />

      <IconButton
        color="inherit"
        onClick={() => navigate(cartReviewRoute.path)}
        sx={{ padding: "0" }}
      >
        <ShoppingCartIcon />
      </IconButton>

      <Avatar />
    </Box>
  );
};

export default UserTray;
