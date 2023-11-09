import React from "react";
import { useLocation } from "react-router-dom";
import PharmacistRegistrationRequest from "../../types/PharmacistRegistrationRequest";
import Button from "@mui/material/Button";

const ViewPharmacistRequestForm = () => {
  const params = new URLSearchParams(window.location.search);
  const request = JSON.parse(
    params.get("request") as string | ""
  ) as PharmacistRegistrationRequest;
  console.log(request);

  // Fetch the request data based on the requestId using an API call or other data source
  // You may need to manage the state or use context to pass the request data to this component

  return (
    <div>
      <h1>View Request</h1>
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
        <strong>Educational Background:</strong> {request.educationalBackground}
      </p>
      <div style={{ float: "right" }}>
        <Button variant="outlined" color="success">
          Accept
        </Button>
        <Button variant="outlined" color="error">
          Reject
        </Button>
      </div>

      <p style={{ margin: "0", fontSize: "1.2rem" }}>
        <strong>Status:</strong> {request.status}
      </p>
    </div>
  );
};

export default ViewPharmacistRequestForm;
