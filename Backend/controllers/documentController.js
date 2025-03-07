const multer = require("multer");
const path = require("path");
const Document = require("../models/Document");

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) return cb(null, true);
    return cb(new Error("Only PDF and DOCX files are allowed"));
  },
});

// Upload Document API
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newDocument = new Document({
      user: req.user.id,
      filename: req.file.filename,
      fileType: req.file.mimetype,
    });

    await newDocument.save();
    res.status(201).json({ message: "File uploaded successfully", document: newDocument });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { upload, uploadDocument };
