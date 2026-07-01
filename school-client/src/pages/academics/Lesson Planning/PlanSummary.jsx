import { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";
import { Icon } from "@iconify/react"; 
import ExportExcel from "../../../components/common/ExecelButton";

const PlanSummary = () => {
  const [search, setSearch] = useState("");
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);

  
  const planSummaryConfig = {
    table: {
      headers: ["Date", "Teacher Name", "Class", "Subject", "Objectives", "Teaching Aids"],
      keys: ["date", "teacherName", "class", "subject", "objectives",  "teachingAids"],
    },
  };


  const planSummaryData = [
    {
      id: 1,
      
      teacherName: "Ananya Sharma",
      date: "2025-07-09",
      class: "6th",
      subject: "Mathematics",
      objectives: "Understand basic algebra and geometry",
      status: "Pending",
      teachingAids: "PPT, Chat",
    },
    {
      id: 2,
      teacherName: "Raj Mehta",
      date: "2025-07-10",
      class: "10th",
      subject: "Computer Science",
      objectives: "Explain programming fundamentals with examples",
      status: "Approved",
      teachingAids: "Word Report",
    },
    {
      id: 3,
      teacherName: "Priya Verma",
         date: "2025-07-11",
      class: "5th",
      subject: "Environmental Sci.",
      objectives: "Learn about ecosystem and environment",
      status: "Pending",
      teachingAids: "Env. Real-time Data",
    },
    {
      id: 4,
  
      teacherName: "Kunal Joshi",
          date: "2025-07-12",
      class: "10th",
      subject: "History",
      objectives: "Understand Indian independence movement",
      status: "Needs Changes",
      teachingAids: "Maps, Images",
    },
  ];

  
  const filteredPlans = planSummaryData.filter(
    (plan) =>
      plan.teacherName.toLowerCase().includes(search.toLowerCase()) ||
      plan.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Header */}
   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
  {/* Header */}
  <HeadingHeader
    title="Plan Summary"
    items={[
      { label: "Academic", path: "/" },
      { label: "Lesson Planning", path: "/academics/lesson-planning" },
      { label: "Plan Summary", path: "/academics/lesson-planning/summary" },
    ]}
  />

  {/* Export Button */}
  <div className="w-full ml-3 sm:w-auto flex justify-start sm:justify-end">
    <ExportExcel
      data={planSummaryData}
      fileName="plansummary.xlsx"
    />
  </div>
</div>


      {/* Table Component */}
      <Table
        Search={true}
        hasStatus={"status"}
        filters={false}
        ImageContainerShow={false}
        Data={filteredPlans}
        headers={planSummaryConfig.table.headers}
        dataKeys={planSummaryConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onView={(data) => setViewData(data)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this lesson plan summary?"
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="View Lesson Plan Summary"
        data={viewData}
      />
    </>
  );
};

export default PlanSummary;
