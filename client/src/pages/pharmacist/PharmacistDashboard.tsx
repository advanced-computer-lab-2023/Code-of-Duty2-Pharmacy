import { Box, Typography } from "@mui/material";
import TopMedicines from "../../components/medicine/getTopThreeMedicines";

const PharmacistDashboard: React.FC = () => {
  return (
    <Box ml={"3%"}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Pharmacist Dashboard
      </Typography>

      <Typography variant="subtitle1" fontSize={"1.2rem"} gutterBottom component="div" color="primary">
        Welcome to your home. Gain insight on medicine statistics and navigate to frequently used pages.
      </Typography>

      <TopMedicines />
    </Box>
  );
};

export default PharmacistDashboard;
