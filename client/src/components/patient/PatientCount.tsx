import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

interface PatientCountProps {
  onViewAllPatients: (patients: Patient[]) => void;
}

interface Patient {
  username: string;
  name: string;
  email: string;
  mobileNumber: string;
}

const PatientCountComponent: React.FC<PatientCountProps> = ({ onViewAllPatients }) => {
  const [patientCount, setPatientCount] = useState<number | null>(null);
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
    navigate("/admin/view-all-patients");
  };

  return (
    <Card style={{ width: "25%" }}>
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
