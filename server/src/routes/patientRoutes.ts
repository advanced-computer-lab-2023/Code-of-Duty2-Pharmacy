import express from 'express';
import { getAllPatients, deletePatient } from '../controllers/patientController';

const router = express.Router();

router.get('/', getAllPatients);
router.delete('/:id', deletePatient);

export default router;
