import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import Table from "../../../../components/common/Table";
import DeleteModal from "../../../../components/common/Delete";
import ViewModal from "../../../../components/common/Viewmodel";
import AddAssignSubject from "./AssignSubject";

const ManageAssignSubjects = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [showAssignSubjectModal, setShowAssignSubjectModal] = useState(false);

  const navigate = useNavigate();

  // ✅ Object data for assigned subjects
  const data = {
    assignedSubjects: [
      { id: 1, class: "12, 6, 3", section: "A, B", subject: "Mathematics", teacher: "Raj Manhotra", credit: 4 },
      { id: 2, class: "8, 9, 10", section: "A", subject: "Computer Science", teacher: "Menu Sha", credit: 4 },
      { id: 3, class: "11, 12", section: "B, C", subject: "Environmental Sci.", teacher: "Raju Sastri", credit: 5 },
      { id: 4, class: "12, 11", section: "A, B, C, D", subject: "Psychology", teacher: "Khushi Yadav", credit: 6 },
      { id: 5, class: "10, 11, 12", section: "A, C", subject: "Statistics", teacher: "Sheema Sharma", credit: 5 },
      { id: 6, class: "9, 8, 10", section: "A, B", subject: "Physics", teacher: "Raksha Yadav", credit: 4 },
    ],
  };

  const filteredSubjects = data.assignedSubjects.filter((subject) =>
    subject.subject.toLowerCase().includes(search.toLowerCase())
  );

  const tableHeaders = ["Class", "Section", "Subject Name", "Assigned Teacher", "Credit"];
  const tableDataKeys = ["class", "section", "subject", "teacher", "credit"];

  return (
    <>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 ">
  {/* Header */}
  <HeadingHeader
    title="Manage Assign Subject"
    items={[
      { label: "Academic", path: "/" },
      { label: "Subjects", path: "/academics/subjects" },
      { label: "Manage Assign Subject", path: "/academics/subjects/manage-assign" },
    ]}
  />

  {/* Action Button */}
  <div className="sm:text-right mb-4">
    <button
      onClick={() => setShowAssignSubjectModal(true)}
      className="ml-3 sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer text-sm sm:text-base"
    >
      Assign Subject
    </button>
  </div>
</div>


      {/* Table */}
      <Table
        ImageContainerShow={false}
        Search={true}
        filters={false}
        Data={filteredSubjects}
        headers={tableHeaders}
        dataKeys={tableDataKeys}
        onDelete={(data) => setDeleteData(data)}
        onView={(subject) => setViewData(subject)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this assigned subject?"
        className="cursor-pointer"
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="View Assigned Subject"
        data={viewData}
        className="cursor-pointer"
      />

      {/* Assign Subject Modal */}
      <AddAssignSubject
        isOpen={showAssignSubjectModal}
        onClose={() => setShowAssignSubjectModal(false)}
      />
    </>
  );
};

export default ManageAssignSubjects;
