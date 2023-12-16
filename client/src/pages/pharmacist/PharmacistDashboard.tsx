import { Box, Typography } from "@mui/material";

const PharmacistDashboard: React.FC = () => {
  return (
    <Box ml={"3%"}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Pharmacist Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div" color="primary">
        Manage medicines and support patients with their medication needs.
      </Typography>
    </Box>
  );
};

export default PharmacistDashboard;
