import { useState } from "react";
import { Typography, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

import PatientCountComponent from "../../components/patient/PatientCount";
import PharmacistCountComponent from "../../components/pharmacist/PharmacistCount";
import PharmacistRegistrationRequestCountComponent from "../../components/pharmacist/PharmacistRegistrationRequestsCount";
import AdminCountComponent from "../../components/admin/AdminCount";

const AdministratorDashboard = () => {
  const [pharmacistCount, setPharmacistCount] = useState<number>(0);
  const [patientCount, setPatientCount] = useState<number>(0);
  const [pharmacistRegistrationRequestCount, setPharmacistRegistrationRequestCount] = useState<number>(0);
  const [adminCount, setAdminCount] = useState<number>(0);

  return (
    <Box ml={"3%"}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Admin Dashboard
      </Typography>

      <Typography variant="subtitle1" fontSize={"1.2rem"} gutterBottom component="div" color="primary">
        Welcome to your home. Quickly gain insight on the system and navigate to frequently used pages.
      </Typography>

      <Box mt={5}>
        <Typography variant="h6" component="div" color="primary">
          System Users
        </Typography>

        <Typography variant="subtitle1" component="div" color="primary">
          View the number of system users.
        </Typography>

        <Box mt={"1%"} ml={"-5%"}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: patientCount, label: "Patients" },
                  { id: 1, value: pharmacistCount, label: "Pharmacists" },
                  { id: 2, value: adminCount, label: "Admins" }
                ]
              }
            ]}
            width={500}
            height={300}
          />
        </Box>
      </Box>

      <Box my={6}>
        <Typography variant="h6" component="div" color="primary">
          Quick Access
        </Typography>

        <Typography variant="subtitle1" component="div" color="primary">
          Access frequently used pages here.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start", columnGap: "3%", my: 2, pb: 2 }}>
        <PatientCountComponent patientCount={patientCount} setPatientCount={setPatientCount} />

        <PharmacistCountComponent pharmacistCount={pharmacistCount} setPharmacistCount={setPharmacistCount} />

        <PharmacistRegistrationRequestCountComponent
          pharmacistRegistrationRequestCount={pharmacistRegistrationRequestCount}
          setPharmacistRegistrationRequestCount={setPharmacistRegistrationRequestCount}
        />

        <AdminCountComponent adminCount={adminCount} setAdminCount={setAdminCount} />
      </Box>
    </Box>
  );
};

export default AdministratorDashboard;
