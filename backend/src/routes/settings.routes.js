import express from "express";
import {getShippingRate} from "../controllers/Settings.controller.js";

const router = express.Router();

router.get("/settings", getShippingRate);

export default router;