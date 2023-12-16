import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

interface PharmacistRegistrationRequestCountProps {
  onViewAllPharmacistRegistrationRequests: () => void;
}

const PharmacistRegistrationRequestCountComponent: React.FC<PharmacistRegistrationRequestCountProps> = ({
  onViewAllPharmacistRegistrationRequests
}) => {
  const [registrationRequestCount, setRegistrationRequestCount] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistrationRequestCount = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/`);
        setRegistrationRequestCount(response.data.length);
      } catch (error) {
        console.error("Error fetching pharmacist registration request count:", error);
      }
    };

    fetchRegistrationRequestCount();
  }, []);

  const handleClick = () => {
    navigate("/admin/view-all-pharmacist-registration-requests");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
      <Card sx={{ width: 200, marginRight: "10px" }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {registrationRequestCount !== null ? registrationRequestCount : "Loading..."}
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Pharmacist Registration Requests
          </Typography>
          <Button variant="outlined" onClick={handleClick} fullWidth>
            View All Registration Requests
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PharmacistRegistrationRequestCountComponent;
