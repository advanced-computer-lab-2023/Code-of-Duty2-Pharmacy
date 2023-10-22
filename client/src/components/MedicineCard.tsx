import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import React from "react";
import Medicine from "../types/Medicine";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

interface MedicineCardProps {
  medicine: Medicine;
  canBuy: boolean;
  canEdit: boolean;
  canViewSales: boolean;
  canViewQuantity: boolean;
  sales?: number;
  handleEditClick?: (medicine: Medicine) => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  sales = 0,
  canViewQuantity,
  canViewSales,
  canBuy,
  canEdit,
  handleEditClick = () => {},
}) => {
  return (
    <Card
      sx={{
        m: 2,
        p: 2,
        width: "280px",
        height: "auto",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          height={140}
          image={medicine.pictureUrl}
          alt={`${medicine.name} image`}
        />
        <CardContent sx={{ height: "420px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {medicine.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {medicine.description}
          </Typography>
          <Box mt={2}>
            <Typography variant="body2">
              <strong>Usages</strong>
            </Typography>
            {medicine.usages &&
              medicine.usages.map((usage, index) => (
                <Chip label={usage} key={index} />
              ))}
            <Box mt={2}>
              <Typography variant="body2">
                <strong>Active Ingredients</strong>
              </Typography>
              {medicine.activeIngredients &&
                medicine.activeIngredients.map((ingredient, index) => (
                  <Chip label={ingredient} key={index} />
                ))}
              <Box mt={2}>
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    Price
                  </Typography>
                  <Typography variant="h6">
                    {`${medicine.price} EGP`}
                  </Typography>
                  {canViewQuantity && (
                    <Box mt={2}>
                      <Typography variant="body2" color="text.secondary">
                        Available Quantity
                      </Typography>
                      <Typography variant="h6">
                        {medicine.availableQuantity}
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
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {canBuy && (
          <Button size="small" color="primary">
            Buy
          </Button>
        )}
        {canEdit && (
          <Button
            onClick={() => handleEditClick(medicine)}
            startIcon={<EditIcon />}
            color="primary"
          >
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MedicineCard;
