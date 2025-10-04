import axios from "axios";

const API_URL = "http://localhost:5000/api/portfolio";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- API Functions ---

export const getPortfolioData = async () => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const addPortfolioInvestment = async (investmentData: {
  symbol: string;
  quantity: number;
  purchase_price: number;
}) => {
  const response = await axios.post(API_URL, investmentData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
