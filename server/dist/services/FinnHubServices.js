import axios from "axios";
const API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1";
export const getStockCandles = async (symbol, resolution, from, to) => {
    try {
        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching data for ${symbol} from Finnhub:`, error);
        throw new Error("Failed to fetch stock data from provider.");
    }
};
export const getQuote = async (symbol) => {
    try {
        const url = `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`;
        const response = await axios.get(url);
        return response.data; // Returns { c: current_price, ... }
    }
    catch (error) {
        console.error(`Error fetching quote for ${symbol} from Finnhub:`, error);
        throw new Error("Failed to fetch quote from provider.");
    }
};
