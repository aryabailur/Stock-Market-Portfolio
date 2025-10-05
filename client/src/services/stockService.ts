import axios from "axios";

const API_URL = "http://localhost:5000/api/stocks";

export const getStockHistory = async (symbol: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.get(`${API_URL}/history/${symbol}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
