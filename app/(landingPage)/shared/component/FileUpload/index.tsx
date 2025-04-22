import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { toast } from "sonner";

interface FileUploadProps {
  onDataExtracted: (data: any) => void;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onDataExtracted,
  setopen,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setError("No file selected");
      return;
    }

    const file = files[0];
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<{ data: any }>(
        "/api/extract",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast("Data extracted successfully");

      onDataExtracted(response.data.data);
    } catch (err) {
      setError("Error processing PDF. Please try again.");
      console.error("Upload Error:", err);
    } finally {
      setUploading(false);
      setopen(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 text-center">
      <h2 className="text-xl font-semibold text-gray-700">
        Upload your PDF file
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        We’ll extract the data for you
      </p>

      <label className="cursor-pointer inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
        Choose PDF File
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>

      {uploading && (
        <p className="text-blue-500 text-sm mt-2">Processing PDF...</p>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;
