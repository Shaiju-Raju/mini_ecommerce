import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { checkout } from "../controllers/checkout.controller.js";
import {
  addToCart,
  getItemFromCart,
  removeItemFromCart,
  updateCartQty,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addToCart);
router.get("/", getItemFromCart);
router.delete("/:productId", removeItemFromCart);
router.put("/:cart_item_id",updateCartQty)
router.post("/checkout", checkout);

export default router;
