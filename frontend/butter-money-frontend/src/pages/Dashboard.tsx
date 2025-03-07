import FileUpload from "../components/FileUpload";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center"
    >
      <nav className="w-full bg-white p-4 shadow-md flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { logout(); navigate("/"); }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </motion.button>
      </nav>

      <div className="mt-10 w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-bold mb-4">Upload and View Documents</h3>
        <FileUpload />
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/loan-agreement")}
          className="block text-center mt-4 text-blue-500 hover:underline"
        >
          Generate Loan Agreement
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
