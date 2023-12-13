import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Container,
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
        medicine
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
      setPrescription(response.data);
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

  return (
    <Container>
      {/* <Typography variant="body1">Prescription: {prescription && JSON.stringify(prescription)}</Typography> */}

      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, mt: 2 }}>
          <Typography variant="h4" gutterBottom>
            Prescription #{prescriptionId}
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.6, mt: 2 }}>
            Registered for Patient:{" "}
            <span style={{ fontWeight: "bold" }}>{prescription && prescription.patientId.name}</span>
          </Typography>

          <Typography variant="h5" sx={{ mt: 2 }}>
            Prescription Medicines
          </Typography>

          <Box mt={2}>
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
          </Box>

          <TextField
            label="Search for a medicine"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mt: 2 }}
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
        </Paper>
      </Box>
    </Container>
  );
};

export default DoctorManagePrescriptionsPage;
