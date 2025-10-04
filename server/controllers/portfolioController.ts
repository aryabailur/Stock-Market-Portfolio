import { Response } from "express";
import {
  getInvestmentsByUserId,
  addInvestment,
} from "../models/investmentModel";
import { AuthRequest } from "../middleware/authMiddleware";

export const getPortfolio = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userIdString = req.user.id;
    const userId = parseInt(userIdString, 10);

    const investments = await getInvestmentsByUserId(userId);

    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio", error });
  }
};

export const addInvestmentToPortfolio = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { symbol, quantity, purchase_price } = req.body;

    if (!symbol || !quantity || !purchase_price) {
      return res
        .status(400)
        .json({ message: "Symbol, quantity, and purchase price are required" });
    }

    const newInvestment = {
      symbol,
      quantity,
      purchase_price,
      user_id: parseInt(req.user.id, 10),
    };

    const [createdInvestment] = await addInvestment(newInvestment);
    res.status(201).json(createdInvestment);
  } catch (error) {
    res.status(500).json({ message: "Error adding investment", error });
  }
};
