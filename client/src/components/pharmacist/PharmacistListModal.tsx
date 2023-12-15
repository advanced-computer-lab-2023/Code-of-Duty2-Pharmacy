import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Pharmacist from "../../types/Pharmacist";
import { NameSearchBar, goSearch } from "../search/NameSearchBar";
import axios from "axios";
import config from "../../config/config";
import { Avatar } from "@mui/material";
import { blue, green, grey, purple } from "@mui/material/colors";

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

const PharmacistListModal: React.FC<Props> = ({ canDelete }) => {
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>([]);
  const [open, setOpen] = useState(false);
  const [currentPharmacist, setCurrentPharmacist] = useState<Pharmacist>(pharmacists[0]);

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

  const deletePharmacist = async (id: string) => {
    try {
      await axios.delete(`${config.API_URL}/pharmacists/${id}`);
      fetchPharmacists();
    } catch (err) {
      console.error("Error deleting pharmacist:", err);
    }
  };

  const handleOpen = (index: number) => {
    setOpen(true);
    setCurrentPharmacist(pharmacists[index]);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1, m: 4 }}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Pharmacist Information
      </Typography>

      <NameSearchBar
        searchCollection="pharmacists"
        onSearch={handlePharmacistSearch}
        attribute="username"
        initialValue="(or leave empty for all)"
      />
      {/* <NameSearchBar
        searchCollection="pharmacists"
        attribute="email"
        onSearch={handlePharmacistSearch}
        initialValue="(or leave empty for all)"
      /> */}

      {pharmacists.map((pharmacist, index) => (
        <Box key={index}>
          <Box>
            {pharmacist.name} <span style={{ color: "textSecondary" }}>{`@${pharmacist.username}`}</span>
          </Box>
          <Typography variant="h6" color="secondary">
            <Avatar sx={{ bgcolor: getColorForPharmacist(pharmacist) }}>
              {pharmacist.name.charAt(0).toUpperCase()}
            </Avatar>{" "}
            {pharmacist.name}{" "}
            <Typography variant="body1" color="textSecondary" component="span">
              @{pharmacist.username}
            </Typography>
          </Typography>
          <div
            style={{
              display: "block",
              paddingTop: "0rem",
              paddingLeft: "1.2rem"
            }}
          >
            <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold" }}>
              Email
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {pharmacist.email}
            </Typography>
          </div>
          <Button
            id={`viewPhButton${index}`}
            key={index}
            onClick={() => handleOpen(index)}
            style={{ float: "right" }}
            variant="outlined"
          >
            View Pharmacist
          </Button>

          {canDelete && (
            <Button
              key={pharmacist._id}
              style={{ float: "right" }}
              variant="outlined"
              onClick={() => deletePharmacist(pharmacist._id)}
            >
              Delete
            </Button>
          )}
        </Box>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography variant="h4" gutterBottom component="div" color="primary">
            Pharmacist Information
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "600px",
                margin: "auto"
              }}
            >
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px"
                }}
              >
                Name:
              </h6>{" "}
              <span style={{ display: "inline" }}>{currentPharmacist?.name}</span>
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px"
                }}
              >
                Username:
              </h6>{" "}
              <span style={{ display: "inline" }}>{currentPharmacist?.username}</span>
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px"
                }}
              >
                Gender:
              </h6>{" "}
              <span style={{ display: "inline" }}>{currentPharmacist?.gender}</span>
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px"
                }}
              >
                Email:
              </h6>{" "}
              <span style={{ display: "inline" }}>{currentPharmacist?.email}</span>
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px"
                }}
              >
                Date of Birth:
              </h6>
              <span style={{ display: "inline" }}>{currentPharmacist?.dateOfBirth.toString().slice(0, 10)}</span>
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px"
                }}
              >
                Mobile Number:
              </h6>{" "}
              <span style={{ display: "inline" }}>{currentPharmacist?.mobileNumber}</span>
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px"
                }}
              >
                Hourly Rate:
              </h6>{" "}
              <span style={{ display: "inline" }}>{currentPharmacist?.hourlyRate}</span>
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px"
                }}
              >
                Affiliation:
              </h6>{" "}
              <span style={{ display: "inline" }}>{currentPharmacist?.affiliation}</span>
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px"
                }}
              >
                Educational Background:
              </h6>
              <span style={{ display: "inline" }}>{currentPharmacist?.educationalBackground}</span>
            </div>
          </Typography>

          <Button onClick={handleClose} color="info">
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PharmacistListModal;
