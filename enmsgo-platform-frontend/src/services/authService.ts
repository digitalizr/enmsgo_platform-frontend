import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Your FastAPI backend

interface Credentials {
  username: string;
  password: string;
}

interface UserData {
  username: string;
  email: string;
  password: string;
}

export const loginUser = async (credentials: Credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const registerUser = async (userData: UserData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};
