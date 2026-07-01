import React, { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Card from "../../../components/common/Card";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../components/common/SlidingLabelTextarea";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";

const ApproveLeave = () => {
  const [formData, setFormData] = useState({
    appliedBy: "Pragya Sharma",
    applyDate: new Date().toISOString().split("T")[0],
    leaveType: "",
    fromDate: "",
    toDate: "",
    attachment: null,
    reason: "",
    approveby: "Auto fill by Login",
    approvedate: "Auto fill by today date",
    status: "",
    note: "",
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
          { label: "Leave Approve", path: "/staff/leave/approve" },
          {
            label: "Leave Approve Form/Leave Rejection Form",
            path: "/staff/leave/approve/leave-approve-form",
          },
        ]}
      />

      <Card>
        {/* First section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SlidingLabelInput
            label="Applied By"
            value={formData.appliedBy}
            disabled
          />

          <SlidingLabelInput
            label="Apply Date"
            type="text"
            value="By Default Today"
            disabled
          />

          <SlidingLabelSelect
            label="Select Leave Type"
            name="leaveType"
            value={formData.leaveType}
            onChangeProp={(e) => handleChange("leaveType", e.target.value)}
            options={leaveTypes.map((type) => ({ label: type, value: type }))}
          />

          <SlidingLabelInput
            type="date"
            label="From Date"
            value={formData.fromDate}
            onChange={(e) => handleChange("fromDate", e.target.value)}
          />

          <SlidingLabelInput
            type="date"
            label="To Date"
            value={formData.toDate}
            onChange={(e) => handleChange("toDate", e.target.value)}
          />

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

        {/* Approval section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <SlidingLabelInput
            label="Approve By / Rejected By"
            value={formData.approveby}
            disabled
          />

          <SlidingLabelInput
            label="Approve Date / Rejected Date"
            value={formData.approvedate}
            disabled
          />

          <SlidingLabelInput
            label="Status"
            type="text"
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          />
        </div>

        {/* Note */}
        <div className="mt-4">
          <SlidingLabelTextarea
            label="Note"
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="text-right mt-6">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Approve / Reject Leave
          </button>
        </div>
      </Card>
    </>
  );
};

export default ApproveLeave;
