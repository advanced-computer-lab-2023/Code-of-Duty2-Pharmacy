import express from "express";
import {
  changePharmacistPassword,
  deletePharmacist,
  getPharmacists,
  searchPharmacists,
} from "../controllers/pharmacistController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);

router.delete("/:id", deletePharmacist);
router.get("/", getPharmacists);
router.get("/search", searchPharmacists);
router.post("/change-password", changePharmacistPassword);

export default router;
