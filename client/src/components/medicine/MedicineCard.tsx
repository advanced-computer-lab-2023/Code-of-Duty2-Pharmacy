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
import InfoIcon from "@mui/icons-material/Info";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Medicine from "../../types/Medicine";
import EditMedicineModal from "./EditMedicineModal";
import { useNavigate } from "react-router-dom";
import { AttachMoney } from "@mui/icons-material";
import axios from "axios";
import config from "../../config/config";
import { Alert, AlertTitle, Stack, Tooltip } from "@mui/material";

interface MedicineCardProps {
  medicine: Medicine;
  discount: number;
  packageName: string;
  canBuy: boolean;
  canEdit: boolean;
  canViewSales: boolean;
  canViewQuantity: boolean;
  sales?: number;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  discount,
  packageName,
  canBuy,
  canEdit,
  canViewSales,
  canViewQuantity,
  sales = 0,
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

  const handleAddingToCart = async (
    _id: string,
    navigateToCart: boolean
  ): Promise<void> => {
    const body = {
      medicineId: _id,
      quantity: 1,
      OTC: true,
    };

    await axios
      .post(`${config.API_URL}/patients/me/cart`, body)
      .then(() => {
        if (navigateToCart) {
          navigate(`/patient/review-cart`);
        }
      })
      .catch((err) => {
        if (
          err.response.data.message ===
          "Quantity exceeds the available quantity"
        ) {
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
        maxWidth: "325px",
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
                  {canViewQuantity && (
                    <Box mt={2}>
                      <Typography variant="body2" color="text.secondary">
                        Available Qty
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

                  <Box
                    mt={2}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
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
                          Save: EGP{" "}
                          {(
                            editedMedicine.originalPrice - editedMedicine.price
                          ).toFixed(2)}{" "}
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
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
                                  color: "gray",
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
                <strong onClick={() => navigate(`/patient/review-cart`)}>
                  check cart!
                </strong>
              </Alert>
            )}
          </Stack>
        </Box>
      </CardActionArea>

      <CardActions>
        {canBuy && (
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
        )}
        {canEdit && (
          <Button
            onClick={handleEditClick}
            startIcon={<EditIcon />}
            color="secondary"
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
