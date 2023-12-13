import { useEffect, useState } from "react";

import Admin from "../../types/Admin";
import axios from "axios";
import config from "../../config/config";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead
} from "@mui/material";
// import { jwtDecode } from 'jwt-decode';

const ManageAdmins = () => {
  //////////////////////////// for adding admins
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newAdminUsername, setNewAdminUsername] = useState("");

  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  //////////////////// for viewing and deleting admins

  const [Admins, setAdmins] = useState<Admin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<Array<boolean>>([]);
  const [deletedAdminUsername, setDeletedAdminUsername] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);
  useEffect(() => {
    setIsDeleting(new Array(Admins.length).fill(false));
  }, [Admins]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/admins`);
      setAdmins(response.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsernameErrorMessage("");
    setPasswordError(false);
    setShowSuccessAlert(false);
    setNewAdminUsername("");
    setDeletedAdminUsername("");

    const requestBody = {
      username,
      password
    };
    if (username === "") {
      setUsernameErrorMessage("Username is required");
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }

    setIsLoading(true);
    axios
      .post(`${config.API_URL}/admins`, requestBody)
      .then((_response) => {
        setShowSuccessAlert(true);
        fetchAdmins();
        setNewAdminUsername(username);
        setDeletedAdminUsername("");
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          setUsernameErrorMessage(error.response.data.message);
        } else {
          alert("An error occurred while adding the admin.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteAdmin = async (id: string, index: number) => {
    setShowSuccessAlert(false);
    console.log("deleting admin with id", id);
    setIsDeleting((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    try {
      await axios.delete(`${config.API_URL}/admins/${id}`);
      fetchAdmins();
      setDeletedAdminUsername(Admins[index].username);
    } catch (err) {
      console.error("Error deleting Admin:", err);
    } finally {
      setIsDeleting((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }
    setSearchTerm("");
  };

  return (
    <div style={{ padding: "2.0rem" }}>
      <h1 style={{ textAlign: "center", fontSize: "2vw" }}>Manage Admins </h1>
      <hr />
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "start" }}>Add Admin </h1>
          {showSuccessAlert && (
            <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
              Admin <strong> {newAdminUsername} </strong> added successfully!
            </Alert>
          )}
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            placeholder="Enter username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameErrorMessage !== ""}
            helperText={usernameErrorMessage !== "" ? usernameErrorMessage : ""}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            error={passwordError}
            helperText={passwordError ? "Password is required" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isLoading}>
              Add Admin
            </LoadingButton>
          </Box>
        </form>
      </Box>
      <br />
      <hr />
      {/* view and delete admins */}
      <Box display="flex" flexDirection="column" alignItems="flex-start" style={{ width: "30%" }}>
        <h1>View & Delete Admins </h1>

        {deletedAdminUsername !== "" && (
          <Alert severity="success" onClose={() => setDeletedAdminUsername("")} style={{ width: "100%" }}>
            Admin <strong> {deletedAdminUsername} </strong> deleted successfully!
          </Alert>
        )}

        <TextField
          margin="normal"
          label="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <br />

        {Admins.filter((admin) => admin.username.includes(searchTerm)).length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <strong> Username</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Admins.filter((admin) => admin.username.includes(searchTerm)).map((admin, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p>{admin.username} </p>
                        <LoadingButton
                          color="error"
                          variant="contained"
                          loading={isDeleting[index]}
                          onClick={() => {
                            deleteAdmin(admin._id, index);
                          }}
                        >
                          Delete
                        </LoadingButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No admins usernames matched your search.</p>
        )}
      </Box>
    </div>
  );
};

export default ManageAdmins;
