import { createContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Address from "./stages/Address";
import Payment from "./stages/Payment";
import Review from "./stages/Review";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import config from "../../config/config";
import { Elements } from "@stripe/react-stripe-js";

interface Config {
  publishableKey: string;
}

interface PaymentIntent {
  clientSecret: string;
}

interface ICheckoutContext {
  handleNext: () => void;
  addressData: any;
  setAddressData: any;
  paymentData: any;
  setPaymentData: any;
}

const CheckoutContext = createContext<ICheckoutContext>({
  handleNext: () => {},
  addressData: null,
  setAddressData: () => {},
  paymentData: null,
  setPaymentData: () => {},
});

const checkoutStages = [
  "Shipping Address",
  "Payment Details",
  "Review your order",
];

const Checkout = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [addressData, setAddressData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [stripePromise, setStripePromise] =
    useState<null | Promise<Stripe | null>>(null);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    fetch(`${config.API_URL}/payments/config`).then(async (response) => {
      const { publishableKey } = (await response.json()) as Config;
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch(`${config.API_URL}/payments/create-payment-intent`, {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (response) => {
      var { clientSecret } = (await response.json()) as PaymentIntent;
      setClientSecret(clientSecret);
    });
  }, []);

  const handleNext = () => {
    setActiveStage(activeStage + 1);
  };

  const handleBack = () => {
    setActiveStage(activeStage - 1);
  };

  function getStepContent(stage: number) {
    switch (stage) {
      case 0:
        return <Address />;
      case 1:
        return <Payment />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unexpected payment stage");
    }
  }

  return (
    <CheckoutContext.Provider
      value={{
        handleNext,
        addressData,
        setAddressData,
        paymentData,
        setPaymentData,
      }}
    >
      <Container component="main" sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStage} sx={{ pt: 3, pb: 5 }}>
          {checkoutStages.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStage === checkoutStages.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order has been confirmed, and will send you shipping updates
              via email.
            </Typography>
          </>
        ) : (
          <>
            {clientSecret && stripePromise ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                {getStepContent(activeStage)}
              </Elements>
            ) : (
              <div>Loading...</div>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStage !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, mr: "auto" }}>
                  Back
                </Button>
              )}
            </Box>
          </>
        )}
      </Container>
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext };
export default Checkout;
