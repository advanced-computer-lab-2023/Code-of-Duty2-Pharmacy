import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const AllAdminsPage: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllAdmins = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/admins/`);
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAllAdmins();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        All Admins
      </Typography>
      <List>
        {admins.map((admin) => (
          <ListItem key={admin._id}>
            <ListItemText primary={admin.username} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AllAdminsPage;
