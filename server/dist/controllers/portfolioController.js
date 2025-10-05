import { getInvestmentsByUserId, addInvestment, } from "../models/investmentModel.js";
export const getPortfolio = async (req, res) => {
    try {
        console.log("CONTROLLER IS UPDATED AND RUNNING");
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const userId = parseInt(req.user.id, 10);
        const investments = await getInvestmentsByUserId(userId);
        res.status(200).json(investments);
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
        // --- FIX IS HERE ---
        const numericQuantity = parseInt(quantity);
        const numericPurchasePrice = parseFloat(purchase_price);
        if (isNaN(numericQuantity) || isNaN(numericPurchasePrice)) {
            return res.status(400).json({
                message: "Quantity and purchase price must be valid numbers.",
            });
        }
        // -----------------
        const newInvestment = {
            symbol,
            quantity: numericQuantity,
            purchase_price: numericPurchasePrice,
            user_id: parseInt(req.user.id, 10),
        };
        console.log("=== DEBUGGING ===");
        console.log("req.user:", req.user);
        console.log("newInvestment:", newInvestment);
        console.log("Types:", {
            symbol: typeof newInvestment.symbol,
            quantity: typeof newInvestment.quantity,
            purchase_price: typeof newInvestment.purchase_price,
            user_id: typeof newInvestment.user_id,
        });
        console.log("Values:", {
            symbol: newInvestment.symbol,
            quantity: newInvestment.quantity,
            purchase_price: newInvestment.purchase_price,
            user_id: newInvestment.user_id,
        });
        console.log("=================");
        const [createdInvestment] = await addInvestment(newInvestment);
        res.status(201).json(createdInvestment);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding investment", error });
    }
};
