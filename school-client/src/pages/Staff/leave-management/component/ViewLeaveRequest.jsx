
import React from "react";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import Card from "../../../../components/common/Card";
import BackButton from "../../../../components/common/BackButton";
import { FaFilePdf } from "react-icons/fa";

const ViewLeaveRequest = ({ leaveData }) => {
  const {
    appliedBy = "Ravi Sharma",
    appliedDate = "05/07/2024",
    fromDate = "05/07/2024",
    toDate = "05/07/2024",
    leaveType = "Medical Leave",
    reason = "I am requesting a medical leave for 05/07/2024 due to a scheduled doctor's appointment for a recurring health issue that requires immediate attention. The consultation is important for further diagnosis and treatment, and I will not be able to attend work on that day. I have attached the relevant appointment documents for your reference.",
    attachmentUrl = "#",
  } = leaveData || {};

  const handleExportPDF = () => {
    console.log("Exporting PDF...");
    // Add actual PDF export logic
  };

  return (
    <>
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <HeadingHeader
          title="View Leave Request"
          items={[
            { label: "Staff", path: "/staff" },
            { label: "Leave Management", path: "/staff/leave" },
            { label: "Leave Approve", path: "/staff/leave/approve" },
            {
              label: "View Leave Request",
              path: "/staff/leave-management/view-leave-request",
            },
          ]}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FaFilePdf />
            Export PDF
          </button>
          <BackButton back="/staff/leave-management/leave" />
        </div>
      </div>

      {/* Card */}
      <Card>
        {/* Details Grid */}
      <div className="grid gap-y-4 mb-4">
  {/* Row 1 */}
  <div className="flex justify-between  ">
    <p>
      <span className="font-semibold">Applied By :</span> {appliedBy}
    </p>
    <p>
      <span className="font-semibold">From Date :</span> {fromDate}
    </p>
  </div> 

  {/* Row 2 */}
  <div className="flex justify-between ">
    <p>
      <span className="font-semibold">Applied Date :</span> {appliedDate}
    </p>
    <p>
      <span className="font-semibold">To Date :</span> {toDate}
    </p>
  </div>
</div>



        {/* Subject + Reason */}
        <div className="border border-gray-300 rounded p-4 mb-4 bg-gray-50">
          <p className="font-semibold mb-2">
            Subject (Leave Type) :{" "}
            <span className="font-normal">{leaveType}</span>
          </p>
          <p className="text-gray-700 leading-relaxed">{reason}</p>
        </div>

        {/* Attachment */}
        <p className="mb-4">
          <span className="font-semibold">Attachment:</span>{" "}
          <a
            href={attachmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            View Attachment
          </a>
        </p>

        {/* Signature */}
        <div className="flex flex-col items-end mt-6">
            <p className="font-bold">By</p>
          <p className="text-gray-500">{appliedBy}</p>
          <p className="text-gray-500">{appliedDate}</p>
        </div>
      </Card>
    </>
  );
};

export default ViewLeaveRequest;
