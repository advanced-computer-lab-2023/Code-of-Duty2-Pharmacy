import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "./config";
import connectToDB from "./utils/database";
import medicineRouter from "./routes/medicineRoutes";
import patientRouter from "./routes/patientRoutes";
import registrationRouter from "./routes/registrationRoutes";
import adminRouter from "./routes/adminRoutes";
import pharmacistRouter from "./routes/pharmacistRoutes";
import doctorRouter from "./routes/doctorRoutes";
import pharmacistRegistrationRequestRouter from "./routes/pharmacistRegistrationRequestRoutes";
import authRouter from "./routes/authRoutes";
import paymentRouter from "./routes/paymentRoutes";
import forgetPasswordRouter from "./routes/ForgetPassword";
import { Server } from "socket.io";
import { authenticateSocketConnection } from "./middlewares/authentication";
import http from "http";
import socketEventListeners from "./socket-connections";

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
app.use("/doctors", doctorRouter);
app.use("/register", registrationRouter);
app.use("/admins", adminRouter);
app.use("/pharmacist-registration-requests", pharmacistRegistrationRequestRouter);
app.use("/auth", authRouter);
app.use("/auth", forgetPasswordRouter);
app.use("/payments", paymentRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: config.server.corsOptions
});
io.use(authenticateSocketConnection);
io.on("connection", socketEventListeners);

server.listen(config.server.socketPort, () => {
  console.log(`Socket server listening on port ${config.server.socketPort}`);
});
