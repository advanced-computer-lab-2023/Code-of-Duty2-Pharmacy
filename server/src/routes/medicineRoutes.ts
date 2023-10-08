import express from 'express';
import { getAllMedicines, addMedicine, updateMedicine, searchMedicines } from '../controllers/medicineController';

const router = express.Router();

router.get('/', getAllMedicines);
router.get('/search', searchMedicines);
router.post('/', addMedicine);
router.patch('/:id', updateMedicine);

export default router;
