import express from "express";
import { 
    getUserOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus
} from "../controllers/orders.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";


const router = express.Router();

// User routes
router.get("/", authMiddleware, getUserOrders);
router.get("/:id", authMiddleware, getSingleOrder);

// Admin routes
router.get("/admin/all", authMiddleware, roleMiddleware("admin"), getAllOrders);
router.put("/admin/:id", authMiddleware, roleMiddleware("admin"), updateOrderStatus);

export default router;
