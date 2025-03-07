import axios from "axios";
import { getAuthToken } from "./auth";

const API_URL = "http://localhost:5000/api/loan";

export const generateLoanAgreement = async (
  templateName: string,
  userData: any
) => {
  try {
    console.log("Sending request to generate agreement:", {
      templateName,
      userData,
    });

    const response = await axios.post(
      `${API_URL}/generate`,
      { templateName, userData },
      {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      }
    );

    console.log("Response from generateAgreement API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in generateLoanAgreement:", error);
    throw error;
  }
};

export const downloadAgreement = async (filename: string) => {
  if (!filename) {
    console.error("Filename is missing. Cannot download.");
    return;
  }

  const fileUrl = `${API_URL}/download/${encodeURIComponent(filename)}`;

  try {
    const response = await axios.get(fileUrl, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      responseType: "blob", // Ensure we receive a file as a binary response
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
