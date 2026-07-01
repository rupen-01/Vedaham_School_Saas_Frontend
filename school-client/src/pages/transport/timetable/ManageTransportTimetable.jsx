import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";


const ManageTimetable = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);

  // modal states
  const [showCreateTimetable, setShowCreateTimetable] = useState(false);

  // ---------------------------
  // Table Config
  // ---------------------------
  const config = {
    table: {
      headers: ["Route Name", "Assigned Vehicle", "Applicable Days", "Actions"],
      keys: ["routeName", "assignedVehicle", "applicableDays"],
    },
  };

  // ---------------------------
  // Dummy Timetable Data
  // ---------------------------
  const [timetables, setTimetables] = useState([
    {
      id: 1,
      routeName: "Route1",
      assignedVehicle: "Blue Bus",
      applicableDays: "Mon, Tue, Wed, Thurs",
    },
    {
      id: 2,
      routeName: "Route1",
      assignedVehicle: "White Van",
      applicableDays: "Fri, Sat",
    },
    {
      id: 3,
      routeName: "Route1",
      assignedVehicle: "Route 5 Auto",
      applicableDays: "Sports Event",
    },
  ]);

  // ---------------------------
  // Delete handler
  // ---------------------------
  const handleDelete = (item) => {
    setTimetables((prev) => prev.filter((p) => p.id !== item.id));
    toast.success("Timetable deleted successfully!");
    setDeleteData(null);
  };

  // ---------------------------
  // Edit handler
  // ---------------------------
  const handleEdit = (item) => {
    setEditData(item);
    toast("Edit functionality to be implemented");
  };

  useEffect(() => {
    console.log("Fetched Timetables:", timetables);
  }, [timetables]);

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Timetable"
          items={[
            { label: "Transport", path: "/transport" },
            { label: "Transport Timetable", path: "/transport/timetable" },
            { label: "Manage Timetable", path: "/transport/timetable/manage" },
          ]}
        />

      
      </div>

      {/* Timetable Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={timetables}
        headers={config.table.headers}
        dataKeys={config.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(data) => setViewData(data)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this timetable?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="View Timetable Details"
        data={viewData}
      />

    
    </>
  );
};

export default ManageTimetable;
