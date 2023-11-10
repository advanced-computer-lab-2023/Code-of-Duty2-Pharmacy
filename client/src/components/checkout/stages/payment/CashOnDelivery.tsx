import { Box, Button, Typography } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { CheckoutContext } from "../../Checkout";
import { COD_FEE } from "../../../../data/payment/cashOnDeliveryFee";

const CashOnDelivery = () => {
  const { handleNext, handleCreateOrder, total } = useContext(CheckoutContext);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await handleCreateOrder(total + COD_FEE, "cod");
    setIsProcessing(false);
    handleNext();
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Pay via Cash on Delivery (COD)
      </Typography>
      <p>Experience the convenience of cash on delivery.</p>
      <p>
        No need for online transactions or credit cards. Just place your order
        and pay in cash when your order arrives at your doorstep. Enjoy this
        traditional and reliable method of payment.
      </p>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          disabled={isProcessing}
          id="submit"
          sx={{ mt: 3, ml: 1 }}
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Proceed with Cash on Delivery"}
          </span>
        </Button>
      </Box>
    </form>
  );
};

export default CashOnDelivery;
