// components/ExportExcel.js
import React from "react";
import * as XLSX from "xlsx";
import saveAs from "file-saver";
import { FaFileExcel } from "react-icons/fa"; // ✅ Excel icon

const ExportExcel = ({ data, fileName = "export.xlsx", sheetName = "Sheet1", children }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export!");
      return;
    }

    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  return (
    <button
      onClick={handleExport}
      className="
        flex items-center justify-center gap-2 
        px-3 sm:px-4 py-2 
        ml-3 sm:w-auto
        text-sm sm:text-base 
        bg-green-600 text-white 
        rounded-lg shadow 
        hover:bg-green-700 transition
      "
    >
      <FaFileExcel className="text-lg" />
      <span className="truncate">{children || "Export to Excel"}</span>
    </button>
  );
};

export default ExportExcel;
