import React, { useState, useEffect } from "react";
import Card from "../../../../components/common/Card";
import SlidingLabelInput from "../../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../../components/common/SlidingLabelTextarea";
import ToggleSwitch from "../../../../components/common/ToggleSwitch";
import { X } from "lucide-react";
import { useMutationApi } from "../../../../config/UseApi";
import Pop from "../../../../components/common/pop";
import ApiConfig from "../../../../config/ApiConfig";

const CreateSection = ({ isOpen = true, onClose = () => {}, editData = null }) => {
  const [sectionData, setSectionData] = useState({
    section_name: "",
    section_code: "",
    display_order: "",
    description: "",
    is_active: true,
  });

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setSectionData({
        section_name: editData.section_name || "",
        section_code: editData.section_code || "",
        display_order: editData.display_order ?? "",
        description: editData.description || "",
        is_active: editData.is_active ?? true,
      });
    } else {
      setSectionData({
        section_name: "",
        section_code: "",
        display_order: "",
        description: "",
        is_active: true,
      });
    }
  }, [editData]);

// ---------------------------
// API Mutation (Section)
// ---------------------------
const mutation = useMutationApi({
  key: "sections",
  url: editData
    ? ApiConfig.SECTION_UPDATE(editData.id)
    : ApiConfig.SECTION_CREATE,
  method: editData ? "PUT" : "POST",
  requireAuth: true,
  options: {
    onSuccess: () => {
      Pop(
        "success",
        editData ? "Section updated successfully!" : "Section created successfully!"
      );
      onClose();
      setSectionData({
        section_name: "",
        section_code: "",
        display_order: "",
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
    setSectionData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Creating/Updating Section:", sectionData);
    mutation.mutate({ payload: sectionData });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto my-6">
        <Card className="p-4 sm:p-6 mt-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {editData ? "Edit Section" : "Add Section"}
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
              label="Section Name"
              placeholder="A"
              value={sectionData.section_name}
              onChange={(e) => handleChange("section_name", e.target.value)}
            />
            <SlidingLabelInput
              type="text"
              label="Section Code (Optional)"
              placeholder="SEC-A"
              value={sectionData.section_code}
              onChange={(e) => handleChange("section_code", e.target.value)}
            />
            <SlidingLabelInput
              type="number"
              label="Display Order (Optional)"
              placeholder=""
              value={sectionData.display_order}
              onChange={(e) => handleChange("display_order", Number(e.target.value))}
            />
            <SlidingLabelTextarea
              label="Description (Optional)"
              placeholder="Enter section details..."
              value={sectionData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Status Toggle */}
          <div className="mt-4">
            <ToggleSwitch
              label="Active"
              name="is_active"
              checked={sectionData.is_active}
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
                ? "Update Section"
                : "Create Section"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateSection;
