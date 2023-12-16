import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Pharmacist from "../../types/Pharmacist";
import { NameSearchBar, goSearch } from "../search/NameSearchBar";
import axios from "axios";
import config from "../../config/config";
import {
  Alert,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar
} from "@mui/material";
import { blue, green, grey, purple } from "@mui/material/colors";
import DeletionModal from "../modals/DeletionModal";

const colors = [
  // blue[900],
  // blue[700],
  // blue[500],
  // green[900],
  // grey[900],
  // grey[700],
  // grey[500],
  // "#000000",
  // purple[900],
  // purple[700],
  // purple[500]
  grey[900]
];

const getColorForPharmacist = (pharmacist: Pharmacist) => {
  let hash = 0;
  for (let i = 0; i < pharmacist._id.length; i++) {
    hash = pharmacist._id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

interface Props {
  canDelete: boolean;
}

const PharmacistList: React.FC<Props> = ({ canDelete }) => {
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>([]);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [currentPharmacist, setCurrentPharmacist] = useState<Pharmacist>(pharmacists[0]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pharmacistToDelete, setPharmacistToDelete] = useState<Pharmacist | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    fetchPharmacists();
  }, []);

  const fetchPharmacists = async () => {
    try {
      const response = await goSearch("", "pharmacists", "username");
      setPharmacists(response);
    } catch (err) {
      console.error("Error fetching pharmacists:", err);
    }
  };

  const handlePharmacistSearch = async (searchTerm: string, searchCollection: string, attribute?: string) => {
    try {
      let responseData = await goSearch(searchTerm, searchCollection, attribute);

      setPharmacists(responseData);
    } catch (err: any) {
      if (err.response?.status === 400) {
        fetchPharmacists();
        return;
      } else {
        console.log(err);
      }
    }
  };

  const handleOpen = (index: number) => {
    setDetailsModalOpen(true);
    setCurrentPharmacist(pharmacists[index]);
  };

  const handleClose = () => setDetailsModalOpen(false);

  const deletePharmacist = (pharmacist: Pharmacist) => {
    setPharmacistToDelete(pharmacist);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (pharmacistToDelete) {
      try {
        await axios.delete(`${config.API_URL}/pharmacists/${pharmacistToDelete._id}`);
        fetchPharmacists();
        setSnackbarMessage("Pharmacist deleted successfully.");
        setSnackbarSeverity("success");
      } catch (err) {
        console.error("Error deleting pharmacist:", err);
        setSnackbarMessage("Failed to delete pharmacist.");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
      setDeleteModalOpen(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, m: 4 }}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Pharmacist Information
      </Typography>

      <NameSearchBar
        searchCollection="pharmacists"
        onSearch={handlePharmacistSearch}
        attribute="username"
        initialValue="Search pharmacists with username"
      />
      {/* <NameSearchBar
        searchCollection="pharmacists"
        attribute="email"
        onSearch={handlePharmacistSearch}
        initialValue="(or leave empty for all)"
      /> */}

      {pharmacists.map((pharmacist, index) => (
        <Paper elevation={3} key={index} sx={{ p: 2, mb: 2, mt: 2 }}>
          <Typography variant="h6">
            <Avatar sx={{ bgcolor: getColorForPharmacist(pharmacist), mb: 1 }}>
              {pharmacist.name.charAt(0).toUpperCase()}
            </Avatar>
            {pharmacist.name}{" "}
            <Typography color="textSecondary" component="span">
              @{pharmacist.username}
            </Typography>
          </Typography>

          <Box mb={1} />

          <Box display="flex" justifyContent="space-between">
            <Button
              id={`viewPhButton${index}`}
              key={index}
              sx={{ mr: 1, ml: -1 }}
              onClick={() => handleOpen(index)}
              variant="text"
            >
              View Account Details
            </Button>

            {canDelete && (
              <Button
                key={pharmacist._id}
                variant="contained"
                color="error"
                onClick={() => deletePharmacist(pharmacist)}
              >
                Delete Account
              </Button>
            )}
          </Box>
        </Paper>
      ))}

      <Dialog
        open={detailsModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">{`${currentPharmacist?.name}'s Details`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography id="modal-modal-description" component="div">
              <Box>
                <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                  Name
                </Typography>
                <Typography variant="subtitle1" color="black" mb={1}>
                  {currentPharmacist?.name}
                </Typography>

                <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                  Username
                </Typography>
                <Typography variant="subtitle1" color="black" mb={1}>
                  {currentPharmacist?.username}
                </Typography>

                <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                  Gender
                </Typography>
                <Typography variant="subtitle1" color="black" mb={1}>
                  {currentPharmacist?.gender}
                </Typography>

                <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                  Email
                </Typography>
                <Typography variant="subtitle1" color="black" mb={1}>
                  {currentPharmacist?.email}
                </Typography>

                <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                  Date of Birth
                </Typography>
                <Typography variant="subtitle1" color="black" mb={1}>
                  {currentPharmacist?.dateOfBirth.toString().slice(0, 10)}
                </Typography>

                <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                  Mobile Number
                </Typography>
                <Typography variant="subtitle1" color="black" mb={1}>
                  {currentPharmacist?.mobileNumber}
                </Typography>

                <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                  Hourly Rate
                </Typography>
                <Typography variant="subtitle1" color="black" mb={1}>
                  {currentPharmacist?.hourlyRate}
                </Typography>

                <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                  Affiliation
                </Typography>
                <Typography variant="subtitle1" color="black" mb={1}>
                  {currentPharmacist?.affiliation}
                </Typography>

                <Typography variant="subtitle1" color="black" sx={{ fontWeight: "bold" }}>
                  Educational Background
                </Typography>
                <Typography variant="subtitle1" color="black" mb={1}>
                  {currentPharmacist?.educationalBackground}
                </Typography>
              </Box>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pt: 2, pr: 4, pb: 3 }}>
          <Button onClick={handleClose} sx={{ color: "black" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <DeletionModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleDelete={handleDeleteConfirm}
        title="Deleting Pharmacist"
        description={`Are you sure you want to delete ${pharmacistToDelete?.name}?`}
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

export default PharmacistList;
