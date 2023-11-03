import express from 'express';
import { getAllMedicines, addMedicine, updateMedicine, searchMedicines, getMedicineSales, getAllMedicinesSales} from '../controllers/medicineController';
import { authenticateUser } from '../middlewares/authentication';

const router = express.Router();

router.use(authenticateUser);

router.get('/', getAllMedicines);
router.get('/search', searchMedicines);
router.post('/', addMedicine);
router.get('/sales', getAllMedicinesSales);
router.post('/sales', getMedicineSales);
router.patch('/:id', updateMedicine);

export default router;
