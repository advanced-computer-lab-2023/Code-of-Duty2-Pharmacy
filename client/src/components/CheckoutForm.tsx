import { FC, FormEvent, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { StripeElements } from "@stripe/stripe-js";
import { Button } from "@mui/material";

const CheckoutForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

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
    }

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      style={{ width: "50%", margin: "0 auto", padding: "2rem" }}
    >
      <PaymentElement id="payment-element" />

      <Button
        onClick={handleSubmit}
        variant="contained"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
