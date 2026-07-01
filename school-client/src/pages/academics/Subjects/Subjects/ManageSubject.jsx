import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import Table from "../../../../components/common/Table";
import DeleteModal from "../../../../components/common/Delete";
import ViewModal from "../../../../components/common/Viewmodel";
import AddSubject from "./AddSubject";

const ManageSubject = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewSubject, setViewSubject] = useState(null);
  const [showAddSubjectmodel, setShowAddSubjectmodel] = useState(false);

  const navigate = useNavigate();

  // ✅ Object-based data
  const subjectConfig = {
    // filters: ["All", "Active", "Inactive"],
    table: {
      headers: ["Name", "Code", "Type", "Is Practical"],
      keys: ["name", "code", "type", "isPractical"],
    },
  };

  const subjects = [
    { id: 1, name: "Mathematics", code: "MTH101", type: "Core", isPractical: "No", status: "Active" },
    { id: 2, name: "Computer Science", code: "CSE101", type: "Core", isPractical: "Yes", status: "Active" },
    { id: 3, name: "Environmental Sci.", code: "ENV101", type: "Activity-Based", isPractical: "No", status: "Active" },
    { id: 4, name: "Psychology", code: "PSY101", type: "Optional", isPractical: "No", status: "Inactive" },
    { id: 5, name: "Statistics", code: "STAT201", type: "Optional", isPractical: "No", status: "Inactive" },
    { id: 6, name: "Physics", code: "PHY101", type: "Core", isPractical: "Yes", status: "Active" },
  ];

  const filteredSubjects = subjects.filter((subject) => {
    const matchesFilter = filter === "All" || subject.status === filter;
    const matchesSearch =
      subject.name.toLowerCase().includes(search.toLowerCase()) ||
      subject.code.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
  <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
  {/* Header */}
  <HeadingHeader

    title="Manage Subjects"
    items={[
      { label: "Academic", path: "/" },
      { label: "Subjects", path: "/academics/subjects" },
      { label: "Manage Subjects", path: "/academics/subjects/manage" },
    ]}
  />

  {/* Add Subject Button */}
  <div className="sm:text-right flex justify-start  ml-3 mb-4">
    <button
      onClick={() => setShowAddSubjectmodel(true)}
      className=" sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer text-sm sm:text-base"
    >
      Add Subject
    </button>
  </div>
</div>


      {/* Table */}
      <Table
        Search={true}
 ImageContainerShow={false}
        filters={subjectConfig.filters}
       hasStatus="status"
        Data={filteredSubjects}
        headers={subjectConfig.table.headers}
        dataKeys={subjectConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onView={(subject) => setViewSubject(subject)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this subject?"
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewSubject}
        onClose={() => setViewSubject(null)}
        title="View Subject Details"
        data={viewSubject}
      />

      {/* Add Subject Modal */}
      <AddSubject
        isOpen={showAddSubjectmodel}
        onClose={() => setShowAddSubjectmodel(false)}
      />
    </>
  );
};

export default ManageSubject;
