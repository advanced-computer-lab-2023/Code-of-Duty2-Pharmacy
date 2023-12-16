import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

interface AdminCountProps {
  onViewAllAdmins: () => void;
}

const AdminCountComponent: React.FC<AdminCountProps> = ({ onViewAllAdmins }) => {
  const [adminCount, setAdminCount] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/admins/`);
        setAdminCount(response.data.length);
      } catch (error) {
        console.error("Error fetching admin count:", error);
      }
    };

    fetchAdminCount();
  }, []);

  const handleClick = () => {
    navigate("/admin/view-all-admins");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
      <Card sx={{ width: 200, marginRight: "10px" }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {adminCount !== null ? adminCount : "Loading..."}
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Admins
          </Typography>
          <Button variant="outlined" onClick={handleClick} fullWidth>
            View All Admins
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminCountComponent;
