import { useState, useEffect } from "react";
import axios from "axios";

import config from "../config/config";

import { PharmacistRegistrationRequest } from "../types";

const PharmacistRegistrationRequestsList: React.FC = () => {
  const [requests, setRequests] = useState<PharmacistRegistrationRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<
    PharmacistRegistrationRequest[]
  >([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    axios
      .get<PharmacistRegistrationRequest[]>(
        `${config.API_URL}/pharmacist-registration-requests`
      )
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
        setFilteredRequests(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    setFilteredRequests(
      requests.filter((request) => request.username.includes(newFilter))
    );
  };

  return (
    <div>
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
              <strong>Date of Birth:</strong>{" "}
              {new Date(request.dateOfBirth).toLocaleDateString()}
            </p>
            <p style={{ margin: "0", fontSize: "1.2rem" }}>
              <strong>Hourly Rate:</strong> {request.hourlyRate}
            </p>
            <p style={{ margin: "0", fontSize: "1.2rem" }}>
              <strong>Affiliation:</strong> {request.affiliation}
            </p>
            <p style={{ margin: "0", fontSize: "1.2rem" }}>
              <strong>Educational Background:</strong>{" "}
              {request.educationalBackground}
            </p>
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
