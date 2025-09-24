// client/src/services/authService.ts
import axios from "axios";

// The base URL of your backend API
const API_URL = "http://localhost:5000/api/auth"; // Make sure the port matches your server's port

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    email,
    password,
  });
  return response.data; // This will return the { token } object
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data; // This will return the { token } object
};
