import { useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";
import { viewPharmacistRegistrationRequestsRoute } from "../../data/routes/adminRoutes";

interface Props {
  pharmacistRegistrationRequestCount: number;
  setPharmacistRegistrationRequestCount: React.Dispatch<React.SetStateAction<number>>;
}

const PharmacistRegistrationRequestCountComponent: React.FC<Props> = ({
  pharmacistRegistrationRequestCount,
  setPharmacistRegistrationRequestCount
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistrationRequestCount = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/`);
        setPharmacistRegistrationRequestCount(response.data.length);
      } catch (error) {
        console.error("Error fetching pharmacist registration request count:", error);
      }
    };

    fetchRegistrationRequestCount();
  }, []);

  const handleClick = () => {
    navigate(viewPharmacistRegistrationRequestsRoute.path);
  };

  return (
    <Card style={{ display: "inline-block", alignItems: "center" }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          {pharmacistRegistrationRequestCount !== null ? pharmacistRegistrationRequestCount : "Loading..."}
        </Typography>

        <Typography variant="subtitle1" align="center" gutterBottom>
          Pharmacist Registration Requests
        </Typography>

        <Button variant="outlined" onClick={handleClick} fullWidth>
          View All Registration Requests
        </Button>
      </CardContent>
    </Card>
  );
};

export default PharmacistRegistrationRequestCountComponent;
