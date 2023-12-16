import { useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";
import { viewPatientsRoute } from "../../data/routes/adminRoutes";

interface Props {
  patientCount: number;
  setPatientCount: React.Dispatch<React.SetStateAction<number>>;
}

const PatientCountComponent: React.FC<Props> = ({ patientCount, setPatientCount }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/patients/`);
        setPatientCount(response.data.length);
      } catch (error) {
        console.error("Error fetching patient count:", error);
      }
    };

    fetchPatientCount();
  }, []);

  const handleClick = () => {
    navigate(viewPatientsRoute.path);
  };

  return (
    <Card style={{ display: "inline-block", alignItems: "center" }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          {patientCount !== null ? patientCount : "Loading..."}
        </Typography>

        <Typography variant="subtitle1" align="center" gutterBottom>
          Patients
        </Typography>

        <Button variant="outlined" onClick={handleClick} fullWidth>
          View All Patients
        </Button>
      </CardContent>
    </Card>
  );
};

export default PatientCountComponent;
