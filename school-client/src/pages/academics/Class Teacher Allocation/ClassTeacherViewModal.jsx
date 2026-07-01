import React from "react";
import { X } from "lucide-react";
import { Icon } from "@iconify/react";

const ClassTeacherViewModal = ({ isOpen, onClose, teacher }) => {
  if (!isOpen || !teacher) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-2 sm:px-4">
      {/* Container with scroll for small devices */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-xl p-4 sm:p-6 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full transition"
          onClick={onClose}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 border-b pb-3 sm:pb-4 mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg sm:text-xl font-semibold shadow">
            {teacher.classTeacher?.charAt(0)}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              {teacher.classTeacher}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">Class Teacher</p>
          </div>
        </div>

        {/* Teacher Details */}
        <div className="text-xs sm:text-sm space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-gray-700">
            <Icon icon="mdi:google-classroom" className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Class:</span>
            <span className="text-gray-900">{teacher.class}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-gray-700">
            <Icon icon="mdi:view-grid" className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Section:</span>
            <span className="text-gray-900">{teacher.section}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-gray-700">
            <Icon icon="mdi:account-outline" className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Class Teacher:</span>
            <span className="text-gray-900">{teacher.classTeacher}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-gray-700">
            <Icon icon="mdi:account-multiple-outline" className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Co-Class Teacher:</span>
            <span className="text-gray-900">{teacher.coClassTeacher}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-gray-700">
            <Icon icon="mdi:checkbox-marked-circle-outline" className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Status:</span>
            <span
              className={`text-xs sm:text-sm font-semibold px-2 py-0.5 rounded ${
                teacher.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {teacher.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassTeacherViewModal;
