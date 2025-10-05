import axios from "axios";
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || "demo"; // Free demo key
const BASE_URL = "https://finnhub.io/api/v1";
export const getStockCandles = async (symbol, resolution, from, to) => {
    try {
        // Using Alpha Vantage for historical data (it's free!)
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        console.log("Fetching from Alpha Vantage for symbol:", symbol);
        const response = await axios.get(url);
        const timeSeries = response.data["Time Series (Daily)"];
        if (!timeSeries) {
            throw new Error("No data available");
        }
        // Convert Alpha Vantage format to FinnHub format
        const dates = Object.keys(timeSeries).sort().slice(-365); // Last year
        const candles = {
            c: dates.map((date) => parseFloat(timeSeries[date]["4. close"])),
            h: dates.map((date) => parseFloat(timeSeries[date]["2. high"])),
            l: dates.map((date) => parseFloat(timeSeries[date]["3. low"])),
            o: dates.map((date) => parseFloat(timeSeries[date]["1. open"])),
            t: dates.map((date) => new Date(date).getTime() / 1000),
            s: "ok",
        };
        console.log("Successfully fetched candle data for", symbol);
        return candles;
    }
    catch (error) {
        console.error(`Error fetching candle data for ${symbol}:`, error.response?.data || error.message);
        throw new Error("Failed to fetch stock candle data from provider.");
    }
};
export const getQuote = async (symbol) => {
    try {
        const url = `${BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching quote for ${symbol} from Finnhub:`, error);
        throw new Error("Failed to fetch quote from provider.");
    }
};
