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

/**
 * Adds a new investment for the logged-in user.
 * @param investmentData - The details of the investment to add.
 */
export const addPortfolioInvestment = async (
  investmentData: NewInvestmentData
) => {
  const response = await axios.post(API_URL, investmentData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
