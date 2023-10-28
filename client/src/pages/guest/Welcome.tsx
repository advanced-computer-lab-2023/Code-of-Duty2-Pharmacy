import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/navigation/Navbar";
import { patientRegistrationRoute } from "../../data/routes/guestRoutes";
import { pharmacistRegistrationRoute } from "../../data/routes/guestRoutes";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";
import { pharmacistDashboardRoute } from "../../data/routes/pharmacistRoutes";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";

const Welcome = () => {
  return (
    <>
      <Navbar />

      <Box sx={{ m: 4 }}>
        <Typography variant="h4" gutterBottom>
          /TEMPORARY BUTTONS FOR TESTING, WILL BE REMOVED LATER AND LOGIN WILL
          BE REQUIRED/
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={patientRegistrationRoute.path}
          sx={{ m: 1 }}
        >
          Register as Patient
        </Button>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={pharmacistRegistrationRoute.path}
          sx={{ m: 1 }}
        >
          Register as Pharmacist
        </Button>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={adminDashboardRoute.path}
          sx={{ m: 1 }}
        >
          Login as Administrator
        </Button>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={pharmacistDashboardRoute.path}
          sx={{ m: 1 }}
        >
          Login as Pharmacist
        </Button>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={patientDashboardRoute.path}
          sx={{ m: 1 }}
        >
          Login as Patient
        </Button>
      </Box>
    </>
  );
};

export default Welcome;
