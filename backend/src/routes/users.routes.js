import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/profile",authMiddleware, getUserProfile)
router.post("/register",registerUser);
router.post("/login",loginUser)

export default router