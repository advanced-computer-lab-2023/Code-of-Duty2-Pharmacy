import express from "express";
import {
  getAllMedicines,
  addMedicine,
  updateMedicine,
  searchMedicines,
  getMedicineSales,
  getAllMedicinesSales,
  bulkUpdateMedicineQuantities,
  archiveOrUnarchiveMedicine
} from "../controllers/medicineController";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.use(authenticateUser);
router.get("/", getAllMedicines);
router.post("/", addMedicine);
router.get("/sales", getAllMedicinesSales);
router.post("/sales", getMedicineSales);
router.get("/search", searchMedicines);
router.patch("/bulk-update", bulkUpdateMedicineQuantities);
router.post("/archive-or-unarchive/:id", archiveOrUnarchiveMedicine);

// WARNING: Keep these routes at the bottom of the file
router.patch("/:id", updateMedicine);

export default router;
