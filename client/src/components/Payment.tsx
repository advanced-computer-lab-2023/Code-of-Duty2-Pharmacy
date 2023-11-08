import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import config from "../config/config";

interface Config {
  publishableKey: string;
}

interface PaymentIntent {
  clientSecret: string;
}

function Payment() {
  const [stripePromise, setStripePromise] =
    useState<null | Promise<Stripe | null>>(null);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    fetch(`${config.API_URL}/payments/config`).then(async (r) => {
      const { publishableKey } = (await r.json()) as Config;
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch(`${config.API_URL}/payments/create-payment-intent`, {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = (await result.json()) as PaymentIntent;
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
