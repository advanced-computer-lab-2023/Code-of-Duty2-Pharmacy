import { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography, Snackbar } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { forwardRef, Ref } from "react";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}

const AlertRef = forwardRef(Alert);

const AddMedicineForm = () => {
  const [name, setName] = useState("");
  const [activeIngredients, setActiveIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [price, setPrice] = useState(0);
  const [availableQuantity, setAvailableQuantity] = useState(0);

  const [nameError, setNameError] = useState(false);
  const [activeIngredientsError, setActiveIngredientsError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

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

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError(true);
      isValid = false;
    }

    if (!price) {
      setPriceError(true);
      isValid = false;
    }

    if (activeIngredients.length === 0) {
      setActiveIngredientsError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post(`${config.API_URL}/medicines`, {
        name,
        activeIngredients,
        price,
        availableQuantity,
      });

      setName("");
      setActiveIngredients([]);
      setPrice(0);
      setAvailableQuantity(0);

      setSnackbarMessage("Medicine added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err: any) {
      console.error(err);

      if (err.response && err.response.data && err.response.data.message) {
        setSnackbarMessage(err.response.data.message);
      } else {
        setSnackbarMessage("Failed to add medicine");
      }

      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div style={{ marginLeft: "3rem" }}>
      <Box mb={3}>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Add a new medicine
        </Typography>

        <Typography variant="body1" color="text.secondary">
          You may only add a <span style={{ fontWeight: "bold" }}>NEW</span>{" "}
          medicine that hasn't been already added to the system,
          <br />
          if the medicine is out of stock, just update the quantity of the
          existing medicine.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Medicine Name"
          placeholder="Enter medicine name"
          type="text"
          value={name}
          error={nameError}
          helperText={nameError ? "Medicine name is required" : ""}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
          }}
        />

        <Box mt={3}>
          <TextField
            label="Active Ingredients"
            placeholder="Separate by spaces"
            value={newIngredient}
            onKeyDown={handleAddIngredient}
            error={activeIngredientsError}
            helperText={
              activeIngredientsError
                ? "At least one active ingredient is required required"
                : ""
            }
            onChange={(e) => {
              setNewIngredient(e.target.value);
              setActiveIngredientsError(false);
            }}
          />

          {activeIngredients && <Box mt={2} />}

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
            error={priceError}
            helperText={priceError ? "Price greater than zero is required" : ""}
            onChange={(e) => {
              setPrice(Number(e.target.value));
              setPriceError(false);
            }}
            onClick={(e) => {
              (e.target as HTMLInputElement).select();
            }}
          />

          <Box mt={3} />

          <TextField
            label="Available Quantity"
            type="number"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(Number(e.target.value))}
            onClick={(e) => {
              (e.target as HTMLInputElement).select();
            }}
          />

          <Box mt={3} />

          <Button type="submit" variant="contained">
            Add Medicine
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AlertRef onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </AlertRef>
      </Snackbar>
    </div>
  );
};

export default AddMedicineForm;
