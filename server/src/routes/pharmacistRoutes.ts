import express from "express";
import {
  deletePharmacist,
  getPharmacistInfo,
  getPharmacists,
  searchPharmacists,
} from "../controllers/pharmacistController";
import { authenticateUser } from "../middlewares/authentication";
import { authorizeUser } from "../middlewares/authorization";
import UserRole from "../types/UserRole";
import { StatusCodes } from "http-status-codes";
import { get } from "http";

const router = express.Router();

// --> Path: /pharmacists/

router.use(authenticateUser);

router.delete("/:id", deletePharmacist);
router.get("/", getPharmacists);
router.get("/search", searchPharmacists);
router.get("/me/complete-info", getPharmacistInfo);

export default router;
