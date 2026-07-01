
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";
import AddRoute from "./AddRoute";
import AddStop from "./AddStops";

const ManageRoutes = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);

  // modal states
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [showAddStop, setShowAddStop] = useState(null);

  const config = {
    table: {
      headers: [
        "Route Name",
        "Assigned Vehicle",
        "Starting Point",
        "Ending Point",
        "Total Distance (km)",
   
        "Add Stop",
        "Actions",
      ],
      keys: [
        "routeName",
        "assignedVehicle",
        "startingPoint",
        "endingPoint",
        "totalDistance",
      
        "addStop",
      ],
    },
  };

  const [routes, setRoutes] = useState([
    {
      id: 1,
      routeName: "Route1",
      assignedVehicle: "Blue Bus",
      startingPoint: "Aurobindo",
      endingPoint: "School",
      totalDistance: 12,
      status: "Active",
      stops: [],
    },
  ]);

  // delete
  const handleDelete = (route) => {
    setRoutes((prev) => prev.filter((p) => p.id !== route.id));
    toast.success("Route deleted successfully!");
    setDeleteData(null);
  };

  // edit
  const handleEdit = (route) => {
    setEditData(route);
    toast("Edit functionality to be implemented");
  };

  // open stop modal
  const handleAddStop = (route) => {
    setShowAddStop(route);
  };

  useEffect(() => {
    console.log("Fetched Routes:", routes);
  }, [routes]);

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Routes & Stops"
          items={[
            { label: "Transport", path: "/transport" },
            { label: "Routes & Stops", path: "/transport/routes" },
          ]}
        />

        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => setShowAddRoute(true)}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            + Add Route
          </button>
        </div>
      </div>

      {/* Routes Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={routes.map((r) => ({
          ...r,
          addStop: (
            <button
              onClick={() => handleAddStop(r)}
              className="bg-indigo-500 text-white px-2 py-1 rounded text-xs hover:bg-indigo-600"
            >
              + Add
            </button>
          ),
        }))}
        headers={config.table.headers}
        dataKeys={config.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(route) => setViewData(route)}
        hasStatus="status"
      />

      {/* Modals */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this route?"
        onConfirm={() => handleDelete(deleteData)}
      />

      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="View Route Details"
        data={viewData}
      />

      {/* 👇 just call your modals */}
      <AddRoute
        isOpen={showAddRoute}
        onClose={() => setShowAddRoute(false)}
      />

      <AddStop
        isOpen={!!showAddStop}
        onClose={() => setShowAddStop(null)}
        route={showAddStop}
      />
    </>
  );
};

export default ManageRoutes;
