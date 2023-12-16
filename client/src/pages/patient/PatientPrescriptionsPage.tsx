import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  Button,
  MenuItem,
  Menu,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MedicationIcon from "@mui/icons-material/Medication";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import TableLoadingSkeleton from "../../components/common/TableLoadingSkeleton";
import { Prescription } from "../../types";
import config from "../../config/config";

const deleteModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  px: 4,
  pt: 1.5,
  pb: 4
};

const PatientPrescriptionsPage: React.FC = () => {
  const [viewModal, setViewModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription>();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const response: AxiosResponse = await axios.get(`${config.API_URL}/patients/payable-prescriptions`);
      setPrescriptions(response.data);
    };
    fetchPrescriptions();
  }, []);

  const printDate = (date: string): string => {
    const dateObj: Date = new Date(date);
    return `${dateObj.getDate()} - ${dateObj.getMonth() + 1} - ${dateObj.getFullYear()}`;
  };

  const viewSelectedPrescription = (index: number) => {
    setSelectedPrescription(prescriptions[index]);
    setViewModal(true);
  };

  const handleAddToCart = async (_id: string): Promise<void> => {
    const body = {
      medicineId: _id,
      quantity: 1
      // OTC: true
    };

    try {
      await axios.post(`${config.API_URL}/patients/me/cart`, body);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ ml: "3%" }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Recent prescriptions
      </Typography>

      <Typography variant="subtitle1" color="primary" gutterBottom>
        View your recent prescriptions, add their medication to your cart.
      </Typography>

      <TableContainer sx={{ mt: "2%", maxWidth: "60%" }} component={Paper}>
        <Table sx={{ maxWidth: 850, minHeight: 100, width: "100%", margin: "auto" }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "text.primary", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Prescribed By</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Status
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Date
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Options
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!prescriptions ? (
              <TableLoadingSkeleton columns={4} />
            ) : (
              prescriptions?.map((prescription: any, index: number) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    Dr. {prescription.doctorId.name}
                  </TableCell>
                  <TableCell align="center">{prescription.status}</TableCell>
                  <TableCell align="center">{printDate(prescription.updatedAt.toString())}</TableCell>
                  <TableCell align="center">
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <>
                          <Button
                            variant="contained"
                            sx={{
                              boxShadow: "none",
                              backgroundColor: "white",
                              color: "black",
                              "&:hover": {
                                backgroundColor: "white"
                              }
                            }}
                            {...bindTrigger(popupState)}
                          >
                            <MoreHorizIcon />
                          </Button>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem
                              onClick={() => {
                                popupState.close;
                                viewSelectedPrescription(index);
                              }}
                            >
                              <Button endIcon fullWidth sx={{ border: "1px solid #103939" }}>
                                <MedicationIcon />
                                View Medicines
                              </Button>
                            </MenuItem>
                          </Menu>
                        </>
                      )}
                    </PopupState>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={viewModal}
        onClose={() => setViewModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={deleteModalStyle}>
          <Box sx={{ float: "right" }}>
            <IconButton sx={{ mb: "2.5%" }} onClick={() => setViewModal(false)} aria-label="delete">
              <CloseIcon />
            </IconButton>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Medicine</TableCell>
                  <TableCell align="center">Dosage</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Add to Cart</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {selectedPrescription?.medicines.map((medicine: any, index: number) => (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{medicine.medicineId.name}</TableCell>
                    <TableCell align="center">{medicine.dosage}</TableCell>
                    <TableCell align="center">{medicine.medicineId.price}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleAddToCart(medicine.medicineId._id)}
                        aria-label="delete"
                        sx={{ color: "green" }}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Box>
  );
};

export default PatientPrescriptionsPage;
