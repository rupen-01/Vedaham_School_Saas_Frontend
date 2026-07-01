import { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewMaterialModal from "./ViewMaterialModal";

const ManageDigitalMaterial = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);

  // 📦 Material Table Data
  const materialData = [
    {
      id: "M001",
      title: "Unit-1 notes",
      uploadedBy: "Aarav Sinha",
      class: "10th",
      subject: "Science",
      uploadedDate: "2025-08-02",
      access: "All",
    },
    {
      id: "M002",
      title: "Unit-1 notes",
      uploadedBy: "Mrs. Sharma",
      class: "10th",
      subject: "Science",
      uploadedDate: "2025-08-04",
      access: "Staff",
    },
    {
      id: "M003",
      title: "Unit-1 notes",
      uploadedBy: "Kritika Mehta",
      class: "10th",
      subject: "English",
      uploadedDate: "2025-08-01",
      access: "Student",
    },
  ];

  // 🧩 Table Config
  const tableConfig = {
    headers: [
      "Title",
      "Uploaded By",
      "Class",
      "Subject",
      "Uploaded Date",
      "Access",
    ],
    keys: ["title", "uploadedBy", "class", "subject", "uploadedDate", "access"],
  };

  return (
    <>
      <HeadingHeader
        title="Manage Material"
        items={[
          { label: "Library", path: "/library" },
          { label: "Digital Library", path: "/library/digital-library" },
          { label: "Manage Material", path: "/library/digital-library/manage" },
        ]}
      />

      <Table
        Search={true}
        ImageContainerShow={false}
        Data={materialData}
        headers={tableConfig.headers}
        dataKeys={tableConfig.keys}
        // ✅ Add view handler here
        onView={(row) => setViewData(row)}
        onDelete={(row) => setDeleteData(row)}
      />

      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this material?"
      />

      <ViewMaterialModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="Material Details"
        data={viewData}
      />
    </>
  );
};

export default ManageDigitalMaterial;
