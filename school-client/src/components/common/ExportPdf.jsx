// components/ExportPdf.js
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa"; // ✅ PDF icon

const ExportPdf = ({
  targetRef,
  fileName = "document.pdf",
  buttonLabel = "Export as PDF",
}) => {
  const handleExport = async () => {
    if (!targetRef?.current) return;

    const element = targetRef.current;
    const canvas = await html2canvas(element, { scale: 2 }); // higher scale = better quality
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
  };

  return (
    <button
      onClick={handleExport}
      className="
        flex items-center justify-center gap-2
        cursor-pointer
         ml-3 sm:w-auto
        px-3 sm:px-4 py-2
        text-sm sm:text-base
        bg-red-600 hover:bg-red-700
        text-white rounded-md
        transition
      "
    >
      <FaFilePdf className="text-base sm:text-lg" />
      <span className="truncate">{buttonLabel}</span>
    </button>
  );
};

export default ExportPdf;
