import { Router } from "express";
import { getStockHistory, getStockQuote, } from "../controllers/stockController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router.get("/history/:symbol", authMiddleware, getStockHistory);
router.get("/quote/:symbol", authMiddleware, getStockQuote);
export default router;
