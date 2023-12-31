import express from "express";
import {
  getAllMedicines,
  addMedicine,
  updateMedicine,
  searchMedicines,
  getMedicineSales,
  getAllMedicinesSales,
  bulkUpdateMedicineQuantities,
  archiveOrUnarchiveMedicine,
  getTopThreeMedicines,
  getMedicineById
} from "../controllers/medicineController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

// --> Path: /medicines/

router.use(authenticateUser);
router.get("/", getAllMedicines);
router.post("/", addMedicine);
router.get("/sales", getAllMedicinesSales);
router.post("/sales", getMedicineSales);
router.get("/search", searchMedicines);
router.patch("/bulk-update", bulkUpdateMedicineQuantities);
router.post("/archive-or-unarchive/:id", archiveOrUnarchiveMedicine);
router.get("/top-three", getTopThreeMedicines);

// WARNING: Keep these routes at the bottom of the file
router.patch("/:id", updateMedicine);
router.get("/:id", getMedicineById);

export default router;
