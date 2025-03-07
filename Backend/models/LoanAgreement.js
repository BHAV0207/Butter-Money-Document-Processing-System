const mongoose = require("mongoose");

const LoanAgreementSchema = new mongoose.Schema({
  templateName: { type: String, required: true, unique: true },
  templateText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LoanAgreement", LoanAgreementSchema);
