import { useState } from "react";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import HeadingHeader from "../../../components/common/HeadingHeader";
import ViewModal from "../../../components/common/Viewmodel";

const LeaveRequest = () => {
  const [search, setSearch] = useState("");
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);

  const leaveData = [
    {
      id: 1,
      staffName: "Ravi Sharma",
      department: "Mathematics",
      role: "Teacher",
      leaveType: "Medical",
      fromDate: "05/07/2024",
      toDate: "05/07/2024",
      applyDate: "05/07/2024",
    },
    {
      id: 2,
      staffName: "Neha Verma",
      department: "Admin",
      role: "Clerk",
      leaveType: "Sick",
      fromDate: "05/07/2024",
      toDate: "05/07/2024",
      applyDate: "05/07/2024",
    },
    {
      id: 3,
      staffName: "Amit Joshi",
      department: "Science",
      role: "Lab Assistant",
      leaveType: "Marriage",
      fromDate: "05/07/2024",
      toDate: "05/07/2024",
      applyDate: "05/07/2024",
    },
  ];

  const filteredData = leaveData.filter((item) =>
    item.staffName.toLowerCase().includes(search.toLowerCase())
  );

  const tableHeaders = [
    "Staff Name",
    "Department",
    "Role",
    "Leave Type",
    "From Date",
    "To Date",
    "Apply Date",
  
  ];

  const tableDataKeys = [
    "staffName",
    "department",
    "role",
    "leaveType",
    "fromDate",
    "toDate",
    "applyDate",

  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <HeadingHeader
          title="Leave Request"
          items={[
            { label: "Staff", path: "/" },
            { label: "Leave Management", path: "/staff/leave" },
            { label: "Leave Approve", path: "/staff/leave/approve" },
          ]}
        />
      </div>

      <Table
        Search={true}
        filters={false}
        ImageContainerShow={false}
        Data={filteredData}
        headers={tableHeaders}
        dataKeys={tableDataKeys}
        onDelete={(data) => setDeleteData(data)}
        onView={(data) => setViewData(data)}
   
        onApprove={(data) => console.log("Approved:", data)} 
        onReject={(data) => console.log("Rejected:", data)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to reject this leave request?"
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="Leave Request Details"
        data={viewData}
      />
    </>
  );
};

export default LeaveRequest;
