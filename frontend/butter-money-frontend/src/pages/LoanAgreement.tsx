import { useState } from "react";
import { generateLoanAgreement, downloadAgreement } from "../api/loan";
import { motion } from "framer-motion";
import PdfViewer from "../components/PdfViewer";

const LoanAgreement = () => {
  const [userData, setUserData] = useState({
    AGREEMENT_DATE: "",
    BANK_NAME: "",
    BORROWER_NAME: "",
    BORROWER_ADDRESS: "",
  });

  const [generatedFile, setGeneratedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false); // State to toggle preview

  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("Generating Agreement with:", userData);

      const response = await generateLoanAgreement(
        "Home Loan Agreement",
        userData
      );

      if (!response.pdfPath) {
        throw new Error("No file path returned from API");
      }

      setGeneratedFile(response.pdfPath);
    } catch (err) {
      setError("Error generating agreement. Please try again.");
      console.error("Error generating agreement:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4"
    >
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Generate Loan Agreement
        </h2>

        <div className="space-y-4">
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setUserData({ ...userData, AGREEMENT_DATE: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Bank Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setUserData({ ...userData, BANK_NAME: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Borrower Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setUserData({ ...userData, BORROWER_NAME: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Borrower Address"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setUserData({ ...userData, BORROWER_ADDRESS: e.target.value })
            }
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition disabled:bg-blue-300"
            onClick={handleGenerate}
          >
            {loading ? "Generating..." : "Generate Agreement"}
          </motion.button>
        </div>

        {generatedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <p className="text-gray-700 text-sm mb-2 text-center">
              Agreement generated successfully!
            </p>

            {/* Download Button */}
            <motion.button
              className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => downloadAgreement(generatedFile)}
            >
              Download Agreement
            </motion.button>

            {/* View Preview Button */}
            {/* <motion.button
              className="w-full mt-3 bg-purple-500 text-white p-3 rounded hover:bg-purple-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Close Preview" : "View Preview"}
            </motion.button> */}

            {/* Conditional PDF Viewer */}
            {/* {showPreview && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 border border-gray-200 p-3 rounded-lg bg-gray-50 shadow"
              >
                <h3 className="text-lg font-semibold text-gray-700 text-center">
                  Loan Agreement Preview
                </h3>
                <PdfViewer
                  pdfUrl={`https://butter-money-document-processing-system-1.onrender.com/uploads/${generatedFile}`}
                />
              </motion.div>
            )} */}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LoanAgreement;
