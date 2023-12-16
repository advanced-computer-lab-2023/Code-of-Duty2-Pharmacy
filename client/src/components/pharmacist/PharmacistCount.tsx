import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";
import { viewPharmacistsRoute } from "../../data/routes/adminRoutes";

interface PharmacistCountProps {
  onViewAllPharmacists: () => void;
}

const PharmacistCountComponent: React.FC<PharmacistCountProps> = ({ onViewAllPharmacists }) => {
  const [pharmacistCount, setPharmacistCount] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPharmacistCount = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/pharmacists/`);
        setPharmacistCount(response.data.length);
      } catch (error) {
        console.error("Error fetching pharmacist count:", error);
      }
    };

    fetchPharmacistCount();
  }, []);

  const handleClick = () => {
    navigate(viewPharmacistsRoute.path);
  };

  return (
    <Card style={{ width: "25%", marginLeft: "10px" }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          {pharmacistCount !== null ? pharmacistCount : "Loading..."}
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Pharmacists
        </Typography>
        <Button variant="outlined" onClick={handleClick} fullWidth>
          View All Pharmacists
        </Button>
      </CardContent>
    </Card>
  );
};

export default PharmacistCountComponent;
