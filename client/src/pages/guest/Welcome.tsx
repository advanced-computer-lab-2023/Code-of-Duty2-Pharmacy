import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { patientRegistrationRoute } from "../../data/routes/guestRoutes";
import { pharmacistRegistrationRoute } from "../../data/routes/guestRoutes";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";
import { pharmacistDashboardRoute } from "../../data/routes/pharmacistRoutes";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ m: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome. Temporary buttons until login works.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(patientRegistrationRoute.path)}
          sx={{ m: 1 }}
        >
          Register as Patient
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(pharmacistRegistrationRoute.path)}
          sx={{ m: 1 }}
        >
          Register as Pharmacist
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(adminDashboardRoute.path)}
          sx={{ m: 1 }}
        >
          Login as Administrator
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(pharmacistDashboardRoute.path)}
          sx={{ m: 1 }}
        >
          Login as Pharmacist
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(patientDashboardRoute.path)}
          sx={{ m: 1 }}
        >
          Login as Patient
        </Button>
      </Box>
    </>
  );
};

export default Welcome;
