import { useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";
import { addAdminRoute } from "../../data/routes/adminRoutes";

interface AdminCountProps {
  adminCount: number;
  setAdminCount: React.Dispatch<React.SetStateAction<number>>;
}

const AdminCountComponent: React.FC<AdminCountProps> = ({ adminCount, setAdminCount }) => {
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
    navigate(addAdminRoute.path);
  };

  return (
    <Card style={{ display: "inline-block", alignItems: "center" }}>
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
  );
};

export default AdminCountComponent;
