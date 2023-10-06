import express from 'express';
import { getAllMedicines, addMedicine } from '../controllers/medicineController';

const router = express.Router();

router.get('/', getAllMedicines);
router.post('/', addMedicine);

export default router;
