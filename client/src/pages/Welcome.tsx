import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../components/navigation/Navbar";

const Welcome = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ m: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/patient-registration"
          sx={{ m: 1 }}
        >
          Register as Patient
        </Button>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/pharmacist-registration"
          sx={{ m: 1 }}
        >
          Register as Pharmacist
        </Button>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/administrator"
          sx={{ m: 1 }}
        >
          Login as Administrator
        </Button>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/pharmacist"
          sx={{ m: 1 }}
        >
          Login as Pharmacist
        </Button>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/patient"
          sx={{ m: 1 }}
        >
          Login as Patient
        </Button>
      </Box>
    </>
  );
};

export default Welcome;
