import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const AllPatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/patients/`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchAllPatients();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        All Patients
      </Typography>
      <List>
        {patients.map((patient) => (
          <ListItem key={patient._id}>
            <ListItemText primary={patient.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AllPatientsPage;
