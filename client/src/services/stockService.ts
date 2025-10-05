import axios from "axios";

const API_URL = "http://localhost:5000/api/stocks";

export const getStockHistory = async (symbol: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.get(`${API_URL}/history/${symbol}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Log the response to see what we're getting
    console.log("Stock history response:", response.data);

    return response.data;
  } catch (error: any) {
    // Better error logging
    console.error(
      "Stock history error:",
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please login again.");
    } else if (error.response?.status === 404) {
      throw new Error(`Stock symbol ${symbol} not found`);
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(`Failed to fetch stock history: ${error.message}`);
    }
  }
};
