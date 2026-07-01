
import React from "react";
import { X } from "lucide-react";

const ViewModal = ({ isOpen, onClose, title, data }) => {
  if (!isOpen || !data) return null;

  const excludedFields = [
    "id",
    "created_by",
    "updated_by",
    "deleted_at",
    "is_deleted",
    "created_at",
    "updated_at",
  ];

  const formatLabel = (key) =>
    key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  const formatValue = (value) => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return value.name || JSON.stringify(value);
    return String(value);
  };

  const entries = Object.entries(data).filter(
    ([key]) => !excludedFields.includes(key.toLowerCase())
  );

  const rows = [];
  for (let i = 0; i < entries.length; i += 2) {
    rows.push(entries.slice(i, i + 2));
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">Detailed Information</p>
        </div>

        {/* Table */}
        <div className="px-6 py-4 overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm text-gray-700">
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  {row.map(([key, value], colIdx) => (
                    <React.Fragment key={colIdx}>
                      <td className="border-r border-gray-200 px-4 py-2 font-medium w-1/4 bg-gray-50">
                        {formatLabel(key)}
                      </td>
                      <td className="px-4 py-2 w-1/4">{formatValue(value)}</td>
                    </React.Fragment>
                  ))}
                  {row.length < 2 && (
                    <>
                      <td className="border-r border-gray-200 px-4 py-2 w-1/4 bg-gray-50"></td>
                      <td className="px-4 py-2 w-1/4"></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
