import { Router } from "express";
import { getPortfolio, addInvestmentToPortfolio, deleteInvestment, } from "../controllers/portfolioController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
// This tells the router:
// For a GET request to '/', first run authMiddleware, then run getPortfolio.
router.get("/", authMiddleware, getPortfolio);
// For a POST request to '/', first run authMiddleware, then run addInvestmentToPortfolio.
router.post("/", authMiddleware, addInvestmentToPortfolio);
router.delete("/:id", authMiddleware, deleteInvestment);
export default router;
