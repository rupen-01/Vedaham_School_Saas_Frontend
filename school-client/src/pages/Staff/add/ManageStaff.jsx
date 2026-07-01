import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import HeadingHeader from "../../../components/common/HeadingHeader";
import ViewModal from "../../../components/common/Viewmodel";
import ExportExcel from "../../../components/common/ExecelButton";

const Managestaff = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewTeacher, setViewTeacher] = useState(null);
  const navigate = useNavigate();

  const staffData = [
    {
      id: 1,
      staffName: "Ravi Sharma",
      department: "Mathematics",
      role: "Teacher",
      contact: "9876543210",
      email: "ravi.sharma@school.edu",
      status: "Active",
    },
    {
      id: 2,
      staffName: "Neha Verma",
      department: "Admin",
      role: "Clerk",
      contact: "9123456789",
      email: "neha.verma@school.edu",
      status: "Inactive",
    },
    {
      id: 3,
      staffName: "Amit Joshi",
      department: "Science",
      role: "Lab Assistant",
      contact: "9988776655",
      email: "amit.joshi@school.edu",
      status: "Active",
    },
  ];

  const filteredData = staffData.filter((staff) => {
    const matchSearch = staff.staffName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || staff.status === filter;
    return matchSearch && matchFilter;
  });

  const tableHeaders = [
    "Staff Name",
    "Department",
    "Role",
    "Contact No.",
    "Email",
 
  ];

  const tableDataKeys = [
    "staffName",
    "department",
    "role",
    "contact",
    "email",
 
  ];

  return (
    <>
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
      {/* Page Heading */}
      <HeadingHeader
        title="Manage Staff"
        items={[
          { label: "Staff", path: "/" },
          { label: "Manage Staff", path: "/staff/manage" },
        ]}
      />

      {/* Actions */}
      <div className="flex w-full sm:w-auto ">
        <ExportExcel data={staffData} fileName="staff.xlsx"/>
        
  
      </div>
      </div>

      <Table
        Search={true}
        filters={true}
        ImageContainerShow={false}
        Data={filteredData}
        headers={tableHeaders}
        dataKeys={tableDataKeys}
        hasStatus={'status'}
        onDelete={(data) => setDeleteData(data)}
        onView={(teacher) => setViewTeacher(teacher)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this user?"
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewTeacher}
        onClose={() => setViewTeacher(null)}
        title="Staff Details"
        data={viewTeacher}
      />
    </>
  );
};

export default Managestaff;
