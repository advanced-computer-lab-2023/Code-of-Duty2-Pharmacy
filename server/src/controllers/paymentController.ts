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

// TODO: Make sure the amount is correct here
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    console.log("amount", amount);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur", // we will assume that this is EGP
      amount: amount * 100, // we will asume that this is amount in qoroosh
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
