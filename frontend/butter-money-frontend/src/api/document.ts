import axios from "axios";
import { getAuthToken } from "./auth";

const API_URL =
  "https://butter-money-document-processing-system-1.onrender.com/api/documents";

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const extractDataFromPDF = async (filename: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/extract`,
      { filename },
      {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error extracting data:", error);
    throw error;
  }
};
