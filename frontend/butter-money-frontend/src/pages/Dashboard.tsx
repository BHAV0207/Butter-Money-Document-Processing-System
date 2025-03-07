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
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center"
    >
      {/* Navbar */}
      <nav className="w-full bg-white p-4 shadow-md flex justify-between items-center fixed top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-700">
          📄 Butter Money Dashboard
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </motion.button>
      </nav>

      {/* Content */}
      <div className="mt-20 w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Upload and View Documents
        </h3>
        <FileUpload />

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/loan-agreement")}
          className="block text-center mt-6 text-blue-500 font-semibold hover:underline"
        >
          Generate Loan Agreement ➜
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
