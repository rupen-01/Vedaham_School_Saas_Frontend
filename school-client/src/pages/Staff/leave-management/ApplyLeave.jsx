import React, { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Card from "../../../components/common/Card";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../components/common/SlidingLabelTextarea";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    appliedBy: "Pragya Sharma",
    applyDate: new Date().toISOString().split("T")[0],
    leaveType: "",
    fromDate: "",
    toDate: "",
    attachment: null,
    reason: "",
  });

  const leaveTypes = [
    "Sick Leave",
    "Casual Leave",
    "Maternity Leave",
    "Earned Leave",
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    handleChange("attachment", e.target.files[0]);
  };

  const handleSubmit = () => {
    console.log("Leave Application Submitted:", formData);
    // Add actual submit logic here
  };

  return (
    <>
      <HeadingHeader
        title="Apply Leave"
        items={[
          { label: "Staff", path: "/staff" },
          { label: "Leave Management", path: "/staff/leave" },
          { label: "Apply Leave", path: "/staff/leave/apply" },
        ]}
      />

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Applied By (Disabled) */}
          <SlidingLabelInput
            label="Applied By"
            value={formData.appliedBy}
            disabled
          />

          {/* Apply Date (Disabled) */}
          <SlidingLabelInput
            label="Apply Date"
            type="text"
            value="By Default Today"
            disabled
          />

          {/* Leave Type */}
          <SlidingLabelSelect
            label="Select Leave Type"
            name="leaveType"
            value={formData.leaveType}
            onChangeProp={(e) => handleChange("leaveType", e.target.value)}
            options={leaveTypes.map((type) => ({ label: type, value: type }))}
          />

          {/* From Date */}
          <SlidingLabelInput
            type="date"
            label="From Date"
            value={formData.fromDate}
            onChange={(e) => handleChange("fromDate", e.target.value)}
          />

          {/* To Date */}
          <SlidingLabelInput
            type="date"
            label="To Date"
            value={formData.toDate}
            onChange={(e) => handleChange("toDate", e.target.value)}
          />

          {/* Attachment Upload */}
          <SlidingLabelInput
            type="file"
            label="Attachment (Pdf)"
            onChange={handleFileChange}
          />
        </div>

        {/* Leave Reason */}
        <div className="mt-4">
          <SlidingLabelTextarea
            label="Leave Reason"
            value={formData.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="text-right mt-6">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Apply Leave
          </button>
        </div>
      </Card>
    </>
  );
};

export default ApplyLeave;
