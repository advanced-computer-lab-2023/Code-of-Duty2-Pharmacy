import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

import config from "../../config/config";

const PatientRegistration = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState({
    fullname: "",
    mobileNumber: "",
    relationToPatient: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestBody = {
      username,
      name,
      email,
      password,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContact,
    };

    axios
      .post(`${config.API_URL}/register/patient`, requestBody)
      .then((response) => {
        console.log(response.data);
        alert("Patient registered successfully!");
        // make http request to localhost:5173/Home
        // window.location.href = "http://localhost:5173/";
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "username already exists"
        ) {
          alert("username already exists!");
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message === "email already exists"
        ) {
          alert("email already exists!");
        } else {
          alert("An error occurred while registering the pharmacist.");
        }
      });
  };
  return (
    <>
      {/* TODO: Fix this file's styling, form validation and submit handling */}
      <Button onClick={() => navigate("/")} sx={{ mb: 5, fontSize: "1.2rem" }}>
        Back to Home
      </Button>
      <form onSubmit={handleSubmit}>
        <h1>Patient Registration</h1>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            required
          >
            <option value="">Select a gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(event) => setMobileNumber(event.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="emergencyContactFullName">
            Emergency Contact Full Name:
          </label>
          <input
            type="text"
            id="emergencyContactFullName"
            value={emergencyContact.fullname}
            onChange={(event) =>
              setEmergencyContact({
                ...emergencyContact,
                fullname: event.target.value,
              })
            }
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="emergencyContactMobileNumber">
            Emergency Contact Mobile Number:
          </label>
          <input
            type="tel"
            id="emergencyContactMobileNumber"
            value={emergencyContact.mobileNumber}
            onChange={(event) =>
              setEmergencyContact({
                ...emergencyContact,
                mobileNumber: event.target.value,
              })
            }
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="emergencyContactRelation">
            Emergency Contact Relation:
          </label>
          <input
            type="text"
            id="emergencyContactRelation"
            value={emergencyContact.relationToPatient}
            onChange={(event) =>
              setEmergencyContact({
                ...emergencyContact,
                relationToPatient: event.target.value,
              })
            }
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default PatientRegistration;
