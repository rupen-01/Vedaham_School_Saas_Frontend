import React from "react";
import { Icon } from "@iconify/react";
import Card from "../../../../components/common/Card";
import BorderedFieldset from "../../../../components/common/BorderedFieldset";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import { useNavigate } from "react-router-dom";

const ViewLessonPlan = () => {
  const navigate = useNavigate();

  const lessonData = {
    submittedBy: "Ananya Sharma",
    class: "6th",
    subject: "Mathematics",
    section: "A",
    chapter: "A Cat of Mystery",
    startDate: "23/01/2024",
    endDate: "23/01/2024",
    topic: "Trigonometry",
    topicDate: "23/01/2024",
    teachingAids: "Chart, PPT",
    objectives: [
      "Understand basic fractions",
      "Solve word problems using addition and subtraction",
      "Recognize geometric shapes",
    ],
    note: "PPT already uploaded in shared drive; check animations before class.",
    reviewBy: "Ananya Karori",
    reviewDate: "11/06/2025",
    comment: "Minor changes suggested in unit 3 content.",
    status: "Needs Changes",
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-600 border-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-600 border-yellow-400";
      case "Needs Changes":
        return "bg-orange-100 text-orange-600 border-orange-400";
      case "Rejected":
        return "bg-red-100 text-red-600 border-red-400";
      default:
        return "bg-gray-100 text-gray-600 border-gray-400";
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <HeadingHeader
          title={
            <div className="flex items-center gap-3">
              <span>View Lesson Plan</span>
              <span
                className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(
                  lessonData.status
                )}`}
              >
                {lessonData.status}
              </span>
            </div>
          }
          items={[
            { label: "Academic", path: "/" },
            { label: "Lesson Plan", path: "/academics/lesson-plan" },
            { label: "Approve Lesson Plan", path: "/academics/lesson-plan/approve" },
          ]}
        />

        {/* Export PDF & Back Buttons */}
        <div className="flex gap-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer flex items-center gap-2">
            <Icon icon="mdi:file-pdf-box" className="text-lg" />
            Export PDF
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer flex items-center gap-2"
          >
            <Icon icon="mdi:arrow-left" className="text-lg" />
            Back
          </button>
        </div>
      </div>

      {/* Lesson Plan Details */}
      <Card>
        {/* Submitted Info */}
        <div className="grid grid-cols-4 gap-4 text-sm mb-4">
          <p><strong>Submitted By:</strong> {lessonData.submittedBy}</p>
          <p><strong>Class:</strong> {lessonData.class}</p>
          <p><strong>Subject:</strong> {lessonData.subject}</p>
          <p><strong>Section:</strong> {lessonData.section}</p>
        </div>

        {/* Chapter List */}
        <BorderedFieldset legend="Chapter List">
          <div className="border rounded-lg p-4 bg-gray-50 mb-4">
            <p><strong>Chapter 1 -</strong> {lessonData.chapter}</p>
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
              <p><strong>Start Date:</strong> {lessonData.startDate}</p>
              <p><strong>End Date:</strong> {lessonData.endDate}</p>
              <p><strong>Topic:</strong> {lessonData.topic}</p>
              <p><strong>Date:</strong> {lessonData.topicDate}</p>
              <p><strong>Teaching Aids:</strong> {lessonData.teachingAids}</p>
              <p>
                <strong>Attach Resources:</strong>{" "}
                <span className="text-indigo-600 cursor-pointer">View</span>
              </p>
            </div>

            <div className="mt-3 text-sm">
              <strong>Chapter Objective:</strong>
              <ul className="list-disc ml-6 mt-1">
                {lessonData.objectives.map((obj, index) => (
                  <li key={index}>{obj}</li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              <strong>Note:</strong> {lessonData.note}
            </p>
          </div>
        </BorderedFieldset>

        {/* Review Info */}
        <div className="grid grid-cols-3 gap-4 text-sm mt-4">
          <p><strong>Review By:</strong> {lessonData.reviewBy}</p>
          <p><strong>Review Date:</strong> {lessonData.reviewDate}</p>
          <p><strong>Comment:</strong> {lessonData.comment}</p>
        </div>
      </Card>
    </div>
  );
};

export default ViewLessonPlan;
