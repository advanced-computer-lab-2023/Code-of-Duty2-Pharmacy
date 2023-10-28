import { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import { Button } from "@mui/material";

const PharmacistRegistrationRequest = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [educationalBackground, setEducationalBackground] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestBody = {
      username,
      name,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
    };

    axios
      .post(`${config.API_URL}/register/pharmacist`, requestBody)
      .then((response) => {
        console.log(response.data);
        alert(
          "pharmacist registration request done successfully! , the admins will review your request and accept it if you are eligible !"
        );
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
      <Button
        onClick={() => (window.location.href = "/")}
        sx={{ mb: 5, fontSize: "1rem" }}
      >
        Back to Home
      </Button>
      <form onSubmit={handleSubmit}>
        <h1>Pharmacist Registration</h1>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Date of Birth:
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Hourly Rate:
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Affiliation:
          <input
            type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Educational Background:
          <input
            type="text"
            value={educationalBackground}
            onChange={(e) => setEducationalBackground(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PharmacistRegistrationRequest;
