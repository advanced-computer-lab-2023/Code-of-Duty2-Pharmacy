import express from "express";
import {
  deletePharmacist,
  getPharmacists,
  searchPharmacists,
} from "../controllers/pharmacistController";
import { authenticateUser } from "../middlewares/authentication";
import { authorizeUser } from "../middlewares/authorization";
import UserRole from "../types/enums/UserRole";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

// --> Path: /pharmacists/

router.use(authenticateUser);

router.delete("/:id", deletePharmacist);
router.get("/", getPharmacists);
router.get("/search", searchPharmacists);

export default router;
