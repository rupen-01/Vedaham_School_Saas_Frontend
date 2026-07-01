import React from "react";
import { X } from "lucide-react";
import { Icon } from "@iconify/react";

const ViewModal = ({ isOpen, onClose, title, data }) => {
  if (!isOpen || !data) return null;

  const iconMap = {
    class: "mdi:google-classroom",
    section: "mdi:view-grid",
    classTeacher: "mdi:account-outline",
    coClassTeacher: "mdi:account-multiple-outline",
    status: "mdi:checkbox-marked-circle-outline",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-2 sm:px-4">
      <div className="relative w-full max-w-lg sm:max-w-xl bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-5 sm:p-6 animate-fadeIn border border-gray-100 overflow-y-auto max-h-[90vh] ml-20 xl:ml-0">
        
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 bg-gray-200/80 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full shadow-sm hover:shadow-md transition"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4  pb-4 mb-4">
          {/* Hide avatar on small screens, show on sm+ */}
          <div className="hidden sm:flex w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-600 text-white items-center justify-center text-lg sm:text-xl font-bold shadow-lg ring-4 ring-indigo-100">
            {data.classTeacher?.charAt(0) || title?.charAt(0)}
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-xs sm:text-sm text-gray-500">Detailed Information</p>
          </div>
        </div>

        {/* Details */}
        <div className="text-xs sm:text-sm space-y-3 sm:space-y-4">
          {Object.entries(data || {})
            .filter(([key]) => key !== "id")
            .map(([key, value]) => (
              <div
                key={key}
                className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-700 bg-gray-50 hover:bg-gray-100 px-2 sm:px-3 py-2 rounded-lg transition"
              >
                <Icon
                  icon={iconMap[key] || "mdi:information-outline"}
                  className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="font-medium capitalize min-w-[90px] sm:min-w-[110px]">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="text-gray-900 break-words flex-1">
                  {key === "status" ? (
                    <span
                      className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 rounded-full ${
                        value === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {value}
                    </span>
                  ) : (
                    value || "-"
                  )}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
