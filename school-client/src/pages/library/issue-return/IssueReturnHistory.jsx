import { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";

const IssueReturnHistory = () => {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);

  // ✅ Sample History Data
  const historyData = [
    {
      id: "1001",
      title: "Harry Potter / HP101",
      member: "Aman Sharma (STU045)",
      type: "Student",
      classDept: "8/B",
      issueDate: "2025-08-01",
      status: "Issued",
    },
    {
      id: "1002",
      title: "Science Today / ST203",
      member: "Mrs. Rao (STF014)",
      type: "Staff",
      classDept: "Science Dept",
      issueDate: "2025-07-30",
      status: "Returned",
    },
    {
      id: "1003",
      title: "Geography Guide / GG310",
      member: "Rishi Kumar (STU067)",
      type: "Student",
      classDept: "7/A",
      issueDate: "2025-07-28",
      status: "Issued",
    },
    {
      id: "1004",
      title: "Life Science / LS505",
      member: "Anjali Mehta (STU098)",
      type: "Student",
      classDept: "6/C",
      issueDate: "2025-08-08",
      status: "Returned",
    },
  ];

  // ✅ Table Config
  const tableConfig = {
    headers: [
      "Issue ID",
      "Book Title/Code",
      "Member Name/ID",
      "User Type",
      "Class/Section / Dept",
      "Issue Date",
 
    ],
    keys: ["id", "title", "member", "type", "classDept", "issueDate"],
  };

   // ✅ Table Data
  const tableData = historyData.map((row) => ({ ...row }));

  return (
    <>
      <HeadingHeader
        title="History"
        items={[
          { label: "Library", path: "/" },
          { label: "Issue & Return", path: "/library/issue-return" },
          { label: "History", path: "/library/history" },
        ]}
      />

      
      {/* Table */}
      <Table
    
           Search={true}
        ImageContainerShow={false}
        Data={tableData}
        headers={tableConfig.headers}
        dataKeys={tableConfig.keys}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this record?"
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="History Details"
        data={viewData}
      />
    </>
  );
};

export default IssueReturnHistory;
