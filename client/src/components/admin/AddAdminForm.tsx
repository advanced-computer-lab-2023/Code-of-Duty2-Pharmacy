import React, { useState } from "react";
import axios from "axios";

import config from "../../config/config";

const AddAdminForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestBody = {
      username,
      password,
    };

    axios
      .post(`${config.API_URL}/admins`, requestBody)
      .then((response) => {
        alert("Admin added successfully!");
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "username already exists"
        ) {
          alert("An admin with this username already exists!");
        } else {
          alert("An error occurred while adding the admin.");
        }
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <hr />
      <h1>Add Admin</h1>
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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit">Add Admin</button>
    </form>
  );
};

export default AddAdminForm;
