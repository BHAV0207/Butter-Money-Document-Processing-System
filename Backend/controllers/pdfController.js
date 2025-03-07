const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

// Extract Text and Tables from PDF
exports.extractTextFromPDF = async (req, res) => {
  try {
    const { filename } = req.body; // Pass filename from request body
    const filePath = path.join(__dirname, "../uploads", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    const pdfBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(pdfBuffer);

    // Here, we extract text and simple tables (advanced table extraction can use Tabula)
    res.json({ text: pdfData.text });
  } catch (error) {
    res.status(500).json({ message: "Error processing PDF", error: error.message });
  }
};
