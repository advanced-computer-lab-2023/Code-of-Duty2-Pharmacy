import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import InfoIcon from "@mui/icons-material/Info";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Archive, AttachMoney, Unarchive } from "@mui/icons-material";
import { Alert, AlertTitle, Stack, Tooltip } from "@mui/material";
import medicinePlaceholderImage from "../../assets/medicine-placeholder.png";

import config from "../../config/config";
import Medicine from "../../types/Medicine";
import EditMedicineModal from "./EditMedicineModal";
import { display } from "@mui/system";

interface Props {
  medicine: Medicine;
  discount: number;
  packageName: string;
  canBuy: boolean;
  canEdit: boolean;
  canViewSales: boolean;
  canViewQuantity: boolean;
  sales?: number;
  handleArchiveOrUnArchiveButton?: (medicine: Medicine) => number;
  handleActiveIngredientSearch?: (searchTerm: string, searchCollection: string) => Promise<void>;
}

const MedicineCard: React.FC<Props> = ({
  medicine,
  discount,
  packageName,
  canBuy,
  canEdit,
  canViewSales,
  canViewQuantity,
  sales = 0,
  handleArchiveOrUnArchiveButton = () => {},
  handleActiveIngredientSearch = () => {}
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editedMedicine, setEditedMedicine] = useState(medicine);
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();

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

  const handleAddingToCart = async (_id: string, navigateToCart: boolean): Promise<void> => {
    const body = {
      medicineId: _id,
      quantity: 1,
      OTC: true
    };

    await axios
      .post(`${config.API_URL}/patients/me/cart`, body)
      .then(() => {
        if (navigateToCart) {
          navigate(`/patient/review-cart`);
        }
      })
      .catch((err) => {
        if (err.response.data.message === "Quantity exceeds the available quantity") {
          setAlertVisible(true);
          setTimeout(() => {
            setAlertVisible(false);
          }, 5000);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        minWidth: "300px",
        maxWidth: "300px",
        bgcolor: medicine.isArchived ? "rgba(200, 200, 0, 0.17)" : "rgba(0, 0, 0, 0.0)"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <CardActionArea sx={{ flexGrow: 1 }}>
          <Box m={2}>
            <CardMedia
              component="img"
              height={140}
              image={editedMedicine.pictureUrl || medicinePlaceholderImage}
              alt={`${editedMedicine.name} image`}
              onError={(e) => {
                e.currentTarget.src = medicinePlaceholderImage;
              }}
              sx={{
                filter: editedMedicine.availableQuantity === 0 ? "grayscale(100%)" : "none",
                objectFit: "contain"
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {editedMedicine.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {editedMedicine.description}
              </Typography>
              <Box mt={3}>
                <Typography variant="body2" color="text.secondary">
                  Medical Usages
                </Typography>

                {editedMedicine.usages &&
                  editedMedicine.usages.map((usage, index) => <Chip label={usage} key={index} />)}

                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    Main Active Ingredient
                  </Typography>

                  {editedMedicine.activeIngredients && <Chip label={editedMedicine.activeIngredients[0]} />}

                  <Typography mt={2} variant="body2" color="text.secondary">
                    Additional Ingredients
                  </Typography>

                  {editedMedicine.activeIngredients &&
                    editedMedicine.activeIngredients
                      .slice(1)
                      .map((ingredient, index) => <Chip label={ingredient} key={index} />)}

                  <Box mt={2}>
                    {canViewQuantity && editedMedicine.availableQuantity > 0 && (
                      <Box mt={2}>
                        <Typography variant="body2" color="text.secondary">
                          Available Qty
                        </Typography>
                        <Typography variant="body1">{editedMedicine.availableQuantity}</Typography>
                      </Box>
                    )}

                    {canViewSales && (
                      <Box mt={2}>
                        <Typography variant="body2" color="text.secondary">
                          Number of Sales
                        </Typography>
                        <Typography variant="body1">{sales || 0}</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </CardContent>

            <Stack sx={{ width: "100%" }} spacing={2}>
              {alertVisible && (
                <Alert
                  severity="warning"
                  // onClose={() => {
                  //   setAlertVisible(false);
                  // }}
                >
                  <AlertTitle>Warning</AlertTitle>
                  Your total amount in cart cannot exceed the maximum quantity —{" "}
                  <strong onClick={() => navigate(`/patient/review-cart`)}>check cart!</strong>
                </Alert>
              )}
            </Stack>
          </Box>
        </CardActionArea>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-end"
        style={{ textAlign: "right", marginRight: 12, marginBottom: 12 }}
      >
        {discount > 0 ? (
          <>
            <Typography variant="h6" sx={{ color: "red" }}>
              {`EGP ${editedMedicine.price}`}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <s>{`EGP ${editedMedicine.originalPrice}`}</s>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Save: EGP {(editedMedicine.originalPrice - editedMedicine.price).toFixed(2)}{" "}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center"
                }}
              >
                ({discount * 100}%)
                <Tooltip
                  title={`A ${
                    discount * 100
                  }% discount on medicines is applied because you are subscribed to the ${packageName}.`}
                >
                  <InfoIcon
                    sx={{
                      fontSize: 17,
                      marginLeft: 1,
                      color: "gray"
                    }}
                  />
                </Tooltip>
              </span>
            </Typography>
          </>
        ) : (
          <Typography variant="h6">{`EGP ${editedMedicine.price}`}</Typography>
        )}
      </Box>

      <CardActions>
        {canEdit && (
          <Box>
            {editedMedicine.availableQuantity === 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 2, ml: 1 }}>
                <Typography variant="body1" color="text.secondary" sx={{ opacity: 0.7 }}>
                  Out of Stock
                </Typography>

                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    textTransform: "none",
                    ml: 2
                  }}
                  onClick={() => handleActiveIngredientSearch(editedMedicine.activeIngredients[0], "medicines")}
                >
                  View Alternatives?
                </Button>
              </Box>
            )}

            <Box>
              <Button onClick={handleEditClick} startIcon={<EditIcon />} color="secondary">
                Edit
              </Button>

              <Button
                onClick={() => {
                  if (handleArchiveOrUnArchiveButton(editedMedicine) === 0)
                    editedMedicine.isArchived = !editedMedicine.isArchived;
                }}
                startIcon={editedMedicine.isArchived ? <Unarchive /> : <Archive />}
                color="secondary"
              >
                {editedMedicine.isArchived ? "Unarchive" : "Archive"}
              </Button>
            </Box>
          </Box>
        )}

        {editedMedicine.availableQuantity === 0 && !canEdit ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              rowGap: 1
            }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ opacity: 0.7 }}>
              Out of Stock
            </Typography>

            <Button
              size="small"
              color="primary"
              variant="outlined"
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                textTransform: "none",
                ml: 2
              }}
              onClick={() => handleActiveIngredientSearch(editedMedicine.activeIngredients[0], "medicines")}
            >
              View Alternatives?
            </Button>
          </Box>
        ) : (
          canBuy && (
            <>
              <input
                type="number"
                min="1"
                max={editedMedicine.availableQuantity}
                defaultValue="1"
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "5px",
                  height: "25px",
                  fontSize: "14px"
                }}
              />

              <Button
                size="small"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => handleAddingToCart(editedMedicine._id, false)}
              >
                Add to Cart
              </Button>

              <Button
                size="small"
                color="primary"
                startIcon={<AttachMoney />}
                onClick={() => handleAddingToCart(editedMedicine._id, true)}
              >
                Buy Now
              </Button>
            </>
          )
        )}
      </CardActions>

      <EditMedicineModal open={modalOpen} medicine={editedMedicine} onClose={handleClose} onSave={handleSave} />
    </Card>
  );
};

export default MedicineCard;
