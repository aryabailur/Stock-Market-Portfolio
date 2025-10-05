import axios from "axios";

const API_URL = "/api/portfolio";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

interface NewInvestmentData {
  symbol: string;
  quantity: number;
  purchase_price: number;
}

export const getPortfolioData = async () => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const addPortfolioInvestment = async (
  investmentData: NewInvestmentData
) => {
  const response = await axios.post(API_URL, investmentData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// New function to get current prices for a symbol
export const getCurrentPrice = async (symbol: string) => {
  try {
    const response = await axios.get(`/api/stocks/quote/${symbol}`, {
      headers: getAuthHeaders(),
    });
    return response.data.c || 0; // Returns current price
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return 0;
  }
};
