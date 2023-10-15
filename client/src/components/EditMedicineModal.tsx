import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import config from "../config/config";

import { Medicine } from "../types";

interface Props {
  medicine: Medicine;
  open: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

const EditMedicineModal: React.FC<Props> = ({
  medicine,
  open,
  onClose,
  onUpdated,
}) => {
  const [name, setName] = useState(medicine.name);
  const [price, setPrice] = useState(medicine.price);
  const [description, setDescription] = useState(medicine.description || "");
  const [usages, setUsages] = useState(medicine.usages || []);
  const [newUsage, setNewUsage] = useState("");
  const [pictureUrl, setPictureUrl] = useState(medicine.pictureUrl || "");
  const [activeIngredients, setActiveIngredients] = useState(
    medicine.activeIngredients || []
  );
  const [newActiveIngredient, setNewActiveIngredient] = useState("");

  const handleDeleteUsage = (usageToDelete: string) => () => {
    setUsages((usages) => usages.filter((usage) => usage !== usageToDelete));
  };

  const handleAddUsage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ([" ", "Tab", ",", "Enter"].includes(e.key)) {
      e.preventDefault();
      if (newUsage && !usages.includes(newUsage)) {
        setUsages([...usages, newUsage]);
        setNewUsage("");
      }
    }
  };

  const handleDeleteActiveIngredient = (ingredientToDelete: string) => () => {
    setActiveIngredients((ingredients) =>
      ingredients.filter((ingredient) => ingredient !== ingredientToDelete)
    );
  };

  const handleAddActiveIngredient = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ([" ", "Tab", ",", "Enter"].includes(e.key)) {
      e.preventDefault();
      if (
        newActiveIngredient &&
        !activeIngredients.includes(newActiveIngredient)
      ) {
        setActiveIngredients([...activeIngredients, newActiveIngredient]);
        setNewActiveIngredient("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(`${config.API_URL}/medicines/${medicine._id}`, {
        name,
        price,
        description,
        usages,
        activeIngredients,
        pictureUrl,
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
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br></br>
          <br></br>
          <TextField
            label="Picture URL"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
          />
          <br></br>
          <br></br>
          <TextField
            label="Active Ingredients"
            value={newActiveIngredient}
            onKeyDown={handleAddActiveIngredient}
            onChange={(e) => setNewActiveIngredient(e.target.value)}
          />
          <br></br>
          {activeIngredients.map((ingredient, index) => (
            <div key={index}>
              <br></br>
              <Chip
                label={ingredient}
                onDelete={handleDeleteActiveIngredient(ingredient)}
              />
            </div>
          ))}
          <br></br>
          <br></br>
          <TextField
            label="Usages"
            value={newUsage}
            onKeyDown={handleAddUsage}
            onChange={(e) => setNewUsage(e.target.value)}
          />
          <br></br>
          {usages.map((usage, index) => (
            <div key={index}>
              <br></br>
              <Chip label={usage} onDelete={handleDeleteUsage(usage)} />
            </div>
          ))}
          <br></br>
          <br></br>
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
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

export default EditMedicineModal;
