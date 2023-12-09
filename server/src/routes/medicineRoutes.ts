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
import { arch } from "os";

const router = express.Router();

// --> Path: /medicines/

router.use(authenticateUser);
router.get("/", getAllMedicines);
router.post("/", addMedicine);
router.get("/sales", getAllMedicinesSales);
router.post("/sales", getMedicineSales);
router.get("/search", searchMedicines);
router.patch("/bulk-update", bulkUpdateMedicineQuantities);
router.patch("/:id", updateMedicine);
router.post("/archive-or-unarchive/:id", archiveOrUnarchiveMedicine);

export default router;
