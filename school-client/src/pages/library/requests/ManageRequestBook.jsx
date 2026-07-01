import { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";

const ManageRequest = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);

  // 📦 Request Table Data (from screenshot)
  const requestData = [
    {
      id: "5001",
      requester: "Aarav Sinha (STU033)",
      type: "Student",
      title: "Harry Potter",
      date: "2025-08-02",
      status: "Pending",
    },
    {
      id: "5002",
      requester: "Mrs. Sharma (STF019)",
      type: "Staff",
      title: "Science Today",
      date: "2025-08-04",
      status: "Approved",
    },
    {
      id: "5003",
      requester: "Kritika Mehta (STU052)",
      type: "Student",
      title: "Biography",
      date: "2025-08-01",
      status: "Issued",
    },
    {
      id: "5004",
      requester: "Mr. Das (STF022)",
      type: "Staff",
      title: "Reference",
      date: "2025-07-30",
      status: "Rejected",
    },
    {
      id: "5005",
      requester: "Priya Verma (STU120)",
      type: "Student",
      title: "English Tales",
      date: "2025-08-03",
      status: "Pending",
    },
    {
      id: "5006",
      requester: "Mr. Francis (STF011)",
      type: "Staff",
      title: "Math Workbook",
      date: "2025-07-28",
      status: "Approved",
    },
    {
      id: "5007",
      requester: "Rohit Kumar (STU105)",
      type: "Student",
      title: "Digital Library - eBook",
      date: "2025-08-05",
      status: "Pending",
    },
    {
      id: "5008",
      requester: "Mrs. Gupta (STF035)",
      type: "Staff",
      title: "History of India",
      date: "2025-08-06",
      status: "Issued",
    },
  ];

  // 🧩 Table Config
  const tableConfig = {
    headers: [
      "Request ID",
      "Requester Name",
      "Type",
      "Book Title/Category Requested",
      "Date Requested",
      
    ],
    keys: ["id", "requester", "type", "title", "date"],
  };

  // ✅ Add action buttons
  const tableData = requestData.map((row) => ({
    ...row,
  }));

  return (
    <>
      <HeadingHeader
        title="Manage Request"
        items={[
          { label: "Library", path: "/" },
          { label: "Request", path: "/library/request" },
          { label: "Manage Request", path: "/library/manage-request" },
        ]}
      />

  
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={tableData}
        headers={tableConfig.headers}
        dataKeys={tableConfig.keys}
        hasStatus={"status"}
      />


      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this request?"
      />

    
      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="Request Details"
        data={viewData}
      />
    </>
  );
};

export default ManageRequest;
