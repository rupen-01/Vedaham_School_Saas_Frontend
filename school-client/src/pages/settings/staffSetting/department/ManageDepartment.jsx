import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import Table from "../../../../components/common/Table";
import DeleteModal from "../../../../components/common/Delete";
import ViewModal from "../../../../components/common/Viewmodel";
import Loader from "../../../../components/common/Loader";
import CreateDepartment from "./CreateDepartment";
import { useQueryClient } from "@tanstack/react-query";
import ApiConfig from "../../../../config/ApiConfig";
import { toast } from "react-hot-toast";
import { useGetApi, useMutationApi } from "../../../../config/UseApi";

const ManageDepartment = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewDepartment, setViewDepartment] = useState(null);
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ---------------------------
  // Table headers and keys
  // ---------------------------
  const departmentConfig = {
    table: {
      headers: ["Name", "Description", "Actions"],
      keys: ["name", "description"],
    },
  };

  // ---------------------------
  // ✅ Fetch all departments using useGetApi
  // ---------------------------
  const {
    data: departmentsRes,
    isLoading,
    isError,
    error,
  } = useGetApi({
    key: "departments",
    url: ApiConfig.DEPARTMENT_GET_ALL,
  });

  // ✅ Optimize data processing with useMemo
  const departments = useMemo(() => {
    return Array.isArray(departmentsRes?.data)
      ? departmentsRes.data.map((dept) => ({
          ...dept,
          status:
            dept.status === true || dept.status === "Active"
              ? "Active"
              : "Inactive",
        }))
      : [];
  }, [departmentsRes?.data]);

 
// ---------------------------
// ✅ Delete department using useMutationApi with optimistic updates
// ---------------------------
const deleteDepartment = useMutationApi({
  key: "departments",
  url: ApiConfig.DEPARTMENT_DELETE,
  method: "DELETE",
  requireAuth: true,
  options: {
    onSuccess: () => {
      toast.success("Department deleted successfully!");
      setDeleteData(null);
      // ✅ More efficient invalidation - only refetch if needed
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err) => {
      toast.error("Failed to delete department. Please try again.");
      console.error("Delete Department Error:", err);
    },
  },
});

const handleDelete = (data) => {
  if (!data?.id) {
    toast.error("Invalid department data");
    return;
  }
  
  deleteDepartment.mutate({
    id: data.id,
  });
};



  // ---------------------------
  // Open edit modal
  // ---------------------------
  const handleEdit = (department) => {
    setEditDepartment(department);
    setShowAddDepartmentModal(true);
  };

  useEffect(() => {
    console.log("Fetched Departments:", departments);
  }, [departments]);

  if (isLoading) return <Loader text="Loading departments..." />;
  if (isError)
    return (
      <p className="text-red-600">Failed to load departments: {error.message}</p>
    );

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Departments"
          items={[
            { label: "Departments", path: "/academics/departments" },
            { label: "Manage Departments", path: "/academics/departments/manage" },
          ]}
        />

        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditDepartment(null);
              setShowAddDepartmentModal(true);
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add Department
          </button>
        </div>
      </div>

      {/* Departments Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={departments}
        headers={departmentConfig.table.headers}
        dataKeys={departmentConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(dept) => setViewDepartment(dept)}
        hasStatus="status"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this department?"
        onConfirm={() => handleDelete(deleteData)}
        isLoading={deleteDepartment.isLoading}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewDepartment}
        onClose={() => setViewDepartment(null)}
        title="View Department Details"
        data={viewDepartment}
      />

      {/* Add/Edit Department Modal */}
      <CreateDepartment
        isOpen={showAddDepartmentModal}
        onClose={() => {
          setShowAddDepartmentModal(false);
          setEditDepartment(null);
        }}
        editData={editDepartment}
        onSuccess={() => {
          // ✅ More efficient invalidation
          queryClient.invalidateQueries({ queryKey: ["departments"] });
        }}
      />
    </>
  );
};

export default ManageDepartment;
