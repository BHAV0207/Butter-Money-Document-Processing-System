import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  Cookies.set("token", response.data.token);
  return response.data;
};

export const logout = () => {
  Cookies.remove("token");
};

export const getAuthToken = () => Cookies.get("token");
