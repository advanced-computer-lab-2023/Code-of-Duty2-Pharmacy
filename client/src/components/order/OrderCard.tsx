import React from "react";
import Card from "@mui/material/Card";
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
    <Card sx={{ width: "40%", ml: 5, mb: 5 }}>
      <CardContent>
        <Box>
          <Typography variant="h6">Order Number</Typography>
          {order._id}

          <Box mt={2} />

          <Typography variant="h6">Medicines</Typography>

          {order.medicines.map((medicine: any, index: any) => {
            return (
              <Box mb={1} pl={1}>
                <Typography variant="body1" key={index}>
                  {medicine?.medicineId.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Qty {medicine?.quantity}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box mt={2} />

        <Typography variant="h6">Paid Amount</Typography>
        {order.paidAmount}

        <Box mt={2} />

        <Typography variant="h6">Payment Method</Typography>
        {order.paymentMethod.charAt(0).toUpperCase() +
          order.paymentMethod.slice(1)}

        <Box mt={2} />

        {canViewStatus && (
          <>
            <Typography variant="h6">Order Status</Typography>
            {order.orderStatus.charAt(0).toUpperCase() +
              order.orderStatus.slice(1)}{" "}
          </>
        )}

        <br />

        <Box mt={2} />

        <Button
          color="error"
          variant="outlined"
          onClick={() => onCancel(order._id)}
        >
          Cancel Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
