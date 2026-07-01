import { useState } from "react";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import HeadingHeader from "../../../components/common/HeadingHeader";
import ViewModal from "../../../components/common/Viewmodel";

const ManageAssignment = () => {
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewAssignment, setViewAssignment] = useState(null);
// Dummy Data (updated with issueDate & submissionDate)
const assignments = [
  {
    id: 1,
    teacherName: "Ananya Sharma",
    subject: "Mathematics",
    class: "6th",
    section: "A",
    issueDate: "2025-07-08",
    submissionDate: "2025-07-15",
    status: "Active",
  },
  {
    id: 2,
    teacherName: "Raj Mehta",
    subject: "Computer Science",
    class: "10th",
    section: "B",
    issueDate: "2025-07-10",
    submissionDate: "2025-07-17",
    status: "Active",
  },
  {
    id: 3,
    teacherName: "Priya Verma",
    subject: "Environmental Sci.",
    class: "5th",
    section: "A",
    issueDate: "2025-07-09",
    submissionDate: "2025-07-16",
    status: "Inactive",
  },
  {
    id: 4,
    teacherName: "Kunal Joshi",
    subject: "History",
    class: "10th",
    section: "C",
    issueDate: "2025-07-12",
    submissionDate: "2025-07-19",
    status: "Active",
  },
];


  // Filtered Data
  const filteredAssignments = assignments.filter((assignment) => {
    const classMatch = classFilter === "All" || assignment.class === classFilter;
    const statusMatch = statusFilter === "All" || assignment.status === statusFilter;
    return classMatch && statusMatch;
  });

  const tableHeaders = [
    "Teacher Name",
    "Subject",
    "Class",
    "Section",
    "Issue Date",
    "Submission Date",
  
  ];

  const tableDataKeys = [
    "teacherName",
    "subject",
    "class",
    "section",
    "issueDate",
    "submissionDate",
  
  ];

  return (
    <>
      <HeadingHeader
        title="Manage Assignment"
        items={[
          { label: "Academic", path: "/academic" },
          { label: "Assignments & Notes", path: "/academic/assignments" },
          { label: "Manage Assignment", path: "/academic/assignments/manage" },
        ]}
      />

   

      {/* Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        filters={false}
        Data={filteredAssignments}
        headers={tableHeaders}
        dataKeys={tableDataKeys}
        hasStatus={"status"}
        onDelete={(data) => setDeleteData(data)}
        onView={(assignment) => setViewAssignment(assignment)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this assignment?"
      />

      {/* View Modal */}
      {/* <ViewModal
        isOpen={!!viewAssignment}
        onClose={() => setViewAssignment(null)}
        title="Assignment Details"
        data={viewAssignment}
      /> */}
    </>
  );
};

export default ManageAssignment;
