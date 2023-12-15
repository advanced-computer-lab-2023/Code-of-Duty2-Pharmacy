import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import config from "../../config/config";
import { Medicine } from "../../types";
import ConfirmationModal from "../../components/modals/ConfirmationDialog";

const DoctorManagePrescriptionsPage = () => {
  const [prescription, setPrescription] = useState<any>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [search, setSearch] = useState("");
  const [prescriptionMedicines, setPrescriptionMedicines] = useState<Medicine[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { prescriptionId } = useParams();

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/prescriptions/${prescriptionId}`);
        setPrescription(response.data.prescription);
        setPrescriptionMedicines(response.data.prescription.medicines.map((medicine: any) => medicine.medicineId));
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    fetchPrescription();
  }, [prescriptionId]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/medicines`);
        setMedicines(response.data.medicines);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  const handleSelectMedicine = async (medicine: Medicine) => {
    try {
      const response = await axios.post(`${config.API_URL}/prescriptions/${prescriptionId}/medicines`, {
        medicineId: medicine._id
      });
      setPrescription(response.data.prescription);
      setPrescriptionMedicines([...prescriptionMedicines, medicine]);
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };

  const handleRemoveMedicine = async (medicine: Medicine) => {
    try {
      const medicineId = medicine._id;
      const response = await axios.delete(`${config.API_URL}/prescriptions/${prescriptionId}/medicines/${medicineId}`);
      setPrescription(response.data.prescription);
      setPrescriptionMedicines(prescriptionMedicines.filter((m) => m._id !== medicine._id));
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const filteredMedicines = search
    ? medicines.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(search.toLowerCase()) &&
          !prescriptionMedicines.some((m) => m._id === medicine._id)
      )
    : [];

  const handleReturnToClinicClick = () => {
    setIsModalOpen(true);
  };

  const handleReturnToClinic = async () => {
    window.location.href = "https://www.example.com"; // TODO: Replace with actual URL.
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={3}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          mt: 2,
          width: "100%",
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Manage Prescription Medication
        </Typography>

        <Typography variant="body1" sx={{ opacity: 0.75, mt: 2 }}>
          Prescription registered for:{" "}
          <span style={{ fontWeight: "bold" }}>{prescription && prescription.patientId.name}</span>
        </Typography>

        <Typography variant="body1" sx={{ opacity: 0.75, mt: 2 }}>
          Prescription ID: <span style={{ fontWeight: "bold" }}>{prescription && `#${prescription._id}`}</span>
        </Typography>

        <Typography variant="h5" color="text.secondary" sx={{ mt: 5 }} gutterBottom>
          Medicines currently in the prescription:
        </Typography>

        <Grid container spacing={2} sx={{ display: "flex", alignItems: "stretch" }}>
          <Grid item xs={12} sm={6}>
            {prescriptionMedicines.length > 0 ? (
              <List>
                {prescriptionMedicines.map((medicine, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar src={medicine.pictureUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={medicine.name} secondary={medicine.description} />
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveMedicine(medicine)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1">There are currently no medicines in this prescription.</Typography>
            )}
          </Grid>

          <Grid item xs={false} sm={1}>
            <Divider orientation="vertical" sx={{ height: "100%", width: "1px" }} flexItem />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Box>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Add a medicine to the prescription:
              </Typography>

              <TextField
                label="Search for a medicine"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Box mt={2}>
                <List>
                  {filteredMedicines.map((medicine, index) => (
                    <ListItem button key={index} onClick={() => handleSelectMedicine(medicine)}>
                      <ListItemAvatar>
                        <Avatar src={medicine.pictureUrl} />
                      </ListItemAvatar>
                      <ListItemText primary={medicine.name} secondary={medicine.description} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleReturnToClinicClick}
          sx={{ mt: "auto", mb: 2, ml: "auto", mr: "auto", p: 1 }}
        >
          Return to Clinic
        </Button>

        <ConfirmationModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          handleConfirm={handleReturnToClinic}
          title="Returning to Clinic"
          description="You are about to return to the Clinic application. Are you sure you want to proceed?"
        />
      </Paper>
    </Box>
  );
};

export default DoctorManagePrescriptionsPage;
