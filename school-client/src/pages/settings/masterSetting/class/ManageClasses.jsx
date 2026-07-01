
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import ApiConfig from "../../../../config/ApiConfig";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import Table from "../../../../components/common/Table";
import DeleteModal from "../../../../components/common/Delete";
import ViewModal from "../../staffSetting/component/ViewModal";
import Loader from "../../../../components/common/Loader";
import CreateClass from "./CreateClasses";
import { useGetApi, useMutationApi } from "../../../../config/UseApi";

const ManageClass = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewClass, setViewClass] = useState(null);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [editClass, setEditClass] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ---------------------------
  // Table headers and keys
  // ---------------------------
  const classConfig = {
    table: {
      headers: [
        "Class Name",
        "Class Code",
        "Display Order",
        "Description",
        "Actions",
      ],
      keys: ["class_name", "class_code", "display_order", "description"],
    },
  };

  // ---------------------------
  // ✅ Fetch all classes using useGetApi
  // ---------------------------
  const {
    data: classesRes,
    isLoading,
    isError,
    error,
  } = useGetApi({
    key: "classes",
    url: ApiConfig.CLASS_GET_ALL,
  });

  const classes = Array.isArray(classesRes?.data)
    ? classesRes.data.map((cls) => ({
        ...cls,
        status: cls.is_active ? "Active" : "Inactive",
      }))
    : [];
// ---------------------------
// ✅ Delete Class using useMutationApi (same as Department)
// ---------------------------
const deleteClass = useMutationApi({
  key: "classes", // Same key as useGetApi for invalidation
  url: ApiConfig.CLASS_DELETE, // Base URL, ID will be passed in mutation
  method: "DELETE",
  requireAuth: true,
  options: {
    onSuccess: () => {
      toast.success("Class deleted successfully!");
      setDeleteData(null);
    },
    onError: (err) => {
      toast.error("Failed to delete class. Please try again.");
      console.error("Delete Class Error:", err);
    },
  },
});

// ✅ Handle Delete Action
const handleDelete = (data) => {
  deleteClass.mutate({
    id: data.id, // ✅ Pass class ID
  });
};


  // ---------------------------
  // Open edit modal
  // ---------------------------
  const handleEdit = (classItem) => {
    setEditClass(classItem);
    setShowAddClassModal(true);
  };

  useEffect(() => {
    console.log("Fetched Classes:", classes);
  }, [classes]);

  if (isLoading) return <Loader text="Loading classes..." />;
  if (isError)
    return <p className="text-red-600">Failed to load classes: {error.message}</p>;

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Classes"
          items={[
            { label: "Classes", path: "/academics/classes" },
            { label: "Manage Classes", path: "/academics/classes/manage" },
          ]}
        />

        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditClass(null);
              setShowAddClassModal(true);
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add Class
          </button>
        </div>
      </div>

      {/* Classes Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={classes}
        headers={classConfig.table.headers}
        dataKeys={classConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(cls) => setViewClass(cls)}
        hasStatus="status"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this class?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewClass}
        onClose={() => setViewClass(null)}
        title="View Class Details"
        data={viewClass}
      />

      {/* Add/Edit Class Modal */}
      <CreateClass
        isOpen={showAddClassModal}
        onClose={() => {
          setShowAddClassModal(false);
          setEditClass(null);
        }}
        editData={editClass}
        onSuccess={() => queryClient.invalidateQueries(["classes"])}
      />
    </>
  );
};

export default ManageClass;
