import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";

import config from "../../config/config";
import { welcomeRoute } from "../../data/routes/guestRoutes";
import { AuthContext } from "../../contexts/AuthContext";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";

const PatientRegistration = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    try {
      await axios.post(`${config.API_URL}/register/patient`, requestBody);

      // Start loading when register succeeded but now attempting to login
      setLoading(true);

      const response = await axios.post(`${config.API_URL}/auth/login`, {
        username,
        password,
      });

      const data = response.data;
      login(data.accessToken, data.role);
      navigate(patientDashboardRoute.path);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* TODO: Fix this file's styling, form validation and error handling */}
      <Button
        onClick={() => navigate(welcomeRoute.path)}
        sx={{ mb: 5, fontSize: "1.2rem" }}
      >
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
