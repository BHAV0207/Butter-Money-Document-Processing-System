const express = require("express");
const { addTemplate, generateAgreement, downloadAgreement } = require("../controllers/loanAgreementController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/template", protect, addTemplate);
router.post("/generate", protect, generateAgreement);
router.get("/download/:filename", downloadAgreement); // 🔥 Removed protect middleware

module.exports = router;
