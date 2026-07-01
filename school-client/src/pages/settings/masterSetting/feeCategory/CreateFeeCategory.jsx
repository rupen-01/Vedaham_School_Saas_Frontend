import React, { useState, useEffect } from "react";
import Card from "../../../../components/common/Card";
import SlidingLabelInput from "../../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../../components/common/SlidingLabelTextarea";
import ToggleSwitch from "../../../../components/common/ToggleSwitch";
import { X } from "lucide-react";
import Pop from "../../../../components/common/pop";
import { useMutationApi } from "../../../../config/UseApi";
import ApiConfig from "../../../../config/ApiConfig";

const CreateFeeCategory = ({ isOpen = true, onClose = () => {}, editData = null }) => {
  const [feeCategoryData, setFeeCategoryData] = useState({
    category_name: "",
    category_code: "",
    category_type: "mandatory",
    description: "",
    is_active: true,
  });

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setFeeCategoryData({
        category_name: editData.category_name || "",
        category_code: editData.category_code || "",
        category_type: editData.category_type || "mandatory",
        description: editData.description || "",
        is_active: editData.is_active ?? true,
      });
    } else {
      setFeeCategoryData({
        category_name: "",
        category_code: "",
        category_type: "mandatory",
        description: "",
        is_active: true,
      });
    }
  }, [editData]);

// ---------------------------
// API Mutation (Fee Category)
// ---------------------------
const mutation = useMutationApi({
  key: "fee-categories",
  url: editData
    ? ApiConfig.FEE_CATEGORY_UPDATE(editData.id)
    : ApiConfig.FEE_CATEGORY_CREATE,
  method: editData ? "PUT" : "POST",
  requireAuth: true,
  options: {
    onSuccess: () => {
      Pop(
        "success",
        editData
          ? "Fee Category updated successfully!"
          : "Fee Category created successfully!"
      );
      onClose();
      setFeeCategoryData({
        category_name: "",
        category_code: "",
        category_type: "mandatory",
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
    setFeeCategoryData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Fee Category Payload:", feeCategoryData); // log payload before submit
    mutation.mutate({ payload: feeCategoryData });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto my-6">
        <Card className="p-4 sm:p-6 mt-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {editData ? "Edit Fee Category" : "Add Fee Category"}
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
              label="Category Name"
              placeholder="Tuition Fee"
              value={feeCategoryData.category_name}
              onChange={(e) => handleChange("category_name", e.target.value)}
            />

            <SlidingLabelInput
              type="text"
              label="Category Code"
              placeholder="TUITION"
              value={feeCategoryData.category_code}
              onChange={(e) => handleChange("category_code", e.target.value)}
            />

            {/* Dropdown for Category Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Type
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={feeCategoryData.category_type}
                onChange={(e) => handleChange("category_type", e.target.value)}
              >
                <option value="mandatory">Mandatory</option>
                <option value="optional">Optional</option>
              </select>
            </div>

            <SlidingLabelTextarea
              label="Description"
              placeholder="Enter fee category details..."
              value={feeCategoryData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Active Toggle */}
          <div className="mt-4">
            <ToggleSwitch
              label="Active"
              name="is_active"
              checked={feeCategoryData.is_active}
              onChange={(val) => handleChange("is_active", val)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              disabled={mutation.isLoading}
              className={`px-5 sm:px-6 py-2 rounded-lg text-white cursor-pointer ${
                mutation.isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {mutation.isLoading
                ? editData
                  ? "Updating..."
                  : "Creating..."
                : editData
                ? "Update Fee Category"
                : "Create Fee Category"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateFeeCategory;
