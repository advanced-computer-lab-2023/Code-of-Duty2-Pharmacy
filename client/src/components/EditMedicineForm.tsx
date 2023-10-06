import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import config from "../config/config";

import { Medicine } from "../types";

interface Props {
  medicine: Medicine;
  open: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

const EditMedicineForm: React.FC<Props> = ({
  medicine,
  open,
  onClose,
  onUpdated,
}) => {
  const [name, setName] = useState(medicine.name);
  const [price, setPrice] = useState(medicine.price);
  const [availableQuantity, setAvailableQuantity] = useState(
    medicine.availableQuantity
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${config.API_URL}/medicines/${medicine._id}`, {
        name,
        price,
        availableQuantity,
      });
      onUpdated && onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Medicine</DialogTitle>
      <DialogContent>
        <br></br>
        <form id="edit-form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br></br>
          <br></br>
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <br></br>
          <br></br>
          <TextField
            label="Available Quantity"
            type="number"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(Number(e.target.value))}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="edit-form">
          Update Medicine
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMedicineForm;
