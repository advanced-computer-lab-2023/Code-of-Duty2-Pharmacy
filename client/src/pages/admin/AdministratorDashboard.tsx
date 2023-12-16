import { Typography, Box } from "@mui/material";

const AdministratorDashboard = () => {
  return (
    <Box ml={"3%"}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div" color="primary">
        Manage and support system users and services.
      </Typography>
    </Box>
  );
};

export default AdministratorDashboard;
