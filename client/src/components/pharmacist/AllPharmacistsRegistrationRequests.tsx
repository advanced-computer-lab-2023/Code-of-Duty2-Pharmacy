import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const AllPharmacistRegistrationRequestsPage: React.FC = () => {
  const [pharmacistRegistrationRequests, setPharmacistRegistrationRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllPharmacistRegistrationRequests = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/pharmacist_registration_requests/`);
        setPharmacistRegistrationRequests(response.data);
      } catch (error) {
        console.error("Error fetching pharmacist registration requests:", error);
      }
    };

    fetchAllPharmacistRegistrationRequests();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        All Pharmacist Registration Requests
      </Typography>
      <List>
        {pharmacistRegistrationRequests.map((request) => (
          <ListItem key={request._id}>
            <ListItemText primary={request.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AllPharmacistRegistrationRequestsPage;
