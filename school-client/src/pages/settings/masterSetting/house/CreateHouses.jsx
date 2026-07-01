
import React, { useState, useEffect } from "react";
import Card from "../../../../components/common/Card";
import SlidingLabelInput from "../../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../../components/common/SlidingLabelTextarea";
import ToggleSwitch from "../../../../components/common/ToggleSwitch";
import { X } from "lucide-react";
import Pop from "../../../../components/common/pop";
import { useMutationApi } from "../../../../config/UseApi";
import ApiConfig from "../../../../config/ApiConfig";

const CreateHouse = ({ isOpen = true, onClose = () => {}, editData = null }) => {
  const [houseData, setHouseData] = useState({
    house_name: "",
    house_code: "",
    house_color: "#000000",
    display_order: "",
    description: "",
    is_active: true,
  });

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setHouseData({
        house_name: editData.house_name || "",
        house_code: editData.house_code || "",
        house_color: editData.house_color || "#000000",
        display_order: editData.display_order ?? "",
        description: editData.description || "",
        is_active: editData.is_active ?? true,
      });
    } else {
      setHouseData({
        house_name: "",
        house_code: "",
        house_color: "#000000",
        display_order: "",
        description: "",
        is_active: true,
      });
    }
  }, [editData]);

  // ---------------------------
// API Mutation (House)
// ---------------------------
const mutation = useMutationApi({
  key: "houses",
  url: editData
    ? ApiConfig.HOUSE_UPDATE(editData.id)
    : ApiConfig.HOUSE_CREATE,
  method: editData ? "PUT" : "POST",
  requireAuth: true,
  options: {
    onSuccess: () => {
      Pop(
        "success",
        editData ? "House updated successfully!" : "House created successfully!"
      );
      onClose();
      setHouseData({
        house_name: "",
        house_code: "",
        house_color: "#000000",
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
    setHouseData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Creating/Updating House:", houseData);
    mutation.mutate({ payload: houseData });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto my-6">
        <Card className="p-4 sm:p-6 mt-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {editData ? "Edit House" : "Add House"}
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
              label="House Name"
              placeholder="Red House"
              value={houseData.house_name}
              onChange={(e) => handleChange("house_name", e.target.value)}
            />
            <SlidingLabelInput
              type="text"
              label="House Code (Optional)"
              placeholder="RED"
              value={houseData.house_code}
              onChange={(e) => handleChange("house_code", e.target.value)}
            />

            {/* House Color Picker */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
              <label className="text-gray-700 font-medium sm:w-32">House Color</label>
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="color"
                  value={houseData.house_color}
                  onChange={(e) => handleChange("house_color", e.target.value)}
                  className="w-10 h-10 p-0 border border-gray-300 rounded-md cursor-pointer"
                />
                <input
                  type="text"
                  value={houseData.house_color}
                  onChange={(e) => handleChange("house_color", e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 w-24 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="#000000"
                />
              </div>
            </div>

            <SlidingLabelInput
              type="number"
              label="Display Order (Optional)"
              placeholder=""
              value={houseData.display_order}
              onChange={(e) => handleChange("display_order", Number(e.target.value))}
            />
            <SlidingLabelTextarea
              label="Description (Optional)"
              placeholder="Enter house details..."
              value={houseData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Status Toggle */}
          <div className="mt-4">
            <ToggleSwitch
              label="Active"
              name="is_active"
              checked={houseData.is_active}
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
                ? "Update House"
                : "Create House"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateHouse;
