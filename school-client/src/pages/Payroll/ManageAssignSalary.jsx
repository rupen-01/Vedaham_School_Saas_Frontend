import { useState } from "react";
import HeadingHeader from "../../components/common/HeadingHeader";
import Table from "../../components/common/Table";
import DeleteModal from "../../components/common/Delete";
import ViewModal from "../../components/common/Viewmodel";
import { useNavigate } from "react-router-dom";

const ManageAssignSalary = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const navigate = useNavigate();

  // Data from screenshot
  const assignSalaryData = [
    {
      id: 1,
      name: "Ravi Sharma",
      department: "Maths",
      role: "Teacher",
      grossSalary: "12000 rs.",
      effectiveFrom: "02/03/2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Jyoti Singh",
      department: "Transport",
      role: "Attendant",
      grossSalary: "10000 rs.",
      effectiveFrom: "02/03/2025",
      status: "Active",
    },
    {
      id: 3,
      name: "Rama Joshi",
      department: "Transport",
      role: "Driver",
      grossSalary: "12000 rs.",
      effectiveFrom: "02/03/2025",
      status: "In-Active",
    },
  ];

  // Apply filter + search
  const filteredData = assignSalaryData.filter((item) => {
    const matchesFilter = filter === "All" || item.status === filter;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tableHeaders = [
    "Name",
    "Department",
    "Role",
    "Gross Salary",
    "Effective From",
  
  ];
  const tableDataKeys = [
    "name",
    "department",
    "role",
    "grossSalary",
    "effectiveFrom",

  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <HeadingHeader
          title="Manage Assign Salary"
          items={[
            { label: "Payroll", path: "/" },
            { label: "Manage Assign Salary", path: "/payroll/manage-assign-salary" },
          ]}
        />
        <div className="text-right mb-4">
          <button
            onClick={() => navigate("/payroll/manage-assign-salary/add")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Assign Salary
          </button>
        </div>
      </div>

      <Table
        Search={true}
        ImageContainerShow={false}
        hasStatus={"status"}
        filters={true}
        Data={filteredData}
        headers={tableHeaders}
        dataKeys={tableDataKeys}
        onDelete={(data) => setDeleteData(data)}
        onView={(data) => setViewData(data)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this assigned salary?"
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="Assigned Salary Details"
        data={viewData}
      />
    </>
  );
};

export default ManageAssignSalary;
