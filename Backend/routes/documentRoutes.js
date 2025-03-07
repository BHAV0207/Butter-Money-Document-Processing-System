const express = require("express");
const { upload, uploadDocument } = require("../controllers/documentController");
const { extractTextFromPDF } = require("../controllers/pdfController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadDocument);
router.post("/extract", protect, extractTextFromPDF);

module.exports = router;
