import express from "express";

import { addAdmin, changeAdminPassword, deleteAdmin } from "../controllers/adminController";
import { authenticateUser } from "../middlewares/authentication";
import { getAllAdmins } from "../controllers/adminController";

const router = express.Router();

router.use(authenticateUser);
router.get("/", getAllAdmins);
router.post("/", addAdmin);
router.post("/change-password", changeAdminPassword);

// WARNING: Keep these routes at the bottom of the file
router.delete("/:id", deleteAdmin);

export default router;
