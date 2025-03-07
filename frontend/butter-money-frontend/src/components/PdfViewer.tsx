import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";

// Ensure correct worker version
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  return (
    <div className="h-[500px] w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
      <Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default PdfViewer;
