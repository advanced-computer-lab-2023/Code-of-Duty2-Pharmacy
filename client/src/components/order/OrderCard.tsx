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
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Medicines :
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Paid Amount : {order.paidAmount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Payment Method : {order.paymentMethod}
          </Typography>
          {canViewStatus && (
            <Typography variant="body2" color="text.secondary">
              Order Status : {order.orderStatus}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default OrderCard;
