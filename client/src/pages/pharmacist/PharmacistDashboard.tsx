import { Box, Typography } from "@mui/material";
import TopMedicines from "../../components/medicine/getTopThreeMedicines";

const PharmacistDashboard: React.FC = () => {
  return (
    <Box ml={"3%"}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Pharmacist Dashboard
      </Typography>

      <Typography variant="subtitle1" fontSize={"1.2rem"} gutterBottom component="div" color="">
        Welcome to your home. Gain insight on medicine statistics and navigate to frequently used pages.
      </Typography>

      <Box mt={5}>
        <Typography variant="h6" component="div" color="primary">
          Most Frequently Bought Medicines
        </Typography>

        <Typography variant="subtitle1" component="div" color="">
          Here are the top three most frequently bought medicines.
        </Typography>

        <Box mt={"2%"} ml={"-17%"}>
          <TopMedicines />
        </Box>
      </Box>
    </Box>
  );
};

export default PharmacistDashboard;
