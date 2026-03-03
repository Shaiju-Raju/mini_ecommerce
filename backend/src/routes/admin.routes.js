import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { addProduct } from "../controllers/product.controller.js";



const router = express.Router();

router.post(
    "/add-product",
    authMiddleware,
    roleMiddleware("admin"),
    addProduct
);

export default router;