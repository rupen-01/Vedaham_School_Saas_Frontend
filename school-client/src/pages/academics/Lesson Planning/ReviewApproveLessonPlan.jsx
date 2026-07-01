import { X } from "lucide-react";
import Card from "../../../components/common/Card";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import { useState } from "react";

const ReviewPlanModal = ({ isOpen, onClose, data }) => {
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const statusOptions = ["Approved", "Rejected", "Needs Changes"];

  const handleUpdateStatus = () => {
    console.log("Updated Review:", { status, comment });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50 px-2 sm:px-4">
      <div className="w-full sm:w-11/12 max-w-4xl mx-auto">
        <Card className="h-[80vh] overflow-y-auto rounded-lg shadow-lg ">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4  top-0 bg-white z-10 px-2 sm:px-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Review Plan</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Teacher & Plan Info */}
          <BorderedFieldset legend="Review Plan">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p><strong>Submitted By:</strong> {data.submittedBy}</p>
              <p><strong>Class:</strong> {data.class}</p>
              <p><strong>Subject:</strong> {data.subject}</p>
              <p><strong>Section:</strong> {data.section}</p>
            </div>

            {/* Chapter List */}
            <div className="border rounded-lg p-4 mt-4 bg-gray-50">
              <p><strong>Chapter 1 -</strong> {data.chapter}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-sm">
                <p><strong>Start Date:</strong> {data.startDate}</p>
                <p><strong>End Date:</strong> {data.endDate}</p>
                <p><strong>Topic:</strong> {data.topic}</p>
                <p><strong>Date:</strong> {data.topicDate}</p>
                <p><strong>Teaching Aids:</strong> {data.teachingAids}</p>
                <p>
                  <strong>Attach Resources:</strong>{" "}
                  <span className="text-indigo-600 cursor-pointer">View</span>
                </p>
              </div>

              <div className="mt-3 text-sm">
                <strong>Chapter Objective:</strong>
                <ul className="list-disc ml-6 mt-1">
                  {(data.objectives || []).map((obj, index) => (
                    <li key={index}>{obj}</li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                <strong>Note:</strong> {data.note}
              </p>
            </div>
          </BorderedFieldset>

          {/* Status & Comment */}
          <BorderedFieldset legend="Update Status">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* <SlidingLabelSelect
                label="Select Status Option"
                value={status}
                onChangeProp={(e) => setStatus(e.target.value)}
                options={statusOptions.map((option) => ({ label: option, value: option }))}
              /> */}
              <SlidingLabelSelect
  label="Select Status Option"
  value={status}
  onChangeProp={(e) => setStatus(e.target.value)}
  options={statusOptions.map((option) => {
    let color = "";
    if (option === "Approved") color = "🟢"; // green circle
    else if (option === "Rejected") color = "🔴"; // red circle
    else if (option === "Needs Changes") color = "🟠"; // orange circle

    return { label: `${color} ${option}`, value: option };
  })}
/>


              <SlidingLabelInput
                type="text"
                label="Comment"
                placeholder="Write any plan related comment here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </BorderedFieldset>

          {/* Update Button */}
          <div className="text-right mt-4 ">
            <button
              onClick={handleUpdateStatus}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Update Review Status
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReviewPlanModal;
