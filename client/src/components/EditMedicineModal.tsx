import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

import config from "../config/config";
import { MedicineUsages } from "../data";
import { Medicine } from "../types";
import { Box } from "@mui/material";

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
  const [pictureUrl, setPictureUrl] = useState(medicine.pictureUrl || "");
  const [activeIngredients, setActiveIngredients] = useState(
    medicine.activeIngredients || []
  );
  const [newActiveIngredient, setNewActiveIngredient] = useState("");

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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>What do you want to change?</DialogTitle>
      <DialogContent>
        <form id="edit-form" onSubmit={handleSubmit}>
          <Box mt={1}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mt={3}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mt={3}>
            <TextField
              label="Image URL"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mt={3}>
            <TextField
              label="Active Ingredients"
              placeholder="Separate by spaces"
              value={newActiveIngredient}
              onKeyDown={handleAddActiveIngredient}
              onChange={(e) => setNewActiveIngredient(e.target.value)}
              fullWidth
            />
          </Box>
          {activeIngredients && <Box mt={2}></Box>}
          {activeIngredients.map((ingredient, index) => (
            <Chip
              variant="outlined"
              label={ingredient}
              onDelete={handleDeleteActiveIngredient(ingredient)}
            />
          ))}
          {activeIngredients && <Box mt={4}></Box>}
          <Box mt={3}>
            <Autocomplete
              multiple
              id="usages"
              options={MedicineUsages}
              filterSelectedOptions
              value={usages}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Medicinal Usages"
                  placeholder="Select all that applies..."
                  fullWidth
                />
              )}
              onChange={(event, newValue) => {
                setUsages(newValue as string[]);
              }}
            />
          </Box>
          <Box mt={3}>
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              fullWidth
            />
          </Box>
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
