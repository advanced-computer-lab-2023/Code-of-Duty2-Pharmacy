import { useNavigate } from "react-router-dom";
import PharmacistRegistrationRequest from "../../types/PharmacistRegistrationRequest";
import Button from "@mui/material/Button";
import config from "../../config/config";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const ViewPharmacistRequestForm = () => {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const request = JSON.parse(params.get("request") as string | "") as PharmacistRegistrationRequest;
  console.log(request);

  const handleAccept = (username: string) => {
    axios
      .post(`${config.API_URL}/pharmacist-registration-requests/accept-pharmacist-request`, {
        username: username
      })
      .then((response) => {
        if (response.status === 200) {
          navigate(`/admin/pharmacist-registration-requests`);
        }
      });
  };
  const handleReject = (username: string) => {
    axios
      .post(`${config.API_URL}/pharmacist-registration-requests/reject-pharmacist-request`, {
        username: username
      })
      .then((response) => {
        if (response.status === 200) {
          navigate(`/admin/pharmacist-registration-requests`);
        }
      });
  };

  return (
    <div style={{ padding: "2.0rem" }}>
      <Button
        startIcon={<ArrowBack />}
        variant="text"
        onClick={() => navigate(`/admin/pharmacist-registration-requests`)}
      >
        Back To Requests
      </Button>
      <Typography my={3} variant="h4" gutterBottom component="div" color="primary">
        View Request
      </Typography>
      <Box
        sx={{
          border: "1px solid #ddd", // Border color
          boxShadow: "0 2px 40px rgba(0, 0, 0, 0.1)", // Box shadow
          padding: "16px", // Adjust padding as needed
          borderRadius: "18px", // Border radius
          display: "grid",
          gridTemplateColumns: { md: "1fr 1fr" },
          gap: 2
        }}
      >
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Name:</strong> {request.name}
        </p>
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Username:</strong> {request.username}
        </p>
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Email:</strong> {request.email}
        </p>
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Date of Birth:</strong> {new Date(request.dateOfBirth).toLocaleDateString()}
        </p>
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Hourly Rate:</strong> {request.hourlyRate}
        </p>
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Affiliation:</strong> {request.affiliation}
        </p>
        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Educational Background:</strong> {request.educationalBackground}
        </p>

        <p style={{ margin: "0", fontSize: "1.2rem" }}>
          <strong>Status:</strong> {request.status}
        </p>
        <br />
      </Box>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center" // Center horizontally
        }}
      >
        <div style={{ paddingRight: "1.0rem", display: "inline" }}>
          <Button variant="outlined" color="error" onClick={() => handleReject(request.username)}>
            Reject
          </Button>
        </div>

        <Button variant="outlined" color="success" onClick={() => handleAccept(request.username)}>
          Accept Request
        </Button>
      </div>
    </div>
  );
};

export default ViewPharmacistRequestForm;
