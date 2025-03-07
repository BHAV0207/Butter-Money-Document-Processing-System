import axios from "axios";
import { getAuthToken } from "./auth";

const API_URL = "http://localhost:5000/api/loan";

export const generateLoanAgreement = async (templateName: string, userData: any) => {
  return axios.post(`${API_URL}/generate`, { templateName, userData }, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
};

export const downloadAgreement = (filename: string) => {
  window.open(`http://localhost:5000/api/loan/download/${filename}`, "_blank");
};
