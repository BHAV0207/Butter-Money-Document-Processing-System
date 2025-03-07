import { useState } from "react";
import { generateLoanAgreement, downloadAgreement } from "../api/loan";

const LoanAgreement = () => {
  const [userData, setUserData] = useState({
    AGREEMENT_DATE: "",
    BANK_NAME: "",
    BORROWER_NAME: "",
    BORROWER_ADDRESS: "",
  });

  const [generatedFile, setGeneratedFile] = useState("");

  const handleGenerate = async () => {
    const response = await generateLoanAgreement("Home Loan Agreement", userData);
    setGeneratedFile(response.data.pdfPath);
  };

  return (
    <div>
      <h2>Generate Loan Agreement</h2>
      <input type="text" placeholder="Agreement Date" onChange={(e) => setUserData({ ...userData, AGREEMENT_DATE: e.target.value })} />
      <input type="text" placeholder="Bank Name" onChange={(e) => setUserData({ ...userData, BANK_NAME: e.target.value })} />
      <input type="text" placeholder="Borrower Name" onChange={(e) => setUserData({ ...userData, BORROWER_NAME: e.target.value })} />
      <input type="text" placeholder="Borrower Address" onChange={(e) => setUserData({ ...userData, BORROWER_ADDRESS: e.target.value })} />

      <button onClick={handleGenerate}>Generate Agreement</button>

      {generatedFile && (
        <div>
          <button onClick={() => downloadAgreement(generatedFile)}>Download Agreement</button>
        </div>
      )}
    </div>
  );
};

export default LoanAgreement;
