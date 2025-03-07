import { useState } from "react";
import { uploadFile } from "../api/document";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (file) {
      await uploadFile(file);
      alert("File uploaded successfully!");
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
