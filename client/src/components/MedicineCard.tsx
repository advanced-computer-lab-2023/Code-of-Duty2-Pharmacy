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

interface MedicineCardProps {
  medicine: Medicine;
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
  canEdit,
  handleEditClick = () => {},
}) => {
  return (
    <Card
      sx={{ maxWidth: "280px" }}
      style={{ padding: "1rem", display: "inline-block" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          style={{ objectFit: "contain" }}
          height={140}
          image={medicine.pictureUrl}
          alt={medicine.name + " image"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {medicine.name}
          </Typography>
          {medicine.usages &&
            medicine.usages.map((usage, index) => (
              <Chip label={usage} key={index} />
            ))}
          <br />
          <br />
          <Typography variant="body2" color="text.secondary">
            {medicine.description}
          </Typography>
          <p>
            <strong>Price:</strong> {medicine.price}
          </p>
          {canViewQuantity && (
            <p>
              <strong>Quantity:</strong> {medicine.availableQuantity}
            </p>
          )}
          {canViewSales && (
            <p>
              <strong>Sales:</strong> {sales || 0}
            </p>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
        {canEdit && (
          <Button
            onClick={() => handleEditClick(medicine)}
            size="small"
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
