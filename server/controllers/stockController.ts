import { Response } from "express";
import { getStockCandles } from "../services/FinnHubServices.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

export const getStockHistory = async (req: AuthRequest, res: Response) => {
  try {
    const symbol = req.params.symbol.toUpperCase();

    // Calculate a date range (e.g., the last year)
    const to = Math.floor(Date.now() / 1000); // Current time in Unix seconds
    const from = to - 365 * 24 * 60 * 60; // One year ago

    // Fetch daily candle data
    const candleData = await getStockCandles(symbol, "D", from, to);

    res.status(200).json(candleData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock history", error });
  }
};
