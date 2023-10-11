import express from 'express';
import { deletePharmacist } from '../controllers/pharmacistController';

const router = express.Router();
;
router.delete('/:id', deletePharmacist);

export default router;
