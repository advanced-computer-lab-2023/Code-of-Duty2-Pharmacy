import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

interface OrderCardProps {
  order: any;
  canViewStatus: boolean;
  onCancel: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  canViewStatus,
  onCancel,
}) => {
  return (
    <Card sx={{ width: "500px", m: 3 }}>
      <CardContent>
        <Box sx={{ fontSize: "1.5em" }}>
          Medicines :
          {order.medicines.map((medicine: any, index: any) => {
            return (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "1.5em" }}
                key={index}
              >
                {medicine?.medicineId.name}
              </Typography>
            );
          })}
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "1.5em" }}
        >
          Paid Amount : {order.paidAmount}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "1.5em" }}
        >
          Payment Method : {order.paymentMethod}
        </Typography>
        {canViewStatus && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "1.5em" }}
          >
            Order Status : {order.orderStatus}
          </Typography>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onCancel(order._id)}
        >
          Cancel Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
