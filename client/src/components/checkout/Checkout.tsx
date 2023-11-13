import { Ref, forwardRef, useEffect, useState } from "react";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { AlertProps, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";

import Address from "./stages/Address";
import Payment from "./stages/Payment";
import config from "../../config/config";
import CheckoutContext from "../../contexts/CheckoutContext";
import { PaymentMethod } from "../../types";
import { cartReviewRoute } from "../../data/routes/patientRoutes";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}

const AlertRef = forwardRef(Alert);

const checkoutStages = ["Shipping Address", "Payment Details"];

const Checkout = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [stripePromise, setStripePromise] =
    useState<null | Promise<Stripe | null>>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [activeStage, setActiveStage] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [addressData, setAddressData] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const [total, setTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    (async () => {
      await setupPayment();
      setLoading(false);
    })();
  }, []);

  const setupPayment = async () => {
    const total = await fetchCartItemsAndTotalPrice();
    if (total !== undefined) {
      await fetchStripePublishableKey();
      await fetchPaymentIntentClientSecret(total);
    }
  };

  const fetchStripePublishableKey = async () => {
    const response = await axios.get(`${config.API_URL}/payments/config`);
    const publishableKey = response.data.publishableKey;
    setStripePromise(loadStripe(publishableKey));
  };

  const fetchPaymentIntentClientSecret = async (total: number) => {
    const response = await axios.post(
      `${config.API_URL}/payments/create-payment-intent`,
      { amount: total }
    );
    const clientSecret = response.data.clientSecret;
    setClientSecret(clientSecret);
  };

  const fetchCartItemsAndTotalPrice = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/patients/me/cart`);
      const cartItems = response.data;

      if (cartItems.length === 0) {
        navigate(cartReviewRoute.path);
        return;
      }

      setCartItems(cartItems);
      const total = cartItems.reduce(
        (sum: number, item: any) => sum + item.medicineId.price * item.quantity,
        0
      );

      setTotal(total);
      return total;
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };

  const handleNext = () => {
    setActiveStage(activeStage + 1);
  };

  const handleBack = () => {
    setActiveStage(activeStage - 1);
  };

  const handleCreateOrder = async (
    paidAmount: number,
    paymentMethod: PaymentMethod
  ) => {
    try {
      const patientResponse = await axios.get(`${config.API_URL}/patients/me`);
      const patientData = patientResponse.data;
      console.log(cartItems);
      const orderData = {
        patientId: patientData._id,
        patientName: patientData.name,
        patientAddress: addressData,
        patientMobileNumber: patientData.mobileNumber,
        medicines: cartItems.map((item: any) => ({
          medicineId: item.medicineId._id,
          quantity: item.quantity,
        })),
        paidAmount,
        paymentMethod,
      };

      await axios.post(`${config.API_URL}/patients/orders`, orderData);

      const updates = cartItems.map((item: any) => ({
        medicineId: item.medicineId._id,
        boughtQuantity: item.quantity,
      }));

      await axios.patch(`${config.API_URL}/medicines/bulk-update`, updates);

      await axios.delete(`${config.API_URL}/patients/me/cart`);

      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  function getStepContent(stage: number) {
    switch (stage) {
      case 0:
        return <Address />;
      case 1:
        return <Payment />;
      default:
        throw new Error("Unexpected payment stage");
    }
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <CheckoutContext.Provider
      value={{
        total: total,
        cartItems,
        addressData,
        setAddressData,
        paymentData,
        setPaymentData,
        handleCreateOrder,
        handleNext,
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
            <Snackbar
              open={openSnackbar}
              autoHideDuration={4500}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <AlertRef
                onClose={() => setOpenSnackbar(false)}
                severity="success"
              >
                Order placed successfully!
              </AlertRef>
            </Snackbar>
          </>
        ) : (
          <>
            {clientSecret && stripePromise ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                {getStepContent(activeStage)}
              </Elements>
            ) : (
              <CircularProgress />
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStage !== 0 && (
                <Button onClick={handleBack} sx={{ mr: "auto" }}>
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
