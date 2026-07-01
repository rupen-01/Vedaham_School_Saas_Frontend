
import React from "react";
import { X, FileText, Calendar, BookOpen, Users } from "lucide-react";

const ViewMaterialModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-3">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-fadeIn border border-gray-200">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-5 py-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {data.title || "Material Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full p-1 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-gray-700">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <p>
                <span className="font-semibold">Uploaded By:</span>{" "}
                {data.uploadedBy}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <p>
                <span className="font-semibold">Uploaded Date:</span>{" "}
                {data.uploadedDate}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <p>
                <span className="font-semibold">File:</span>{" "}
                <a
                  href={data.fileUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 font-medium hover:underline"
                >
                  View File
                </a>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <p>
                <span className="font-semibold">Class:</span> {data.class}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <p>
                <span className="font-semibold">Subject:</span> {data.subject}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <p>
                <span className="font-semibold">Accessible For:</span>{" "}
                {data.access}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Description
            </h3>
            <p className="text-gray-700">
              {data.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMaterialModal;
