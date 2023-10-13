import express from 'express';
import { deletePharmacist, getPharmacists, searchPharmacists } from '../controllers/pharmacistController';

const router = express.Router();
;
router.delete('/:id', deletePharmacist);
router.get('/', getPharmacists);
router.get('/search', searchPharmacists);


export default router;
