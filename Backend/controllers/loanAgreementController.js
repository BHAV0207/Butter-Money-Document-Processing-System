const LoanAgreement = require("../models/LoanAgreement");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Add a New Loan Agreement Template
exports.addTemplate = async (req, res) => {
  try {
    const { templateName, templateText } = req.body;

    const existingTemplate = await LoanAgreement.findOne({ templateName });
    if (existingTemplate) {
      return res.status(400).json({ message: "Template already exists" });
    }

    const newTemplate = new LoanAgreement({ templateName, templateText });
    await newTemplate.save();

    res
      .status(201)
      .json({ message: "Template added successfully", template: newTemplate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Replace Placeholders in Template
const replacePlaceholders = (template, data) => {
  let processedText = template;
  Object.keys(data).forEach((key) => {
    const placeholder = `{{${key}}}`;
    processedText = processedText.replace(
      new RegExp(placeholder, "g"),
      data[key]
    );
  });
  return processedText;
};

// Generate Loan Agreement PDF
exports.generateAgreement = async (req, res) => {
  try {
    const { templateName, userData } = req.body;

    if (!templateName || !userData) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const filename = `${userData.BORROWER_NAME.replace(/\s+/g, "_")}-loan-agreement.pdf`;
    const pdfPath = path.join(__dirname, `../uploads/${filename}`);

    // Ensure the "uploads" directory exists
    if (!fs.existsSync(path.join(__dirname, "../uploads"))) {
      fs.mkdirSync(path.join(__dirname, "../uploads"), { recursive: true });
    }

    // Generate PDF
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);
    doc.fontSize(12).text(`Loan Agreement for ${userData.BORROWER_NAME}`, { align: "center" });
    doc.text(`Bank: ${userData.BANK_NAME}`);
    doc.text(`Address: ${userData.BORROWER_ADDRESS}`);
    doc.end();

    stream.on("finish", () => {
      console.log("PDF Generated Successfully:", filename);
      res.status(200).json({ message: "Agreement generated", pdfPath: filename });
    });

    stream.on("error", (err) => {
      console.error("PDF Generation Error:", err);
      res.status(500).json({ message: "Error generating PDF", error: err.message });
    });

  } catch (error) {
    console.error("Error generating agreement:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Download Generated PDF
exports.downloadAgreement = (req, res) => {
  try {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = path.join(__dirname, `../uploads/${filename}`);

    console.log(`Request to download: ${filename}`);

    if (!fs.existsSync(filePath)) {
      console.log("File not found:", filePath);
      return res.status(404).json({ message: "File not found" });
    }

    console.log(`Streaming file: ${filePath}`);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Download Error:", error);
    res
      .status(500)
      .json({ message: "Error downloading file", error: error.message });
  }
};
