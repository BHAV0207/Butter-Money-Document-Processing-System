import { useState } from "react";
import { generateLoanAgreement, downloadAgreement } from "../api/loan";
import { motion } from "framer-motion";

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
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Generate Loan Agreement
        </h2>

        <div className="space-y-4">
          <input
            type="date"
            placeholder="Agreement Date"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) =>
              setUserData({ ...userData, AGREEMENT_DATE: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Bank Name"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) =>
              setUserData({ ...userData, BANK_NAME: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Borrower Name"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) =>
              setUserData({ ...userData, BORROWER_NAME: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Borrower Address"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) =>
              setUserData({ ...userData, BORROWER_ADDRESS: e.target.value })
            }
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            onClick={handleGenerate}
          >
            {loading ? "Generating..." : "Generate Agreement"}
          </motion.button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {generatedFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 text-sm">
                Generated File: {generatedFile}
              </p>
              <button
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                onClick={() => downloadAgreement(generatedFile)}
              >
                Download Agreement
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LoanAgreement;
