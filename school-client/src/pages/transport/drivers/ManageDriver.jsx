import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";

const ManageDriverAttendants = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  // Table headers and keys (matching reference image)
  const config = {
    table: {
      headers: [
        "Name",
        "Role",
        "Assigned Vehicle",
        "Contact Number",
        "License Expiry Date",
     
        "Actions",
      ],
      keys: [
        "name",
        "role",
        "assignedVehicle",
        "contactNumber",
        "licenseExpiryDate",
  
      ],
    },
  };

  // ---------------------------
  // Dummy Driver & Attendant Data
  // ---------------------------
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Ram",
      role: "Driver",
      assignedVehicle: "Blue Bus",
      contactNumber: "3689456710",
      licenseExpiryDate: "2025-08-02",
      status: "Active",
    },
    {
      id: 2,
      name: "Shyam",
      role: "Driver",
      assignedVehicle: "White Van",
      contactNumber: "3689456710",
      licenseExpiryDate: "2025-08-04",
      status: "Active",
    },
    {
      id: 3,
      name: "Rohit",
      role: "Attendant",
      assignedVehicle: "Route 5 Auto",
      contactNumber: "3689456710",
      licenseExpiryDate: "—",
      status: "Inactive",
    },
  ]);

  // ---------------------------
  // Delete record
  // ---------------------------
  const handleDelete = (person) => {
    setStaff((prev) => prev.filter((p) => p.id !== person.id));
    toast.success("Record deleted successfully!");
    setDeleteData(null);
  };

  // ---------------------------
  // Edit handler
  // ---------------------------
  const handleEdit = (person) => {
    setEditData(person);
    toast("Edit functionality to be implemented");
  };

  useEffect(() => {
    console.log("Fetched Staff:", staff);
  }, [staff]);

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Driver & Attendants"
          items={[
            { label: "Transport", path: "/transport" },
            { label: "Drivers & Attendants", path: "/transport/driver-attendants" },
          ]}
        />
{/* 
        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditData(null);
              toast("Open Add Driver/Attendant Modal");
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add Driver / Attendant
          </button>
        </div> */}
      </div>

      {/* Staff Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={staff}
        headers={config.table.headers}
        dataKeys={config.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(person) => setViewData(person)}
        hasStatus="status"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this record?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="View Driver/Attendant Details"
        data={viewData}
      />
    </>
  );
};

export default ManageDriverAttendants;
