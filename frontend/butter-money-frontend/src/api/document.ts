import axios from "axios";
import { getAuthToken } from "./auth";

const API_URL = "http://localhost:5000/api/documents";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const extractDataFromPDF = async (filename: string) => {
  return axios.post(`${API_URL}/extract`, { filename }, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
};
