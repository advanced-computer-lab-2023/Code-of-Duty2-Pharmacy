import { Typography, Box } from "@mui/material";
import PatientCountComponent from "../../components/patient/PatientCount";
import PharmacistCountComponent from "../../components/pharmacist/PharmacistCount";
import PharmacistRegistrationRequestCountComponent from "../../components/pharmacist/PharmacistRegistrationRequestsCount";
import AdminCountComponent from "../../components/admin/AdminCount";

const AdministratorDashboard = () => {
  return (
    <Box ml={"3%"}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div" color="primary">
        Manage and support system users and services.
      </Typography>
      <PatientCountComponent
        onViewAllPatients={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <PharmacistCountComponent
        onViewAllPharmacists={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div style={{ marginBottom: "20%" }}>
        <PharmacistRegistrationRequestCountComponent
          onViewAllPharmacistRegistrationRequests={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <AdminCountComponent
        onViewAllAdmins={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Box>
  );
};

export default AdministratorDashboard;
