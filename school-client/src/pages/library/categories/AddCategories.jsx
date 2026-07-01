import React, { useState } from "react";
import { X } from "lucide-react";
import Card from "../../../components/common/Card";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelInput from "../../../../../saas-panel/src/components/common/SlidingLabelInput";
import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";

const AddCategory = ({ isOpen, onClose }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    theme: "",
    status: "Active",
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setCategoryData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Category Added:", categoryData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-200 z-50">
      <div className="w-full ml-24 sm:ml-12 xs:ml-4 max-w-2xl sm:w-4/5 md:w-3/5 lg:w-2/5 mx-4">
        <Card>
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Add Category</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Add Category Form */}
          <BorderedFieldset legend="Add Category">
            <div className="grid grid-cols-1 gap-4">
              <SlidingLabelInput
                type="text"
                label="Category Name"
                placeholder="e.g. Biography"
                value={categoryData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              <SlidingLabelInput
                type="text"
                label="Theme (optional)"
                placeholder="e.g. Life Stories"
                value={categoryData.theme}
                onChange={(e) => handleChange("theme", e.target.value)}
              />
            </div>
          </BorderedFieldset>

          {/* Status */}
          <BorderedFieldset legend="Status" className="mt-4">
            <SlidingLabelRadio
              name="status"
              value={categoryData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              options={["Active", "Inactive"]}
            />
          </BorderedFieldset>

          {/* Submit Button */}
          <div className="text-right mt-4">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
            >
              Add Category
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddCategory;
