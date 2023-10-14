import express from 'express';

import { getAllPharmacistRegistrationRequests } from '../controllers/adminController';

const router = express.Router();

router.get('/', getAllPharmacistRegistrationRequests);

export default router;
