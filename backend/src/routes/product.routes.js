import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

import {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    removeProduct
} from "../controllers/product.controller.js";

const router = express.Router();


router.get("/",getProducts);
router.get("/:id",getProduct);
router.post("/", authMiddleware, roleMiddleware ("admin"), addProduct);
router.put("/:id", authMiddleware, roleMiddleware("admin"), editProduct);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), removeProduct);

export default router