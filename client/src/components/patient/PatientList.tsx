import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, Grid, Avatar, TextField, Snackbar, Alert } from "@mui/material";
import { blue, green, grey, purple } from "@mui/material/colors";

import config from "../../config/config";
import { Patient } from "../../types";
import DeletionModal from "../modals/DeletionModal";

const colors = [
  blue[900],
  blue[700],
  blue[500],
  green[900],
  grey[900],
  grey[700],
  grey[500],
  "#000000",
  purple[900],
  purple[700],
  purple[500]
];

const getColorForPatient = (patient: Patient) => {
  let hash = 0;
  for (let i = 0; i < patient._id.length; i++) {
    hash = patient._id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

interface Props {
  canDelete: boolean;
}

const PatientList: React.FC<Props> = ({ canDelete }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get<Patient[]>(`${config.API_URL}/patients`);
      setPatients(response.data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const deletePatient = (patient: Patient) => {
    setPatientToDelete(patient);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (patientToDelete) {
      try {
        await axios.delete(`${config.API_URL}/patients/${patientToDelete._id}`);
        fetchPatients();
        setSnackbarMessage("Patient deleted successfully.");
        setSnackbarSeverity("success");
      } catch (err) {
        console.error("Error deleting patient:", err);
        setSnackbarMessage("Failed to delete patient.");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
      setDeleteModalOpen(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, m: 4 }}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Patient Information
      </Typography>

      <TextField
        variant="outlined"
        label="Search by name or username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      {patients
        .filter(
          (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((patient) => (
          <Paper elevation={3} key={patient._id} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <Avatar sx={{ bgcolor: getColorForPatient(patient), mb: 1 }}>
                    {patient.name.charAt(0).toUpperCase()}
                  </Avatar>{" "}
                  {patient.name}{" "}
                  <Typography variant="body1" color="textSecondary" component="span">
                    @{patient.username}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold" }}>
                  Gender
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold" }}>
                  Date of Birth
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {new Date(patient.dateOfBirth).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold" }}>
                  Email
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {patient.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold" }}>
                  Mobile Number
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {patient.mobileNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold" }}>
                  Emergency Contact Name
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {patient.emergencyContact.fullname}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold" }}>
                  Emergency Contact Mobile Number
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {patient.emergencyContact.mobileNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold" }}>
                  Emergency Contact Relation To Patient
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {patient.emergencyContact.relationToPatient}
                </Typography>
              </Grid>
              {canDelete && (
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button variant="contained" color="error" onClick={() => deletePatient(patient)}>
                    Delete Account
                  </Button>
                </Grid>
              )}
            </Grid>
          </Paper>
        ))}
      <DeletionModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleDelete={handleDeleteConfirm}
        title="Deleting Patient"
        description={`Are you sure you want to delete ${patientToDelete?.name}?`}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} elevation={6} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientList;
