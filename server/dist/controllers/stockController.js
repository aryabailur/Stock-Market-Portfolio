import { getStockCandles, getQuote } from "../services/FinnHubServices.js";
export const getStockHistory = async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        const to = Math.floor(Date.now() / 1000);
        const from = to - 365 * 24 * 60 * 60;
        const candleData = await getStockCandles(symbol, "D", from, to);
        if (!candleData || candleData.s !== "ok") {
            return res.status(404).json({
                message: `Chart data not available for ${symbol}. This symbol may not be supported by the data provider.`,
                candleData,
            });
        }
        res.status(200).json(candleData);
    }
    catch (error) {
        console.error("Error fetching stock history:", error);
        res.status(404).json({
            message: `Unable to load chart for this symbol. It may not be available in our data provider.`,
            error: error.message || error,
        });
    }
};
export const getStockQuote = async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        const quote = await getQuote(symbol);
        res.status(200).json(quote);
    }
    catch (error) {
        console.error("Error fetching stock quote:", error);
        res.status(500).json({
            message: "Error fetching stock quote",
            error: error.message || error,
        });
    }
};
