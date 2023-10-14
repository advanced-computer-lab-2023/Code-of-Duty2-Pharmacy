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
      <h2>Add a new medicine</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          placeholder="Enter medicine name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          label="Active Ingredients"
          placeholder="Separate by spaces"
          value={newIngredient}
          onKeyDown={handleAddIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        {activeIngredients.map((ingredient) => (
          <>
            <br></br>
            <br></br>
            <Chip
              key={ingredient}
              label={ingredient}
              onDelete={handleDeleteIngredient(ingredient)}
            />
          </>
        ))}
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
        <br></br>
        <br></br>
        <Button type="submit" variant="contained">
          Add Medicine
        </Button>
      </form>
    </>
  );
};

export default AddMedicineForm;
