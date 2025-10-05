import { Router } from "express";
import { getStockHistory } from "../controllers/stockController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router.get("/history/:symbol", authMiddleware, getStockHistory);
export default router;
