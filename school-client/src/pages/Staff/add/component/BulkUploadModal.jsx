import React, { useState } from "react";

export default function BulkUploadModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file before uploading.");
    // Handle file upload logic here
    console.log("Uploading:", file.name);
  };

  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
  <div className="bg-white rounded-lg shadow-lg w-full h-2/5 max-w-3xl p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Bulk Upload Staff</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-black text-lg">&times;</button>
    </div>

    <div
      className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 transition"
      onClick={() => document.getElementById("fileInput").click()}
    >
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <svg
        className="w-10 h-10 text-gray-400 mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3M12 4v8"
        />
      </svg>
      <p className="text-gray-500">Drop file here or click to upload</p>
      <p className="text-sm text-gray-400 mt-1">
        Upload the staff information via an Excel file.
      </p>
    </div>

    <div className="flex items-center justify-between mt-6">
      <button
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
        onClick={() => {
          alert("Download Template triggered");
        }}
      >
        Download Template & Roles
      </button>

      <button
        className="px-5 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-700"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  </div>
</div>

  );
}
