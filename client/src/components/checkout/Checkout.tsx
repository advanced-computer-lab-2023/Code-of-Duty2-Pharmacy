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
import { Stripe, loadStripe } from "@stripe/stripe-js";
import config from "../../config/config";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { PaymentMethod } from "../../types";

interface Config {
  publishableKey: string;
}

interface PaymentIntent {
  clientSecret: string;
}

interface ICheckoutContext {
  cartItems: any;
  total: any;
  addressData: any;
  setAddressData: any;
  paymentData: any;
  setPaymentData: any;
  handleCreateOrder: any;
  handleNext: any;
}

const CheckoutContext = createContext<ICheckoutContext>({
  cartItems: null,
  total: 1,
  addressData: "",
  setAddressData: () => {},
  paymentData: null,
  setPaymentData: () => {},
  handleCreateOrder: () => {},
  handleNext: () => {},
});

const checkoutStages = ["Shipping Address", "Payment Details"];

const Checkout = () => {
  const [stripePromise, setStripePromise] =
    useState<null | Promise<Stripe | null>>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [activeStage, setActiveStage] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  const [addressData, setAddressData] = useState("");
  const [paymentData, setPaymentData] = useState(null);

  // TODO: Make this 0 and just check elsewhere that there are items in the cart
  // before allowing the user to even attempt to checkout.
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const setupPayment = async () => {
      await fetchStripePublishableKey();
      const total = await fetchCartItemsAndSetTotal();
      if (total !== undefined) {
        fetchPaymentIntentClientSecret(total);
      }
    };

    setupPayment();
  }, []);

  const fetchStripePublishableKey = async () => {
    fetch(`${config.API_URL}/payments/config`).then(async (response) => {
      const { publishableKey } = (await response.json()) as Config;
      setStripePromise(loadStripe(publishableKey));
    });
  };

  const fetchPaymentIntentClientSecret = async (total: number) => {
    fetch(`${config.API_URL}/payments/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: total }),
    }).then(async (response) => {
      var { clientSecret } = (await response.json()) as PaymentIntent;
      setClientSecret(clientSecret);
    });
  };

  const fetchCartItemsAndSetTotal = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/patients/me/cart`);
      setCartItems(response.data);
      console.log("Cart Items: ", response.data);

      // TODO: Make this 0 and just check elsewhere that there are items in the cart
      // before allowing the user to even attempt to checkout.
      let sum = 1;
      response.data.forEach((item: any) => {
        sum += item.medicineId.price * item.quantity;
      });
      setTotal(sum);
      return sum;
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };

  const handleCreateOrder = async (
    paidAmount: number,
    paymentMethod: PaymentMethod
  ) => {
    try {
      const patientResponse = await axios.get(`${config.API_URL}/patients/me`);
      const patientData = patientResponse.data;

      const orderData = {
        patientId: patientData._id,
        patientName: patientData.name,
        patientAddress: addressData,
        patientMobileNumber: patientData.mobileNumber,
        medicines: cartItems,
        paidAmount,
        paymentMethod,
      };

      const orderResponse = await axios.post(
        `${config.API_URL}/patients/orders`,
        orderData
      );

      const newOrder = orderResponse.data;
      console.log("New Order: ", newOrder);

      // TODO: Clear cart items here
    } catch (error) {
      console.error("Failed to create order", error);
    }
  };

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
      default:
        throw new Error("Unexpected payment stage");
    }
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
