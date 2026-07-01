

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Card from "../../../../components/common/Card";
import SlidingLabelInput from "../../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../../components/common/SlidingLabelTextarea";
import ToggleSwitch from "../../../../components/common/ToggleSwitch";
import { useMutationApi } from "../../../../config/UseApi";
import Pop from "../../../../components/common/pop";
import ApiConfig from "../../../../config/ApiConfig";

const CreateClass = ({ isOpen = true, onClose = () => {}, editData = null }) => {
  const [classData, setClassData] = useState({
    class_name: "",
    class_code: "",
    display_order: "",
    description: "",
    is_active: true,
  });

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setClassData({
        class_name: editData.class_name || "",
        class_code: editData.class_code || "",
        display_order: editData.display_order ?? "",
        description: editData.description || "",
        is_active: editData.is_active ?? true,
      });
    } else {
      setClassData({
        class_name: "",
        class_code: "",
        display_order: "",
        description: "",
        is_active: true,
      });
    }
  }, [editData]);

  // ---------------------------
  // Mutation using useMutationApi
  // ---------------------------
  const mutation = useMutationApi({
    key: "classes",
    url: editData ? ApiConfig.CLASS_UPDATE(editData.id) : ApiConfig.CLASS_CREATE,
    method: editData ? "PUT" : "POST",
    requireAuth: true,
    options: {
      onSuccess: () => {
        Pop("success", editData ? "Class updated successfully!" : "Class created successfully!");
        onClose();
        setClassData({
          class_name: "",
          class_code: "",
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
    setClassData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const payload = { ...classData, display_order: Number(classData.display_order) || null };
    mutation.mutate({ payload });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto my-6">
        <Card className="p-4 sm:p-6 mt-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {editData ? "Edit Class" : "Add Class"}
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
              label="Class Name"
              placeholder="1st Grade"
              value={classData.class_name}
              onChange={(e) => handleChange("class_name", e.target.value)}
            />
            <SlidingLabelInput
              type="text"
              label="Class Code [Optional]"
              placeholder="C1"
              value={classData.class_code}
              onChange={(e) => handleChange("class_code", e.target.value)}
            />
            <SlidingLabelInput
              type="number"
              label="Display Order [Optional]"
              placeholder="1"
              value={classData.display_order}
              onChange={(e) => handleChange("display_order", e.target.value)}
            />
            <SlidingLabelTextarea
              label="Description [Optional]"
              placeholder="Enter class details..."
              value={classData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Status Toggle */}
          <div className="mt-4">
            <ToggleSwitch
              label="Active"
              name="is_active"
              checked={classData.is_active}
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
                ? "Update Class"
                : "Create Class"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateClass;
