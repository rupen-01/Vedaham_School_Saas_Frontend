
import React, { useState } from "react";
import Card from "../../../../components/common/Card";
import BorderedFieldset from "../../../../components/common/BorderedFieldset";
import SlidingLabelSelect from "../../../../components/common/SlidingSelect";
import SlidingLabelRadio from "../../../../components/common/SlidingLabelRadio";
import { X } from "lucide-react";
import SlidingLabelInput from "../../../../components/common/SlidingLabelInput";

const AddSubject = ({ isOpen, onClose }) => {
  const [subjectData, setSubjectData] = useState({
    name: "",
    code: "",
    type: "",
    isPractical: "",
    status: "Active",
    syllabus: null,
  });

  const options = {
    subjectTypes: ["Core", "Optional", "Activity-Based"],
    practicalOptions: ["Yes", "No"],
  };

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setSubjectData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setSubjectData((prev) => ({ ...prev, syllabus: e.target.files[0] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-3xl mx-auto my-6">
        <Card className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
              Add Subject
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-700 bg-red-100 w-8 h-8 flex items-center justify-center rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subject Name + Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SlidingLabelInput
              type="text"
              label="Subject Name"
              placeholder="English"
              value={subjectData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <SlidingLabelInput
              type="text"
              label="Subject Code"
              placeholder="ENG101"
              value={subjectData.code}
              onChange={(e) => handleChange("code", e.target.value)}
            />
          </div>

          {/* Type + Practical */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <SlidingLabelSelect
              label="Subject Type"
              name="type"
              value={subjectData.type}
              onChangeProp={(e) => handleChange("type", e.target.value)}
              options={options.subjectTypes.map((type) => ({
                label: type,
                value: type,
              }))}
            />
            <SlidingLabelSelect
              label="Is Practical Included"
              name="isPractical"
              value={subjectData.isPractical}
              onChangeProp={(e) => handleChange("isPractical", e.target.value)}
              options={options.practicalOptions.map((opt) => ({
                label: opt,
                value: opt,
              }))}
            />
          </div>

          {/* Status */}
          <BorderedFieldset legend="Status" className="mt-4 text-[12px]">
            <SlidingLabelRadio
              name="status"
              value={subjectData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              options={["Active", "Inactive"]}
            />
          </BorderedFieldset>

          {/* Upload */}
          <BorderedFieldset legend="Upload Syllabus" className="mt-4">
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 sm:p-6 text-center">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="syllabusUpload"
              />
              <label
                htmlFor="syllabusUpload"
                className="cursor-pointer text-indigo-600 block truncate"
              >
                {subjectData.syllabus
                  ? subjectData.syllabus.name
                  : "Drop file here or click to upload"}
              </label>
            </div>
          </BorderedFieldset>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => console.log(subjectData)}
              className="bg-indigo-600 text-white px-5 sm:px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Subject
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddSubject;
