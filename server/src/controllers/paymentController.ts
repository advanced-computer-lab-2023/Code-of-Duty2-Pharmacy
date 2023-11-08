import { Request, Response } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const configurePayment = (req: Request, res: Response) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: 1999,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
