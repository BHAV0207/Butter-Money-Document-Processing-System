const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

require("dotenv").config();


// Import Routes
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Authorization", "Content-Type"] }));
// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log requests

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);

const documentRoutes = require("./routes/documentRoutes");
app.use("/api/documents", documentRoutes);

const loanRoutes = require("./routes/loanRoutes");
app.use("/api/loan", loanRoutes);


const path = require("path");

// Serve the "uploads" directory for public access
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
