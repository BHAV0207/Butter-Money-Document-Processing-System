import axios from "axios";

const API_URL =
  "https://butter-money-document-processing-system-1.onrender.com/api/auth";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getAuthToken = () => localStorage.getItem("token");

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
