import { useState } from "react";
import { uploadFile, extractDataFromPDF } from "../api/document";
import { motion } from "framer-motion";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [extractedData, setExtractedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const response = await uploadFile(file);
      setUploadedFilename(response.document.filename);

      // Automatically extract data after upload
      const extractResponse = await extractDataFromPDF(response.document.filename);
      setExtractedData(extractResponse.text);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded text-center">
      <input type="file" className="mb-2" onChange={(e) => setFile(e.target.files?.[0] || null)} />

      {uploading ? (
        <motion.div animate={{ opacity: [0, 1], scale: [0.95, 1] }} transition={{ duration: 0.5 }} className="text-blue-500">
          Uploading...
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleUpload}
        >
          Upload
        </motion.button>
      )}

      {uploadedFilename && <p className="mt-2 text-green-500">File Uploaded: {uploadedFilename}</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      {extractedData && (
        <div className="mt-4 p-3 border border-gray-200 rounded bg-gray-50">
          <h3 className="font-semibold">Extracted Data:</h3>
          <p className="text-gray-700">{extractedData}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
