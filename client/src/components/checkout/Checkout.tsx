import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./stages/AddressForm";
import PaymentForm from "./stages/PaymentForm";
import Review from "./stages/Review";
import CartOverview from "./stages/CartOverview";

const checkoutStages = [
  "Cart Overview",
  "Shipping Address",
  "Payment Details",
  "Review your order",
];

function getStepContent(stage: number) {
  switch (stage) {
    case 0:
      return <CartOverview />;
    case 1:
      return <AddressForm />;
    case 2:
      return <PaymentForm />;
    case 3:
      return <Review />;
    default:
      throw new Error("Unexpected payment stage");
  }
}

export default function Checkout() {
  const [activeStage, setActiveStage] = useState(0);

  const handleNext = () => {
    setActiveStage(activeStage + 1);
  };

  const handleBack = () => {
    setActiveStage(activeStage - 1);
  };

  return (
    <>
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
            {getStepContent(activeStage)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStage !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStage === checkoutStages.length - 1
                  ? "Place order"
                  : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
