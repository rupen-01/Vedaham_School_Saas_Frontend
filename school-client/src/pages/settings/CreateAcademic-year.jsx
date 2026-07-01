
import React, { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import SlidingLabelInput from "../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../components/common/SlidingLabelTextarea";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import { X } from "lucide-react";
import Pop from "../../components/common/pop";
import { useMutationApi } from "../../config/UseApi";
import ApiConfig from "../../config/ApiConfig";

const CreateAcademicYear = ({ isOpen = true, onClose = () => {}, editData = null }) => {
  const [yearData, setYearData] = useState({
    academic_year_label: "",
    start_date: "",
    end_date: "",
    description: "",
    is_active: true,
  });

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setYearData({
        academic_year_label: editData.academic_year_label || "",
        start_date: editData.start_date || "",
        end_date: editData.end_date || "",
        description: editData.description || "",
        is_active: editData.is_active ?? true,
      });
    } else {
      setYearData({
        academic_year_label: "",
        start_date: "",
        end_date: "",
        description: "",
        is_active: true,
      });
    }
  }, [editData]);

  // ---------------------------
  // Mutation using useMutationApi
// ---------------------------

const mutation = useMutationApi({
  key: "academicYears",
  url: editData
    ? ApiConfig.ACADEMIC_YEAR_UPDATE(editData.id)
    : ApiConfig.ACADEMIC_YEAR_CREATE,
  method: editData ? "PUT" : "POST",
  requireAuth: true,
  options: {
    onSuccess: () => {
      Pop(
        "success",
        editData ? "Academic Year updated successfully!" : "Academic Year created successfully!"
      );
      onClose();
      setYearData({
        academic_year_label: "",
        start_date: "",
        end_date: "",
        description: "",
        is_active: true,
      });
    },
    onError: (err) => {
      console.error("Failed:", err);
      Pop("error", err?.response?.data?.message || "Something went wrong.");
    },
  },
});


  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setYearData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    mutation.mutate({ payload: yearData });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto my-6">
        <Card className="p-4 sm:p-6 mt-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {editData ? "Edit Academic Year" : "Add Academic Year"}
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-700 bg-red-100 w-8 h-8 flex items-center justify-center rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-5">
            <SlidingLabelInput
              type="text"
              label="Academic Year Label"
              placeholder="2024-2025"
              value={yearData.academic_year_label}
              onChange={(e) => handleChange("academic_year_label", e.target.value)}
            />
            <SlidingLabelInput
              type="date"
              label="Start Date"
              value={yearData.start_date}
              onChange={(e) => handleChange("start_date", e.target.value)}
            />
            <SlidingLabelInput
              type="date"
              label="End Date"
              value={yearData.end_date}
              onChange={(e) => handleChange("end_date", e.target.value)}
            />
            <SlidingLabelTextarea
              label="Description (Optional)"
              placeholder="Enter academic year details..."
              value={yearData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Status Toggle */}
          <div className="mt-4">
            <ToggleSwitch
              label="Active"
              name="is_active"
              checked={yearData.is_active}
              onChange={(value) => handleChange("is_active", value)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              disabled={mutation.isLoading}
              className={`px-5 sm:px-6 py-2 rounded-lg text-white cursor-pointer ${
                mutation.isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {mutation.isLoading
                ? editData
                  ? "Updating..."
                  : "Creating..."
                : editData
                ? "Update Academic Year"
                : "Create Academic Year"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateAcademicYear;
