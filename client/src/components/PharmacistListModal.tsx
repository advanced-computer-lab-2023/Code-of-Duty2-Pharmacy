import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Pharmacist from "../types/Pharmacist";

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
  children?: React.ReactNode;
  pharmacists: Pharmacist[];
}
export default function PharmacistListModal({
  pharmacists = [],
}: Props): React.ReactElement<Props> {
  const [open, setOpen] = React.useState(false);
  const [currentPharmacist, setCurrentPharmacist] = React.useState<Pharmacist>(
    pharmacists[0]
  );
  const handleOpen = (index: number) => {
    setOpen(true);
    setCurrentPharmacist(pharmacists[index]);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      {pharmacists.map((pharmacist, index) => (
        <Button
          id={`viewPhButton${index}`}
          key={index}
          onClick={() => handleOpen(index)}
        >
          view Pharmacist
        </Button>
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h6>Name:</h6> <p>{currentPharmacist.name}</p>
            <h6>Username:</h6> <p>{currentPharmacist.username}</p>
            <h6>Gender:</h6> <p>{currentPharmacist.gender}</p>
            <h6>Email:</h6> <p>{currentPharmacist.email}</p>
            <h6>Date of Birth:</h6>
            <p>{currentPharmacist.dateOfBirth.toString()}</p>
            <h6>Mobile Number:</h6> <p>{currentPharmacist.mobileNumber}</p>
            <h6>Hourly Rate:</h6> <p>{currentPharmacist.hourlyRate}</p>
            <h6>Affiliation:</h6> <p>{currentPharmacist.affiliation}</p>
            <h6>Educational Background:</h6>{" "}
            <p>{currentPharmacist.educationalBackground}</p>
          </Typography>

          <Button onClick={handleClose} color="info">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
