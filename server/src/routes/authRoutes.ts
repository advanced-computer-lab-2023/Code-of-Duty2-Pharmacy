import  express  from "express";
import { login } from "../controllers/auth/login";
import { pharmacistLogin } from "../controllers/auth/pharmacistLogin";
import { logout } from "../controllers/auth/logout";
import { refreshAccessToken } from "../controllers/auth/refreshToken";

const router = express.Router();

router.post('/login', login);
router.post('/pharmacist-login', pharmacistLogin);
router.post('/logout', logout);
router.post('/refresh-token', refreshAccessToken);

export default router