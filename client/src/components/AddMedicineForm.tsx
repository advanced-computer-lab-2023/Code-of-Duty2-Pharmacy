import { useState } from "react";
import axios from "axios";
import config from "../config/config";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
    <>
      <h2>Add a medicine:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <TextField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Active Ingredients:
          <TextField
            value={newIngredient}
            onKeyDown={handleAddIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          {activeIngredients.map((ingredient) => (
            <Chip
              key={ingredient}
              label={ingredient}
              onDelete={handleDeleteIngredient(ingredient)}
            />
          ))}
        </label>
        <label>
          Price:
          <TextField
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Available Quantity:
          <TextField
            type="number"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(Number(e.target.value))}
          />
        </label>
        <Button type="submit" variant="contained">
          Add Medicine
        </Button>
      </form>
    </>
  );
};

export default AddMedicineForm;
