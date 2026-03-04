import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import { getAllUserDetails } from '../controllers/users.controller.js';
const router = express.Router();

router.get("/profile",authMiddleware, getUserProfile)
router.post("/register",registerUser);
router.post("/login",loginUser)

//Admin Only
router.get("/admin/all", authMiddleware, roleMiddleware("admin"), getAllUserDetails);

export default router