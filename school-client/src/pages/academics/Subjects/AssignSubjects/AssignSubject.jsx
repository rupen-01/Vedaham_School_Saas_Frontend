
import React, { useState } from "react";
import Card from "../../../../components/common/Card";
import SlidingLabelSelect from "../../../../components/common/SlidingSelect";
import SlidingLabelInput from "../../../../components/common/SlidingLabelInput";
import { X } from "lucide-react";

const AddAssignSubject = ({ isOpen, onClose }) => {
  const [assignData, setAssignData] = useState({
    class: "",
    section: [],
    subject: "",
    credit: "",
    teacher: "",
    coTeacher: "",
  });

  // ✅ Object Data for Dropdowns
  const data = {
    classes: ["12", "11", "10", "9", "8"],
    sectionsByClass: {
      "12": ["A", "B"],
      "11": ["A", "B", "C"],
      "10": ["A", "B", "C", "D"],
      "9": ["A", "B"],
      "8": ["A", "B", "C"],
    },
    subjects: ["Mathematics", "Computer Science", "Physics", "Statistics"],
    teachers: ["Raj Malhotra", "Meenu Shah", "Raju Sastri"],
    coTeachers: ["Khushi Yadav", "Sheema Sharma", "Raksha Yadav"],
  };

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setAssignData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "class" && { section: [] }), // Reset sections if class changes
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="flex flex-col gap-4 w-full max-w-2xl ml-20">
        <Card>
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 ">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Assign Subject
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-800 bg-red-200 w-8 h-8 flex items-center justify-center rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Assign Subject Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SlidingLabelSelect
              label="Select Class"
              name={"class"}
              value={assignData.class}
              onChangeProp={(e) => handleChange("class", e.target.value)}
              options={data.classes.map((cls) => ({
                label: cls,
                value: cls,
              }))}
            />

            <SlidingLabelSelect
              label="Select Section"
              name={"section"}
              value={assignData.section}
              multiple
              onChangeProp={(e) => handleChange("section", e.target.value)}
              options={
                assignData.class
                  ? data.sectionsByClass[assignData.class].map((sec) => ({
                      label: sec,
                      value: sec,
                    }))
                  : []
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <SlidingLabelSelect
              label="Select Subject"
              name={"subject"}
              value={assignData.subject}
              onChangeProp={(e) => handleChange("subject", e.target.value)}
              options={data.subjects.map((sub) => ({
                label: sub,
                value: sub,
              }))}
            />

            <SlidingLabelInput
              type="number"
              label="Subject Credit"
              placeholder="No. of periods per week"
              value={assignData.credit}
              onChange={(e) => handleChange("credit", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <SlidingLabelSelect
              label="Select Teacher"
              name={"teacher"}
              value={assignData.teacher}
              onChangeProp={(e) => handleChange("teacher", e.target.value)}
              options={data.teachers.map((teacher) => ({
                label: teacher,
                value: teacher,
              }))}
            />

            <SlidingLabelSelect
              label="Select Co-Teacher"
              name={"coTeacher"}
              value={assignData.coTeacher}
              onChangeProp={(e) => handleChange("coTeacher", e.target.value)}
              options={data.coTeachers.map((coTeacher) => ({
                label: coTeacher,
                value: coTeacher,
              }))}
            />
          </div>

          <div className="text-right mt-6">
            <button
              onClick={() => console.log(assignData)}
              className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Assign Subject
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddAssignSubject;
