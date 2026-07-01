import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import HeadingHeader from "../../../components/common/HeadingHeader";
import ViewModal from "../../../components/common/Viewmodel";
import ExportExcel from "../../../components/common/ExecelButton";

const LeaveSummary = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewStaff, setViewStaff] = useState(null);
  const navigate = useNavigate();

  const leaveData = [
    {
      id: 1,
      staffName: "Ravi Sharma",
      department: "Mathematics",
      role: "Teacher",
      totalLeaves: 10,
      leavesTaken: 8,
      remainingLeaves: 2,
    },
    {
      id: 2,
      staffName: "Neha Verma",
      department: "Admin",
      role: "Clerk",
      totalLeaves: 15,
      leavesTaken: 9,
      remainingLeaves: 6,
    },
    {
      id: 3,
      staffName: "Amit Joshi",
      department: "Science",
      role: "Lab Assistant",
      totalLeaves: 18,
      leavesTaken: 17,
      remainingLeaves: 1,
    },
  ];

  const filteredData = leaveData.filter((staff) => {
    const matchSearch = staff.staffName.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const tableHeaders = [
    "Staff Name",
    "Department",
    "Role",
    "Total Leaves",
    "Leaves Taken",
    "Remaining Leaves",

  ];

  const tableDataKeys = [
    "staffName",
    "department",
    "role",
    "totalLeaves",
    "leavesTaken",
    "remainingLeaves",
 
  ];

  return (
    <>
 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
  <HeadingHeader
    title="Manage Staff"
    items={[
      { label: "Staff", path: "/" },
      { label: "Manage Staff", path: "/staff/manage" },
    ]}
  />

  <div >
    <ExportExcel data={leaveData} fileName="staff.xlsx"/>
     
  </div>
</div>


      <Table
        Search={true}
        filters={true}
        ImageContainerShow={false}
        Data={filteredData}
        headers={tableHeaders}
        dataKeys={tableDataKeys}
        
        onDelete={(data) => setDeleteData(data)}
        onView={(staff) => setViewStaff(staff)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this record?"
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewStaff}
        onClose={() => setViewStaff(null)}
        title="Leave Details"
        data={viewStaff}
      />
    </>
  );
};

export default LeaveSummary;
