import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

import Medicine from "../../types/Medicine";
import EditMedicineModal from "./EditMedicineModal";

interface MedicineCardProps {
  medicine: Medicine;
  canBuy: boolean;
  canEdit: boolean;
  canViewSales: boolean;
  canViewQuantity: boolean;
  sales?: number;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  canBuy,
  canEdit,
  canViewSales,
  canViewQuantity,
  sales = 0,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editedMedicine, setEditedMedicine] = useState(medicine);

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSave = (updatedMedicine: Medicine) => {
    setEditedMedicine(updatedMedicine);
    setModalOpen(false);
  };

  return (
    <Card
      sx={{
        m: 2,
        width: "250px",
        height: "auto",
      }}
    >
      <CardActionArea>
        <Box m={2}>
          <CardMedia
            component="img"
            sx={{ objectFit: "contain" }}
            height={140}
            image={editedMedicine.pictureUrl}
            alt={`${editedMedicine.name} image`}
          />
          <CardContent sx={{ height: "450px" }}>
            <Typography gutterBottom variant="h5" component="div">
              {editedMedicine.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {editedMedicine.description}
            </Typography>
            <Box mt={3}>
              <Typography variant="body2" color="text.secondary">
                Usages
              </Typography>
              {editedMedicine.usages &&
                editedMedicine.usages.map((usage, index) => (
                  <Chip label={usage} key={index} />
                ))}
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Active Ingredients
                </Typography>
                {editedMedicine.activeIngredients &&
                  editedMedicine.activeIngredients.map((ingredient, index) => (
                    <Chip label={ingredient} key={index} />
                  ))}
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    Price
                  </Typography>
                  <Typography variant="h6">
                    {`${editedMedicine.price} EGP`}
                  </Typography>
                  {canViewQuantity && (
                    <Box mt={2}>
                      <Typography variant="body2" color="text.secondary">
                        Available Quantity
                      </Typography>
                      <Typography variant="h6">
                        {editedMedicine.availableQuantity}
                      </Typography>
                    </Box>
                  )}
                  {canViewSales && (
                    <Box mt={2}>
                      <Typography variant="body2" color="text.secondary">
                        Number of Sales
                      </Typography>
                      <Typography variant="h6">{sales || 0}</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
      <CardActions>
        {canBuy && (
          <Button size="small" color="primary">
            Buy
          </Button>
        )}
        {canEdit && (
          <Button
            onClick={handleEditClick}
            startIcon={<EditIcon />}
            color="secondary"
            variant="contained"
          >
            Edit
          </Button>
        )}
      </CardActions>

      <EditMedicineModal
        open={modalOpen}
        medicine={editedMedicine}
        onClose={handleClose}
        onSave={handleSave}
      />
    </Card>
  );
};

export default MedicineCard;
