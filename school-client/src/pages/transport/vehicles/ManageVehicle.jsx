import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";
import AddVehicle from "./AddVehicle";

const ManageVehicles = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewVehicle, setViewVehicle] = useState(null);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);

  const navigate = useNavigate();

  // Table headers and keys
  const vehicleConfig = {
    table: {
      headers: [
        "Vehicle No.",
        "Vehicle Type",
        "Vehicle Name",
        "Seating Capacity",
        "Insurance Expiry Date",
      
        "Actions",
      ],
      keys: [
        "vehicleNo",
        "vehicleType",
        "vehicleName",
        "seatingCapacity",
        "insuranceExpiryDate",
     
      ],
    },
  };

  // ---------------------------
  // Dummy Vehicle Data
  // ---------------------------
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      vehicleNo: "1001",
      vehicleType: "Bus",
      vehicleName: "Blue Bus",
      seatingCapacity: 36,
      insuranceExpiryDate: "2025-08-07",
      status: "Active",
    },
    {
      id: 2,
      vehicleNo: "1002",
      vehicleType: "Van",
      vehicleName: "White Van",
      seatingCapacity: 20,
      insuranceExpiryDate: "2025-08-01",
      status: "Active",
    },
    {
      id: 3,
      vehicleNo: "1003",
      vehicleType: "Auto",
      vehicleName: "Route 5 Auto",
      seatingCapacity: 12,
      insuranceExpiryDate: "2025-08-01",
      status: "Inactive",
    },
  ]);

  // ---------------------------
  // Delete vehicle
  // ---------------------------
  const handleDelete = (vehicle) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
    toast.success("Vehicle deleted successfully!");
    setDeleteData(null);
  };

  // ---------------------------
  // Open edit modal
  // ---------------------------
  const handleEdit = (vehicle) => {
    setEditVehicle(vehicle);
    setShowAddVehicleModal(true);
  };

  useEffect(() => {
    console.log("Fetched Vehicles:", vehicles);
  }, [vehicles]);

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Vehicles"
          items={[
            { label: "Transport", path: "/transport" },
            { label: "Vehicles", path: "/transport/vehicles" },
          ]}
        />

        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditVehicle(null);
              setShowAddVehicleModal(true);
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Vehicles Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={vehicles}
        headers={vehicleConfig.table.headers}
        dataKeys={vehicleConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(veh) => setViewVehicle(veh)}
        hasStatus="status"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this vehicle?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewVehicle}
        onClose={() => setViewVehicle(null)}
        title="View Vehicle Details"
        data={viewVehicle}
      />

      {/* Add/Edit Vehicle Modal */}
      {/* Replace CreateDepartment with your own CreateVehicle component */}
      <AddVehicle
        isOpen={showAddVehicleModal}
        onClose={() => {
          setShowAddVehicleModal(false);
          setEditVehicle(null);
        }}
        editData={editVehicle}
        onSuccess={(newVehicle) => {
          if (editVehicle) {
            setVehicles((prev) =>
              prev.map((v) => (v.id === editVehicle.id ? newVehicle : v))
            );
          } else {
            setVehicles((prev) => [...prev, { ...newVehicle, id: Date.now() }]);
          }
        }}
      />
    </>
  );
};

export default ManageVehicles;
