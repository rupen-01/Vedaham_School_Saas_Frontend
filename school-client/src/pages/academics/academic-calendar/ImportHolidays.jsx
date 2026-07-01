import React, { useState } from "react";
import Card from "../../../components/common/Card";
import HeadingHeader from "../../../components/common/HeadingHeader";
import { CloudUpload, FileText } from "lucide-react";
import DropSvg from "../../../../../saas-panel/src/components/common/DropSvg";

const ImportHolidays = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleBulkUpload = () => {
    if (file) {
      console.log("Uploading:", file);
      // upload logic here
    } else {
      alert("Please select a file to upload!");
    }
  };

  return (
    <>
  {/* Header Section */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full">
  <div className="flex-1 min-w-0">
    <HeadingHeader
      title="Import Holidays"
      items={[
        { label: "Academic", path: "/academic" },
        { label: "Academic Calendar", path: "/academic/academic-calendar" },
        { label: "Import Holidays", path: "/academic/academic-calendar/import" },
      ]}
    />
  </div>

  <div className="w-auto mb-4 ml-3 sm:w-auto flex-shrink-0">
    <button className="w-full sm:w-auto bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-600">
      <FileText size={16} /> Bulk Upload
    </button>
  </div>
</div>


      {/* Upload Card */}
      <Card>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-10 flex flex-col items-center justify-center text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* <CloudUpload size={40} className="text-gray-400 mb-3" /> */}
          {/* <DropSvg className="w-5 h-5"/> */}
      <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cloud upload" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 16.5a4.5 4.5 0 0 0-4.5-4.5H15a6 6 0 1 0-11.5 2.5A4 4 0 0 0 8 20h8a4 4 0 0 0 4-3.5z"/>
  <path d="M12 13v6"/>
  <path d="M9 16l3-3 3 3"/>
</svg>


          <p className="text-gray-700 font-medium">
            Drop file here or click to upload
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Drop files here or click to browse through your machine.
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="holidayUpload"
          />
          <label
            htmlFor="holidayUpload"
            className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-sm text-indigo-600 hover:bg-gray-100 w-full sm:w-auto text-center"
          >
            {file ? file.name : "Choose File"}
          </label>
        </div>

        <div className="flex justify-center sm:justify-end mt-4">
          <button
            onClick={handleBulkUpload}
            className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Bulk Event Upload
          </button>
        </div>
      </Card>
    </>
  );
};

export default ImportHolidays;
