import { useState } from "react";
import axios from "axios";
import config from "../config/config";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";

interface Props {
  onMedicineAdded: () => void;
}

const AddMedicineForm: React.FC<Props> = ({ onMedicineAdded }) => {
  const [name, setName] = useState("");
  const [activeIngredients, setActiveIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [price, setPrice] = useState(0);
  const [availableQuantity, setAvailableQuantity] = useState(0);

  const handleDeleteIngredient = (ingredientToDelete: string) => () => {
    setActiveIngredients((ingredients) =>
      ingredients.filter((ingredient) => ingredient !== ingredientToDelete)
    );
  };

  const handleAddIngredient = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ([" ", "Tab", ",", "Enter"].includes(e.key)) {
      e.preventDefault();
      if (newIngredient && !activeIngredients.includes(newIngredient)) {
        setActiveIngredients([...activeIngredients, newIngredient]);
        setNewIngredient("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.API_URL}/medicines`, {
        name,
        activeIngredients,
        price,
        availableQuantity,
      });
      console.log(response.data);
      onMedicineAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Box mb={3}>
        <Typography variant="h4" color="text.secondary">
          What do you want to add?
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Medicine Name"
          placeholder="Enter medicine name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box mt={3}>
          <TextField
            label="Active Ingredients"
            placeholder="Separate by spaces"
            value={newIngredient}
            onKeyDown={handleAddIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          {activeIngredients && <Box mt={3} />}
          {activeIngredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient}
              onDelete={handleDeleteIngredient(ingredient)}
            />
          ))}

          <Box mt={3} />

          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <Box mt={3} />

          <TextField
            label="Available Quantity"
            type="number"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(Number(e.target.value))}
          />

          <Box mt={3} />

          <Button type="submit" variant="contained" color="success">
            Add Medicine
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMedicineForm;
