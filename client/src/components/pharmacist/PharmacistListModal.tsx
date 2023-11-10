import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Pharmacist from "../../types/Pharmacist";
import { NameSearchBar, goSearch } from "../search/NameSearchBar";
import axios from "axios";
import config from "../../config/config";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  canDelete: boolean;
}

const PharmacistListModal: React.FC<Props> = ({ canDelete }) => {
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>([]);
  const [open, setOpen] = useState(false);
  const [currentPharmacist, setCurrentPharmacist] = useState<Pharmacist>(
    pharmacists[0]
  );

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

  const handlePharmacistSearch = async (
    searchTerm: string,
    searchCollection: string,
    attribute?: string
  ) => {
    try {
      let responseData = await goSearch(
        searchTerm,
        searchCollection,
        attribute
      );

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
    <>
      <NameSearchBar
        searchCollection="pharmacists"
        onSearch={handlePharmacistSearch}
        attribute="username"
        initialValue="(or leave empty for all)"
      />
      <h3> OR </h3>
      <NameSearchBar
        searchCollection="pharmacists"
        attribute="email"
        onSearch={handlePharmacistSearch}
        initialValue="(or leave empty for all)"
      />
      <div>
        {pharmacists.map((pharmacist, index) => (
          <div
            key={index}
            style={{
              display: "block",
              paddingBottom: "1rem",
            }}
          >
            <div style={{ display: "block", padding: "1rem" }}>
              <h5 style={{ display: "inline" }}>Name:</h5>
              {pharmacist.name},{" "}
              <span
                style={{ color: "grey" }}
              >{`(${pharmacist.username})`}</span>
            </div>
            <div
              style={{
                display: "block",
                paddingTop: "0rem",
                paddingLeft: "1.2rem",
              }}
            >
              <h5 style={{ display: "inline" }}>Email:</h5>{" "}
              <span>{pharmacist.email}</span>
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
            <br />
            <br />
            <hr />
          </div>
        ))}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Pharmacist Information
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              component="div"
            >
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  maxWidth: "600px",
                  margin: "auto",
                }}
              >
                <h6
                  style={{
                    fontWeight: "bold",
                    display: "inline",
                    marginRight: "10px",
                  }}
                >
                  Name:
                </h6>{" "}
                <span style={{ display: "inline" }}>
                  {currentPharmacist?.name}
                </span>
                <br />
                <h6
                  style={{
                    fontWeight: "bold",
                    display: "inline",
                    marginRight: "10px",
                  }}
                >
                  Username:
                </h6>{" "}
                <span style={{ display: "inline" }}>
                  {currentPharmacist?.username}
                </span>
                <br />
                <h6
                  style={{
                    fontWeight: "bold",
                    display: "inline",
                    marginRight: "10px",
                  }}
                >
                  Gender:
                </h6>{" "}
                <span style={{ display: "inline" }}>
                  {currentPharmacist?.gender}
                </span>
                <br />
                <h6
                  style={{
                    fontWeight: "bold",
                    display: "inline",
                    marginRight: "10px",
                  }}
                >
                  Email:
                </h6>{" "}
                <span style={{ display: "inline" }}>
                  {currentPharmacist?.email}
                </span>
                <br />
                <h6
                  style={{
                    fontWeight: "bold",
                    display: "inline",
                    marginRight: "10px",
                  }}
                >
                  Date of Birth:
                </h6>
                <span style={{ display: "inline" }}>
                  {currentPharmacist?.dateOfBirth.toString().slice(0, 10)}
                </span>
                <br />
                <h6
                  style={{
                    fontWeight: "bold",
                    display: "inline",
                    marginRight: "10px",
                  }}
                >
                  Mobile Number:
                </h6>{" "}
                <span style={{ display: "inline" }}>
                  {currentPharmacist?.mobileNumber}
                </span>
                <br />
                <h6
                  style={{
                    fontWeight: "bold",
                    display: "inline",
                    marginRight: "10px",
                  }}
                >
                  Hourly Rate:
                </h6>{" "}
                <span style={{ display: "inline" }}>
                  {currentPharmacist?.hourlyRate}
                </span>
                <br />
                <h6
                  style={{
                    fontWeight: "bold",
                    display: "inline",
                    marginRight: "10px",
                  }}
                >
                  Affiliation:
                </h6>{" "}
                <span style={{ display: "inline" }}>
                  {currentPharmacist?.affiliation}
                </span>
                <br />
                <h6
                  style={{
                    fontWeight: "bold",
                    display: "inline",
                    marginRight: "10px",
                  }}
                >
                  Educational Background:
                </h6>
                <span style={{ display: "inline" }}>
                  {currentPharmacist?.educationalBackground}
                </span>
              </div>
            </Typography>

            <Button onClick={handleClose} color="info">
              Close
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default PharmacistListModal;
