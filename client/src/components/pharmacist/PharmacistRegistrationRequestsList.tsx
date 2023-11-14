import { useState, useEffect } from "react";
import axios from "axios";

import config from "../../config/config";

import { PharmacistRegistrationRequest } from "../../types";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const PharmacistRegistrationRequestsList: React.FC = () => {
  const [requests, setRequests] = useState<PharmacistRegistrationRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<
    PharmacistRegistrationRequest[]
  >([]);
  const [filter, setFilter] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<PharmacistRegistrationRequest[]>(
        `${config.API_URL}/pharmacist-registration-requests`
      )
      .then((response) => {
        setRequests(response.data);
        setFilteredRequests(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAccept = (username: string) => {
    axios
      .post(
        `${config.API_URL}/pharmacist-registration-requests/accept-pharmacist-request`,
        {
          username: username,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setRequests(
            requests.filter((request) => request.username !== username)
          );
          setFilteredRequests(
            filteredRequests.filter((request) => request.username !== username)
          );
        }
      });
  };
  const handleReject = (username: string) => {
    axios
      .post(
        `${config.API_URL}/pharmacist-registration-requests/reject-pharmacist-request`,
        {
          username: username,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setRequests(
            requests.filter((request) => request.username !== username)
          );
          setFilteredRequests(
            filteredRequests.filter((request) => request.username !== username)
          );
        }
      });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    setFilteredRequests(
      requests.filter((request) => request.username.includes(newFilter))
    );
  };

  return (
    <div style={{ padding: "2.0rem" }}>
      <hr />
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Pharmacist Registration Requests
      </h1>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter by username"
        style={{
          padding: "10px",
          fontSize: "1.2rem",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      />
      <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
        {filteredRequests.map((request) => (
          <li
            key={request._id}
            style={{
              marginBottom: "20px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <Button
              style={{ float: "right" }}
              variant="contained"
              color="primary"
              onClick={() =>
                navigate(
                  `/admin/view-pharmacist-request/?request=${JSON.stringify(
                    request
                  )}`
                )
              }
            >
              View
            </Button>
            <p style={{ margin: "0", fontSize: "1.2rem" }}>
              <strong>Name: </strong> {request.name}{" "}
              <span style={{ color: "#949494" }}>({request.username})</span>
            </p>
            <p style={{ margin: "0", fontSize: "1.2rem" }}>
              <strong>Email:</strong> {request.email}
            </p>
            <div style={{ float: "right" }}>
              <div style={{ paddingRight: "1.0rem", display: "inline" }}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleAccept(request.username)}
                >
                  Accept
                </Button>
              </div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleReject(request.username)}
              >
                Reject
              </Button>
            </div>

            <p style={{ margin: "0", fontSize: "1.2rem" }}>
              <strong>Status:</strong> {request.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PharmacistRegistrationRequestsList;
