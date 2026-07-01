
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";
import Loader from "../../../components/common/Loader";
import CreateLeaveType from "./CreateLeave-type";
import ApiConfig from "../../../config/ApiConfig";
import { toast } from "react-hot-toast";
import { useGetApi, useMutationApi } from "../../../config/UseApi";

const ManageLeaveType = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewLeaveType, setViewLeaveType] = useState(null);
  const [showAddLeaveTypeModal, setShowAddLeaveTypeModal] = useState(false);
  const [editLeaveType, setEditLeaveType] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ---------------------------
  // Table headers and keys
  // ---------------------------
  const leaveTypeConfig = {
    table: {
      headers: ["Name", "Description", "Max Days", "Actions"],
      keys: ["name", "description", "max_days"],
    },
  };

  // ---------------------------
  // ✅ Fetch all leave types
  // ---------------------------
  const { data: leaveTypesRes, isLoading, isError, error } = useGetApi({
    key: "leave-types",
    url: ApiConfig.LEAVE_TYPE_GET_ALL,
  });

  const leaveTypes = Array.isArray(leaveTypesRes?.data) ? leaveTypesRes.data : [];

  // ---------------------------
  // ✅ Delete leave type
  // ---------------------------
  // ---------------------------
// ✅ Delete Leave Type
// ---------------------------
const deleteLeaveType = useMutationApi({
  key: "leave-types",
  url: ApiConfig.LEAVE_TYPE_DELETE, // base URL only
  method: "DELETE",
  requireAuth: true,
  options: {
    onSuccess: () => {
      toast.success("Leave type deleted successfully!");
      setDeleteData(null);
    },
    onError: (err) => {
      toast.error("Failed to delete leave type. Please try again.");
      console.error("Delete Leave Type Error:", err);
    },
  },
});

// ✅ Handle Delete Action
const handleDelete = (data) => {
  deleteLeaveType.mutate({
    id: data.id, // ✅ append ID correctly
  });
};


  // ---------------------------
  // Open edit modal
  // ---------------------------
  const handleEdit = (leaveType) => {
    setEditLeaveType(leaveType);
    setShowAddLeaveTypeModal(true);
  };

  useEffect(() => {
    console.log("Fetched Leave Types:", leaveTypes);
  }, [leaveTypes]);

  if (isLoading) return <Loader text="Loading leave types..." />;
  if (isError)
    return (
      <p className="text-red-600">Failed to load leave types: {error.message}</p>
    );

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Leave Types"
          items={[
            { label: "Leave Types", path: "/hr/leave-types" },
            { label: "Manage Leave Types", path: "/hr/leave-types/manage" },
          ]}
        />

        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditLeaveType(null);
              setShowAddLeaveTypeModal(true);
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add Leave Type
          </button>
        </div>
      </div>

      {/* Leave Types Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={leaveTypes}
        headers={leaveTypeConfig.table.headers}
        dataKeys={leaveTypeConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(lt) => setViewLeaveType(lt)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this leave type?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewLeaveType}
        onClose={() => setViewLeaveType(null)}
        title="View Leave Type Details"
        data={viewLeaveType}
      />

      {/* Add/Edit Leave Type Modal */}
      <CreateLeaveType
        isOpen={showAddLeaveTypeModal}
        onClose={() => {
          setShowAddLeaveTypeModal(false);
          setEditLeaveType(null);
        }}
        editData={editLeaveType}
        onSuccess={() => queryClient.invalidateQueries(["leave-types"])}
      />
    </>
  );
};

export default ManageLeaveType;
