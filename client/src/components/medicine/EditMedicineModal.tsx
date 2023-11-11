import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import config from "../../config/config";
import { MedicineUsages } from "../../data/medicines";
import { Medicine } from "../../types";
import { Box, styled } from "@mui/material";
import { uploadMedicineImage } from "../../services/upload";

interface Props {
  medicine: Medicine;
  open: boolean;
  onClose: () => void;
  onSave: (updatedMedicine: Medicine) => void;
}

const EditMedicineModal: React.FC<Props> = ({
  medicine,
  open,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(medicine.name);
  const [price, setPrice] = useState(medicine.price);
  const [description, setDescription] = useState(medicine.description || "");
  const [usages, setUsages] = useState(medicine.usages || []);
  const [pictureUrl, setPictureUrl] = useState(medicine.pictureUrl || "");
  const [activeIngredients, setActiveIngredients] = useState(
    medicine.activeIngredients || []
  );
  const [availableQuantity, setAvailableQuantity] = useState(
    medicine.availableQuantity || 0
  );
  const [newActiveIngredient, setNewActiveIngredient] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setImagePreviewUrl(medicine.pictureUrl || "");
  }, [medicine.pictureUrl]);

  useEffect(() => {
    if (!open) {
      resetImagePreview();
    }
  }, [open]);

  const resetImagePreview = () => {
    setSelectedImage(null);
    setImagePreviewUrl(medicine.pictureUrl || "");
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setImagePreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
    event.target.value = "";
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
    if (medicine.pictureUrl) {
      setPictureUrl("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let finalPictureUrl = pictureUrl;
      if (selectedImage) {
        finalPictureUrl = await uploadMedicineImage(selectedImage);
      }
      await axios.patch(`${config.API_URL}/medicines/${medicine._id}`, {
        name,
        price,
        description,
        usages,
        activeIngredients,
        pictureUrl: finalPictureUrl,
        availableQuantity,
      });

      const updatedMedicine = {
        ...medicine,
        name,
        price,
        description,
        usages,
        activeIngredients,
        pictureUrl: finalPictureUrl,
        availableQuantity,
      };

      onSave(updatedMedicine);
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
              key={index}
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
              onChange={(_event, newValue) => {
                setUsages(newValue as string[]);
              }}
            />
          </Box>

          <Box mt={3}>
            <TextField
              label="Available Quantity"
              type="number"
              value={availableQuantity}
              onChange={(e) => setAvailableQuantity(Number(e.target.value))}
              fullWidth
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

          <Box mt={3}>
            <Box mt={3}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Medicine Image
                <VisuallyHiddenInput
                  accept="image/*"
                  id="upload-image"
                  type="file"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>

            {imagePreviewUrl && (
              <Box mt={2} position="relative" width={200}>
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={handleRemoveImage}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default EditMedicineModal;
