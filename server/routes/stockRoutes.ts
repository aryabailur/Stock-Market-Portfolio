import { Router } from "express";
import { getStockHistory } from "../controllers/stockController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// The ':symbol' part is a URL parameter
router.get("/:symbol/history", authMiddleware, getStockHistory);

export default router;
