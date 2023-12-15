import { useState, useEffect } from "react";
import axios from "axios";

import config from "../../config/config";

import { PharmacistRegistrationRequest } from "../../types";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";

const PharmacistRegistrationRequestsList: React.FC = () => {
  const [requests, setRequests] = useState<PharmacistRegistrationRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<PharmacistRegistrationRequest[]>([]);
  const [filter, setFilter] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<PharmacistRegistrationRequest[]>(`${config.API_URL}/pharmacist-registration-requests`)
      .then((response) => {
        setRequests(response.data);
        setFilteredRequests(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAccept = (username: string) => {
    axios
      .post(`${config.API_URL}/pharmacist-registration-requests/accept-pharmacist-request`, {
        username: username
      })
      .then((response) => {
        if (response.status === 200) {
          setRequests(requests.filter((request) => request.username !== username));
          setFilteredRequests(filteredRequests.filter((request) => request.username !== username));
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
          setRequests(requests.filter((request) => request.username !== username));
          setFilteredRequests(filteredRequests.filter((request) => request.username !== username));
        }
      });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    setFilteredRequests(requests.filter((request) => request.username.includes(newFilter)));
  };

  return (
    <div style={{ padding: "2.0rem" }}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Pharmacist Registration Requests
      </Typography>

      <TextField margin="normal" label="Filter by username" value={filter} fullWidth onChange={handleFilterChange} />

      <Box>
        {filteredRequests.map((request) => (
          <Paper
            key={request._id}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: "5px"
            }}
          >
            <Button
              variant="text"
              color="primary"
              sx={{ ml: -1, fontSize: "1rem" }}
              onClick={() => navigate(`/admin/view-pharmacist-request/?request=${JSON.stringify(request)}`)}
            >
              View Application Details
            </Button>

            <Typography>
              <span style={{ color: grey[700] }}>@{request.username}</span>
            </Typography>

            <Box mb={0.9} />

            <Typography>
              <strong>Name: </strong> {request.name}
            </Typography>

            <Typography>
              <strong>Email:</strong> {request.email}
            </Typography>

            <Box sx={{ float: "right" }}>
              <Button variant="text" color="error" onClick={() => handleReject(request.username)}>
                Reject
              </Button>

              <Button variant="text" color="success" onClick={() => handleAccept(request.username)}>
                Accept Request
              </Button>
            </Box>

            <Typography>
              <strong>Status:</strong> {request.status}
            </Typography>
          </Paper>
        ))}
      </Box>
    </div>
  );
};

export default PharmacistRegistrationRequestsList;
