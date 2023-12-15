import express from "express";
import { getDoctorById, getAllDoctors, searchDoctors } from "../controllers/doctorController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);
router.get("/", getAllDoctors);
router.get("/search", searchDoctors);

// WARNING: Keep these routes at the bottom of the file
router.get("/:id", getDoctorById);

export default router;
