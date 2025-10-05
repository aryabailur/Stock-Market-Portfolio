import axios from "axios";
const API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1";
export const getStockCandles = async (symbol, resolution, from, to) => {
    try {
        const url = `${BASE_URL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching data for ${symbol} from Finnhub:`, error);
        throw new Error("Failed to fetch stock data from provider.");
    }
};
