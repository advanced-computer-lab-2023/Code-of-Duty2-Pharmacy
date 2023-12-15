import express from "express";
import { getDoctorById, getAllDoctors, searchDoctors } from "../controllers/doctorController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

// --> Path: /doctors/

router.use(authenticateUser);

router.get("/", getAllDoctors);
router.get("/search", searchDoctors);
router.get("/:id", getDoctorById);

export default router;
