import { getQuote } from "../services/FinnHubServices.js";
import { getInvestmentsByUserId, addInvestment, deleteInvestmentById, // Add this import
 } from "../models/investmentModel.js";
export const getPortfolio = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const userId = parseInt(req.user.id, 10);
        const investments = await getInvestmentsByUserId(userId);
        const enrichedInvestments = await Promise.all(investments.map(async (investment) => {
            const quote = await getQuote(investment.symbol);
            const current_price = quote.c;
            const quantity = parseFloat(investment.quantity);
            const purchase_price = parseFloat(investment.purchase_price);
            const purchase_value = quantity * purchase_price;
            const current_value = quantity * current_price;
            const profit_loss = current_value - purchase_value;
            return {
                ...investment,
                current_price,
                current_value,
                profit_loss,
            };
        }));
        res.status(200).json(enrichedInvestments);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching portfolio", error });
    }
};
export const addInvestmentToPortfolio = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const { symbol, quantity, purchase_price } = req.body;
        if (symbol === undefined ||
            quantity === undefined ||
            purchase_price === undefined) {
            return res
                .status(400)
                .json({ message: "Symbol, quantity, and purchase price are required" });
        }
        const numericQuantity = parseFloat(quantity);
        const numericPurchasePrice = parseFloat(purchase_price);
        if (isNaN(numericQuantity) || isNaN(numericPurchasePrice)) {
            return res.status(400).json({
                message: "Quantity and purchase price must be valid numbers.",
            });
        }
        const newInvestment = {
            symbol,
            quantity: numericQuantity,
            purchase_price: numericPurchasePrice,
            user_id: parseInt(req.user.id, 10),
        };
        const [createdInvestment] = await addInvestment(newInvestment);
        res.status(201).json(createdInvestment);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding investment", error });
    }
};
// Add this new function
export const deleteInvestment = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const investmentId = parseInt(req.params.id, 10);
        const userId = parseInt(req.user.id, 10);
        if (isNaN(investmentId)) {
            return res.status(400).json({ message: "Invalid investment ID" });
        }
        await deleteInvestmentById(investmentId, userId);
        res.status(200).json({ message: "Investment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting investment", error });
    }
};
