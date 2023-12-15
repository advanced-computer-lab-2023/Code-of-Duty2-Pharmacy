import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import config from "../../config/config";
import { welcomeRoute } from "../../data/routes/guestRoutes";
import { AuthContext } from "../../contexts/AuthContext";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { patientLoginRoute } from "../../data/routes/loginRoutes";

const PatientRegistration = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<dayjs.Dayjs | null>(null);
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emergencyContactFullName, setEmergencyContactFullName] = useState("");
  const [emergencyContactMobileNumber, setEmergencyContactMobileNumber] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");

  const [loading, setLoading] = useState(false);
  const [isVerifyingNow, setIsVerifyingNow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [dateOfBirthErrorMessage, setDateOfBirthErrorMessage] = useState("");
  const [genderError, setGenderError] = useState(false);
  const [mobileNumberErrorMessage, setMobileNumberErrorMessage] = useState("");
  const [emergencyContactNameError, setEmergencyContactNameError] = useState(false);
  const [emergencyContactMobileNumberErrorMessage, setEmergencyContactMobileNumberErrorMessage] = useState("");
  const [emergencyContactRelationError, setEmergencyContactRelationError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUsernameError(false);
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setDateOfBirthErrorMessage("");
    setGenderError(false);
    setMobileNumberErrorMessage("");
    setEmergencyContactNameError(false);
    setEmergencyContactMobileNumberErrorMessage("");
    setEmergencyContactRelationError(false);
    setIsVerifyingNow(false);

    if (username === "") {
      setUsernameError(true);
      return;
    }
    if (name === "") {
      setNameError(true);
      return;
    }
    if (email === "") {
      setEmailError(true);
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }
    const birthDateobject = dateOfBirth?.toDate();
    // print day month and year
    const birthDate = birthDateobject?.getDate();
    const birthMonth = birthDateobject?.getMonth();
    const birthYear = birthDateobject?.getFullYear();
    console.log("birthDate: " + birthDate);
    console.log("birthMonth: " + birthMonth);
    console.log("birthYear: " + birthYear);
    // ensure 3 values are not undefined
    if (birthDate === undefined || birthMonth === undefined || birthYear === undefined) {
      setDateOfBirthErrorMessage("Date of birth is required");
      return;
    }
    // ensure no nan values
    if (isNaN(birthDate) || isNaN(birthMonth) || isNaN(birthYear)) {
      setDateOfBirthErrorMessage("Please enter a valid date of birth");
      return;
    }

    if (gender === "") {
      setGenderError(true);
      return;
    }
    if (mobileNumber === "") {
      setMobileNumberErrorMessage("Mobile number is required");
      return;
    } else if (mobileNumber.length != 11) {
      setMobileNumberErrorMessage("Mobile number must be 11 digits");
      return;
    }

    if (emergencyContactFullName === "") {
      setEmergencyContactNameError(true);
      return;
    }
    if (emergencyContactMobileNumber === "") {
      setEmergencyContactMobileNumberErrorMessage("Emergency Contact Mobile Number is required");
      return;
    } else if (emergencyContactMobileNumber.length != 11) {
      setEmergencyContactMobileNumberErrorMessage("Emergency Contact Mobile Number must be 11 digits");
      return;
    }

    if (emergencyContactRelation === "") {
      setEmergencyContactRelationError(true);
      return;
    }

    const requestBody = {
      username,
      name,
      email,
      password,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContact: {
        fullname: emergencyContactFullName,
        mobileNumber: emergencyContactMobileNumber,
        relationToPatient: emergencyContactRelation
      }
    };

    try {
      setIsVerifyingNow(true);
      await axios
        .post(`${config.API_URL}/register/patient`, requestBody)
        .then(() => {
          // Start loading when register succeeded but now attempting to login
          setLoading(true);
        })
        .catch((error) => {
          if (error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert("An error occurred while registering the patient ! ");
          }
          throw error;
        })
        .finally(() => {
          setIsVerifyingNow(false);
        });

      const response = await axios.post(`${config.API_URL}/auth/login`, {
        username,
        password
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
          height: "100vh"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(welcomeRoute.path)}
        sx={{ mb: 5, ml: 3, mt: 3, fontSize: "1.2rem" }}
      >
        Back to Home
      </Button>
      <Container maxWidth="sm" sx={{ marginTop: "-4rem" }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom component="div" color="primary">
            Register your patient account
          </Typography>

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
            error={usernameError}
            helperText={usernameError ? "Username is required" : ""}
          />
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            placeholder="Enter name"
            autoComplete="name"
            // autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameError ? "Name is required" : ""}
          />
          <TextField
            type="email"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            placeholder="Enter email"
            autoComplete="email"
            // autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Email is required" : ""}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              label="Date of Birth"
              value={dateOfBirth}
              onChange={(newValue) => setDateOfBirth(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal",
                  helperText: dateOfBirthErrorMessage !== "" ? dateOfBirthErrorMessage : "",
                  error: dateOfBirthErrorMessage !== "" ? true : false
                }
              }}
              // onError={() => {setDateOfBirthError(true);} }
            />
          </LocalizationProvider>

          <FormControl fullWidth margin="normal" error={genderError}>
            <InputLabel id="demo-simple-select-label"> Gender </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              error={genderError}
              // helperText={genderError ? "Gender is required" : ""}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
            {genderError && <FormHelperText>Gender is required</FormHelperText>}
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="mobileNumber"
            label="Mobile number"
            name="mobileNumber"
            placeholder="Enter Mobile number"
            autoComplete="mobileNumber"
            // autoFocus
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            error={mobileNumberErrorMessage !== "" ? true : false}
            helperText={mobileNumberErrorMessage !== "" ? mobileNumberErrorMessage : ""}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="emergencyContactFullName"
            label="Emergency Contact Full Name"
            name="emergencyContactFullName"
            placeholder="Enter Emergency Contact Full Name"
            autoComplete="emergencyContactFullName"
            // autoFocus
            value={emergencyContactFullName}
            onChange={(e) => setEmergencyContactFullName(e.target.value)}
            error={emergencyContactNameError}
            helperText={emergencyContactNameError ? "Emergency Contact Full Name is required" : ""}
          />
          <TextField
            margin="normal"
            fullWidth
            id="emergencyContactMobileNumber"
            label="Emergency Contact Mobile Number"
            name="emergencyContactMobileNumber"
            placeholder="Enter Emergency Contact Mobile Number"
            autoComplete="emergencyContactMobileNumber"
            // autoFocus
            value={emergencyContactMobileNumber}
            onChange={(e) => setEmergencyContactMobileNumber(e.target.value)}
            error={emergencyContactMobileNumberErrorMessage !== "" ? true : false}
            helperText={emergencyContactMobileNumberErrorMessage !== "" ? emergencyContactMobileNumberErrorMessage : ""}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="emergencyContactRelation"
            label="Emergency Contact Relation"
            name="emergencyContactRelation"
            placeholder="Enter Emergency Contact Relation"
            autoComplete="emergencyContactRelation"
            // autoFocus
            value={emergencyContactRelation}
            onChange={(e) => setEmergencyContactRelation(e.target.value)}
            error={emergencyContactRelationError}
            helperText={emergencyContactRelationError ? "Emergency Contact Relation is required" : ""}
          />
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isVerifyingNow}>
              Register
            </LoadingButton>
          </Box>
        </form>

        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <NavLink to={patientLoginRoute.path} style={{ color: "inherit" }}>
            Already have an account? Login here
          </NavLink>
        </Box>

        <Box mb={10} />
      </Container>
    </div>
  );
};

export default PatientRegistration;
