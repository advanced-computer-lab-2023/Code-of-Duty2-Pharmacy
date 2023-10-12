import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Patient } from "../types";
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
export default function BasicModal({
  children,
  pharmacists,
}: Props): React.ReactElement<Props> {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>view Pharmacist</Button>
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
            {children}
            {pharmacists.map((pharmacist) => (
              <>
                <h6>Name:</h6> <p>{pharmacist.name}</p>
                <h6>Username:</h6> <p>{pharmacist.username}</p>
                <h6>Gender:</h6> <p>{pharmacist.gender}</p>
                <h6>Email:</h6> <p>{pharmacist.email}</p>
                <h6>Date of Birth:</h6>
                <p>{pharmacist.dateOfBirth.toDateString()}</p>
                <h6>Mobile Number:</h6> <p>{pharmacist.mobileNumber}</p>
                <h6>Hourly Rate:</h6> <p>{pharmacist.hourlyRate}</p>
                <h6>Affiliation:</h6> <p>{pharmacist.affiliation}</p>
                <h6>Educational Background:</h6>{" "}
                <p>{pharmacist.educationalBackground}</p>
              </>
            ))}
          </Typography>

          <Button onClick={handleClose} color="info">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
