import axios from "axios";
import { getAuthToken } from "./auth";

const API_URL = "http://localhost:5000/api/loan";

export const generateLoanAgreement = async (templateName: string, userData: any) => {
  try {
    console.log("Sending request to generate agreement:", { templateName, userData });

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


export const downloadAgreement = (filename: string) => {
  if (!filename) {
    console.error("Filename is missing. Cannot download.");
    return;
  }

  const fileUrl = `http://localhost:5000/api/loan/download/${encodeURIComponent(filename)}`;
  console.log("Downloading file from:", fileUrl);

  window.open(fileUrl, "_blank");
};
