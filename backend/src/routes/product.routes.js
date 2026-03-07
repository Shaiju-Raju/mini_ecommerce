import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

import {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    toggleProductStatus,
    getActiveProducts
} from "../controllers/product.controller.js";

const router = express.Router();


router.get("/admin",authMiddleware,roleMiddleware("admin"),getProducts);
router.get("/",getActiveProducts);
router.get("/:id",getProduct);
router.post("/", authMiddleware, roleMiddleware ("admin"), addProduct);
router.put("/:id", authMiddleware, roleMiddleware("admin"), editProduct);
router.patch("/:id/status", authMiddleware, roleMiddleware("admin"), toggleProductStatus);

export default router