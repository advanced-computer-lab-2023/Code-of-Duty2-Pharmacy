import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@mui/material";
import { blue, green, grey, pink, purple } from "@mui/material/colors";

import config from "../../config/config";
import { Patient } from "../../types";
import DeletionModal from "../modals/DeletionModal";

const colors = [
  blue[900],
  // blue[700],
  // blue[500],
  green[900],
  // grey[900],
  // grey[700],
  // grey[500],
  // "#000000",
  purple[900],
  // purple[700],
  // purple[500]
  grey[900],
  pink[900]
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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

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

  const handleOpenDialog = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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

      {/* TODO: Turn into a search bar after pagination */}
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
                <Box display="flex" justifyContent="space-between">
                  <Button sx={{ ml: -1 }} variant="text" color="primary" onClick={() => handleOpenDialog(patient)}>
                    View Account Details
                  </Button>
                  {canDelete && (
                    <Button variant="contained" color="error" onClick={() => deletePatient(patient)}>
                      Delete Account
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">{selectedPatient?.name}'s Details</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedPatient && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                    Name
                  </Typography>
                  <Typography variant="subtitle1" color="black">
                    {selectedPatient.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                    Username
                  </Typography>
                  <Typography variant="subtitle1" color="black">
                    {selectedPatient.username}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                    Gender
                  </Typography>
                  <Typography variant="subtitle1" color="black">
                    {selectedPatient.gender.charAt(0).toUpperCase() + selectedPatient.gender.slice(1)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                    Date of Birth
                  </Typography>
                  <Typography variant="subtitle1" color="black">
                    {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                    Email
                  </Typography>
                  <Typography variant="subtitle1" color="black">
                    {selectedPatient.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                    Mobile Number
                  </Typography>
                  <Typography variant="subtitle1" color="black">
                    {selectedPatient.mobileNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                    Emergency Contact Name
                  </Typography>
                  <Typography variant="subtitle1" color="black">
                    {selectedPatient.emergencyContact.fullname}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                    Emergency Contact Mobile Number
                  </Typography>
                  <Typography variant="subtitle1" color="black">
                    {selectedPatient.emergencyContact.mobileNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                    Emergency Contact Relation To Patient
                  </Typography>
                  <Typography variant="subtitle1" color="black">
                    {selectedPatient.emergencyContact.relationToPatient}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
