import FileUpload from "../components/FileUpload";
import PdfViewer from "../components/PdfViewer";
import { useState } from "react";

const Dashboard = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  return (
    <div>
      <h2>Dashboard</h2>
      <FileUpload />

      <h3>Uploaded PDF</h3>
      <PdfViewer pdfUrl={pdfUrl} />

      <h3>Loan Agreement</h3>
      <a href="/loan-agreement">Go to Loan Agreement</a>
    </div>
  );
};

export default Dashboard;
