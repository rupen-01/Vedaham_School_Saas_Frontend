import React, { useState } from "react";
import Card from "../../../components/common/Card";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../components/common/SlidingLabelTextarea";
import HeadingHeader from "../../../components/common/HeadingHeader";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";

const UploadDigitalMaterial = () => {
  const [materialData, setMaterialData] = useState({
    uploadedBy: "Pragya Sharma",
    title: "",
    file: null,
    selectedClass: "",
    selectedSubject: "",
    uploadedDate: "",
    accessControl: "All Users",
    description: "",
  });

  const classOptions = ["Class 1", "Class 2", "Class 3"];
  const subjectOptions = ["Math", "Science", "English"];

  const handleChange = (field, value) => {
    setMaterialData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <HeadingHeader
        title="Upload Material"
        items={[
          { label: "Library", path: "/library" },
          { label: "Digital Library", path: "/library/digital-library" },
          { label: "Upload Material", path: "/library/digital-library/upload" },
        ]}
      />

      <div className="flex flex-col">
        <Card>
          {/* Uploaded By, Title, File Upload */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SlidingLabelInput
              label="Uploaded By"
              value={materialData.uploadedBy}
              disabled
              className="w-full"
            />

            <SlidingLabelInput
              label="Title"
              value={materialData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full"
            />

            <SlidingLabelInput
              type="file"
              label="Upload File (Upload eBook)"
              onChange={(e) => handleChange("file", e.target.files[0])}
              className="w-full"
            />
          </div>

          {/* Class, Subject, Uploaded Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SlidingLabelSelect
              label="Select Class"
              name="selectedClass"
              value={materialData.selectedClass}
              onChangeProp={(e) => handleChange("selectedClass", e.target.value)}
              options={classOptions.map((cls) => ({ label: cls, value: cls }))}
              className="w-full"
            />

            <SlidingLabelSelect
              label="Select Subject"
              name="selectedSubject"
              value={materialData.selectedSubject}
              onChangeProp={(e) =>
                handleChange("selectedSubject", e.target.value)
              }
              options={subjectOptions.map((sub) => ({ label: sub, value: sub }))}
              className="w-full"
            />

            <SlidingLabelInput
              type="date"
              label="Uploaded Date"
              value={materialData.uploadedDate}
              onChange={(e) => handleChange("uploadedDate", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Access Control */}
   <BorderedFieldset
  legend="Access Control"
  className="mt-6 p-3 text-sm"
>

    <SlidingLabelRadio
      name="accessControl"
      value={materialData.accessControl}
      onChange={(e) => handleChange("accessControl", e.target.value)}
      options={["All Users", "Staff Only", "Student Only"]}
    //   className="flex flex-col sm:flex-row gap-2"
    />

</BorderedFieldset>



          {/* Description */}
          <SlidingLabelTextarea
            label="Description/Note"
            placeholder="Enter description or notes"
            value={materialData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mt-6 w-full"
          />

          {/* Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => console.log(materialData)}
              className="bg-indigo-600 text-white w-full md:w-auto px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Upload Material
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UploadDigitalMaterial;
