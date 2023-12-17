import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const AllPharmacistsPage: React.FC = () => {
  const [pharmacists, setPharmacists] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllPharmacists = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/pharmacists/`);
        setPharmacists(response.data);
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
      }
    };

    fetchAllPharmacists();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        All Pharmacists
      </Typography>
      <List>
        {pharmacists.map((pharmacist) => (
          <ListItem key={pharmacist._id}>
            <ListItemText primary={pharmacist.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AllPharmacistsPage;
