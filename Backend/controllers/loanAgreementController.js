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

    const template = await LoanAgreement.findOne({ templateName });
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    const filledText = replacePlaceholders(template.templateText, userData);

    // Create a PDF
    const pdfPath = path.join(
      __dirname,
      `../uploads/${userData.BORROWER_NAME}-loan-agreement.pdf`
    );
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(12).text(filledText, { align: "left" });

    doc.end();

    res.status(200).json({ message: "Agreement generated", pdfPath });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating agreement", error: error.message });
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
