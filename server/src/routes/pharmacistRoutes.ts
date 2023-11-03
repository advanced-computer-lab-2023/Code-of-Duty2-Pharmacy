import express from 'express';
import { deletePharmacist, getPharmacists, searchPharmacists } from '../controllers/pharmacistController';
import { authenticateUser } from '../middlewares/authentication';
import { authorizeUser } from '../middlewares/authorization';
import UserRole from '../types/UserRole';

const router = express.Router();

router.use(authenticateUser);
router.use(authorizeUser(UserRole.PHARMACIST));

router.delete('/:id', deletePharmacist);
router.get('/', getPharmacists);
router.get('/search', searchPharmacists);


export default router;
