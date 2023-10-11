
import express from 'express';
import {registerPatient, registerPharmacist } from '../controllers/registrationController';
const router = express.Router();

router.post('/', registerPatient);
router.post('/pharmacist', registerPharmacist);


export default router;
