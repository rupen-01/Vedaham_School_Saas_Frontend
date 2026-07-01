
import React, { useState, useEffect } from "react"; 
import Card from "../../../../components/common/Card";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import SlidingLabelInput from "../../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../../components/common/SlidingLabelTextarea";
import ToggleSwitch from "../../../../components/common/ToggleSwitch";
import { X } from "lucide-react";
import Pop from "../../../../components/common/pop";
import { useMutationApi } from "../../../../config/UseApi";
import ApiConfig from "../../../../config/ApiConfig";

const CreateDepartment = ({ isOpen = true, onClose = () => {}, editData = null }) => {
  const [departmentData, setDepartmentData] = useState({
    name: "",
    description: "",
    status: true,
  });

  // Populate form if editData exists
  useEffect(() => {
    if (editData) {
      setDepartmentData({
        name: editData.name || "",
        description: editData.description || "",
        status: editData.status ?? true,
      });
    } else {
      setDepartmentData({ name: "", description: "", status: true });
    }
  }, [editData]);

// ---------------------------
// API Mutation (Department)
// ---------------------------
const mutation = useMutationApi({
  key: "departments",
  url: editData
    ? ApiConfig.DEPARTMENT_UPDATE(editData.id)
    : ApiConfig.DEPARTMENT_CREATE,
  method: editData ? "PUT" : "POST",
  requireAuth: true,
  options: {
    onSuccess: () => {
      Pop(
        "success",
        editData ? "Department updated successfully!" : "Department created successfully!"
      );
      onClose();
      setDepartmentData({
        name: "",
        description: "",
        status: true,
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
  setDepartmentData((prev) => ({ ...prev, [field]: value }));
};

  const handleSubmit = () => {
    // ✅ Validation before submit
    if (!departmentData.name.trim()) {
      Pop("error", "Department name is required");
      return;
    }
    
    console.log("Department Payload:", departmentData);
    mutation.mutate({ payload: departmentData });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto my-6">
        <Card className="p-4 sm:p-6 mt-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {editData ? "Edit Department" : "Add Department"}
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
              label="Department Name"
              placeholder="Mathematics"
              value={departmentData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <SlidingLabelTextarea
              className="mt-4"
              label="Description"
              placeholder="Enter department details..."
              value={departmentData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Status Toggle */}
          <div className="mt-4">
            <ToggleSwitch
              label="Status"
              name="status"
              checked={departmentData.status}
              onChange={(val) => handleChange("status", val)}
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
                ? "Update Department"
                : "Create Department"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateDepartment;
