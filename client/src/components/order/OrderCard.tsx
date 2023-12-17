import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Alert, Box, Snackbar } from "@mui/material";
import DeletionModal from "../modals/DeletionModal";

interface OrderCardProps {
  order: any;
  canViewStatus: boolean;
  onCancel: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, canViewStatus, onCancel }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleDeleteConfirm = async () => {
    try {
      await onCancel(order._id);
      setSnackbarMessage("Your order has been cancelled successfully.");
      setSnackbarSeverity("success");
    } catch (err) {
      console.error("Error cancelling order:", err);
      setSnackbarMessage("An error occurred, failed to cancel order.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
    setDeleteModalOpen(false);
  };

  return (
    <Card sx={{ width: "75%", ml: 0.5, mb: 5 }}>
      <CardContent>
        <Box>
          <Typography variant="h6">Order Number</Typography>
          {order._id}

          <Box mt={2} />

          <Typography variant="h6">Medicines</Typography>

          {order.medicines.map((medicine: any, index: any) => {
            return (
              <Box mb={1} pl={1} key={index}>
                <Typography variant="body1">{medicine?.medicineId.name}</Typography>
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
        {order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)}
        <Box mt={2} />
        {canViewStatus && (
          <>
            <Typography variant="h6">Order Status</Typography>
            {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}{" "}
          </>
        )}
        <br />
        <Box mt={2} />

        {order.orderStatus !== "successful" && (
          <Button color="error" variant="outlined" onClick={() => setDeleteModalOpen(true)}>
            Cancel Order
          </Button>
        )}
      </CardContent>

      <DeletionModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleDelete={handleDeleteConfirm}
        title="Cancelling Order"
        description={`Are you sure you want to cancel this order?`}
        secondaryButtonText="No, don't cancel"
        primaryButtonText="Yes, cancel"
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} elevation={6} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default OrderCard;
