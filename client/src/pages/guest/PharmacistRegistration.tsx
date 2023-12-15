import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import config from "../../config/config";
import { welcomeRoute } from "../../data/routes/guestRoutes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { pharmacistDashboardRoute } from "../../data/routes/pharmacistRoutes";

const PharmacistRegistrationRequest = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<dayjs.Dayjs | null>(null);
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [educationalBackground, setEducationalBackground] = useState("");

  const [isVerifyingNow, setIsVerifyingNow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSucceeded, setRegistrationSucceeded] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [dateOfBirthErrorMessage, setDateOfBirthErrorMessage] = useState("");
  const [hourlyRateError, setHourlyRateError] = useState(false);
  const [affiliationError, setAffiliationError] = useState(false);
  const [educationalBackgroundError, setEducationalBackgroundError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUsernameError(false);
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setDateOfBirthErrorMessage("");
    setHourlyRateError(false);
    setAffiliationError(false);
    setEducationalBackgroundError(false);

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
    if (hourlyRate === "") {
      setHourlyRateError(true);
      return;
    }
    // // ensure hourly rate is a number
    // if (isNaN(parseInt(hourlyRate))) {
    //   setHourlyRateErrorMessage("Hourly rate must be a number");
    //   return;
    // }
    // // ensure hourly rate is positive
    // if (parseInt(hourlyRate) <= 0) {
    //   setHourlyRateErrorMessage("Hourly rate must be positive");
    //   return;
    // }

    if (affiliation === "") {
      setAffiliationError(true);
      return;
    }
    if (educationalBackground === "") {
      setEducationalBackgroundError(true);
      return;
    }

    const requestBody = {
      username,
      name,
      email,
      password,
      dateOfBirth,
      hourlyRate: parseInt(hourlyRate),
      affiliation,
      educationalBackground
    };

    try {
      setIsVerifyingNow(true);
      await axios
        .post(`${config.API_URL}/register/pharmacist`, requestBody)
        .then(() => {
          setRegistrationSucceeded(true);
        })
        .catch((error) => {
          if (error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert("An error occurred while registering the pharmacist ! ");
          }
          throw error;
        })
        .finally(() => {
          setIsVerifyingNow(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

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
            Pharmacist Registration
          </Typography>

          {registrationSucceeded && (
            <Alert severity="success">
              Registration Request Done Successfully, We will contact you soon !
              <Link
                to={pharmacistDashboardRoute.path}
                style={{
                  // color: theme.palette.primary.main,
                  display: "inline-block",
                  padding: "5px 10px",
                  // borderRadius: "4px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease"
                }}
              >
                Go to home
              </Link>{" "}
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
          <TextField
            margin="normal"
            fullWidth
            id="hourlyRate"
            label="Hourly Rate (USD / hour)"
            name="hourlyRate"
            placeholder="Enter hourly rate"
            autoComplete="hourlyRate"
            // autoFocus
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            error={hourlyRateError}
            helperText={hourlyRateError ? "Hourly rate is required" : ""}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="affiliation"
            label="Affiliation"
            name="affiliation"
            placeholder="Enter affiliation"
            autoComplete="affiliation"
            // autoFocus
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            error={affiliationError}
            helperText={affiliationError ? "Affiliation is required" : ""}
          />
          <TextField
            margin="normal"
            fullWidth
            id="educationalBackground"
            label="Educational Background"
            name="educationalBackground"
            placeholder="Enter educational background"
            autoComplete="educationalBackground"
            // autoFocus
            value={educationalBackground}
            onChange={(e) => setEducationalBackground(e.target.value)}
            error={educationalBackgroundError}
            helperText={educationalBackgroundError ? "Educational background is required" : ""}
          />

          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isVerifyingNow}>
              Request Registration
            </LoadingButton>
          </Box>
        </form>
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <NavLink to={pharmacistDashboardRoute.path} style={{ color: "inherit" }}>
            Already have an account? Login here
          </NavLink>
        </Box>

        <Box mb={10} />
      </Container>
    </div>
  );
};

export default PharmacistRegistrationRequest;
