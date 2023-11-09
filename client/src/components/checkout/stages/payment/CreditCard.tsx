import { FC, FormEvent, useContext, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { StripeElements } from "@stripe/stripe-js";
import { Box, Button } from "@mui/material";
import { CheckoutContext } from "../../Checkout";

const CreditCard: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const {
    handleNext,
    handleCreateOrder,
    total: subtotal,
  } = useContext(CheckoutContext);
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements: elements as StripeElements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An error occurred with your card.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      setMessage("Payment Success!");
      await handleCreateOrder(subtotal + 0, "card");
      setIsProcessing(false);
      handleNext();
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          disabled={isProcessing || !stripe || !elements}
          id="submit"
          sx={{ mt: 3, ml: 1 }}
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </Button>
      </Box>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CreditCard;
