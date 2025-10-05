import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Add "username: string" as the first parameter
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    username, // Now this variable exists in the function's scope
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};
