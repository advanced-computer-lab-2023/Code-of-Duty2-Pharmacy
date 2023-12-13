import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import axios from "axios";

import { Prescription } from "../../types";
import config from "../../config/config";

const DoctorManagePrescriptionsPage = () => {
  const [prescription, setPrescription] = useState<Prescription | null>(null);

  const { prescriptionId } = useParams();

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/prescriptions/${prescriptionId}`);
        console.log("Prescription:", response.data);
        setPrescription(response.data);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    fetchPrescription();
  }, [prescriptionId]);

  /*
  const addMedicine = async (medicine) => {
    try {
      const response = await axios.post(`${config.API_URL}/prescriptions/${prescriptionId}/medicines`, {
        medicine
      });
      setPrescription(response.data);
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };

  const deleteMedicine = async (medicineId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/prescriptions/${prescriptionId}/medicines/${medicineId}`
      );
      setPrescription(response.data);
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };
  */

  return (
    <>
      <Typography variant="h1">Manage Prescription</Typography>
      <Box>
        <Typography variant="h2">Prescription Details</Typography>
        <Typography variant="body1">Prescription: {prescription && JSON.stringify(prescription)}</Typography>
      </Box>
    </>
  );
};

export default DoctorManagePrescriptionsPage;
