import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Order from "../../types/Order";

interface OrderCardProps {
  order: Order;
  canViewStatus: boolean;
}
const OrderCard: React.FC<OrderCardProps> = ({ order, canViewStatus }) => {
  return (
    <Card sx={{ width: "500px" }}>
      <CardActionArea>
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "1.5em" }}
          >
            Medicines :
            {order.medicines.map((medicine, index) => {
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
          </Typography>

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
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default OrderCard;
