import express from 'express';
import { getAllMedicines } from '../controllers/medicineController';

const router = express.Router();

router.get('/', getAllMedicines);

export default router;
