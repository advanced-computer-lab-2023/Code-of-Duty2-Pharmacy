
import express from 'express';
import { addAdmin } from '../controllers/adminController';
import { getAllPharmacistRegistrationRequests } from '../controllers/adminController';


const router = express.Router();

router.post('/', addAdmin);
router.get('/pharmacist-registration-requests',getAllPharmacistRegistrationRequests);

export default router;
