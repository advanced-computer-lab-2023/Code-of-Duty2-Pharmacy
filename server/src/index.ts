import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectToDB from "./utils/database";

import config from "./config";
import medicineRouter from "./routes/medicineRoutes";
import patientRouter from "./routes/patientRoutes";
import registrationRouter from "./routes/registrationRoutes";
import adminRouter from "./routes/adminRoutes";
import pharmacistRouter from "./routes/pharmacistRoutes";
import pharmacistRegistrationRequestRouter from "./routes/pharmacistRegistrationRequestRoutes";
import authRouter from "./routes/authRoutes";
import cookieParser from "cookie-parser";

export const app = express();

app.use(cors(config.server.corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

connectToDB();

app.get("/", (_, res) => {
  res.send("Server Online!");
});

app.listen(config.server.port, async () => {
  console.log(`Server listening on port ${config.server.port}`);
});

app.use("/medicines", medicineRouter);
app.use("/patients", patientRouter);
app.use("/pharmacists", pharmacistRouter);
app.use("/register", registrationRouter);
app.use("/admins", adminRouter);
app.use(
  "/pharmacist-registration-requests",
  pharmacistRegistrationRequestRouter
);
app.use("/auth", authRouter);
