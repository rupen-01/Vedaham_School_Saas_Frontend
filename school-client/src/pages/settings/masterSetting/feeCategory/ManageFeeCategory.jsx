import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import CreateFeeCategory from "./CreateFeeCategory";
import { useGetApi, useMutationApi } from "../../../../config/UseApi";
import ApiConfig from "../../../../config/ApiConfig";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import Table from "../../../../components/common/Table";
import DeleteModal from "../../../../components/common/Delete";
import ViewModal from "../../../../components/common/Viewmodel";

const ManageFeeCategory = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewFeeCategory, setViewFeeCategory] = useState(null);
  const [showAddFeeCategoryModal, setShowAddFeeCategoryModal] = useState(false);
  const [editFeeCategory, setEditFeeCategory] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ---------------------------
  // Table headers and keys
  // ---------------------------
  const feeCategoryConfig = {
    table: {
      headers: [
        "Category Name",
        "Category Code",
        "Category Type",
        "Description",
     
      ],
      keys: [
        "category_name",
        "category_code",
        "category_type",
        "description",
      
      ],
    },
  };

  // ---------------------------
  // ✅ Fetch all fee categories
  // ---------------------------
  const {
    data: feeCategoriesRes,
    isLoading,
    isError,
    error,
  } = useGetApi({
    key: "fee-categories",
    url: ApiConfig.FEE_CATEGORY_GET_ALL,
  });

//   const feeCategories = Array.isArray(feeCategoriesRes?.data)
//     ? feeCategoriesRes.data
//     : [];

  const feeCategories = Array.isArray(feeCategoriesRes?.data)
    ? feeCategoriesRes.data.map((fc) => ({
        ...fc,
        status: fc.is_active ? "Active" : "Inactive", // ✅ map is_active → status
      }))
    : [];
  // ---------------------------
  // ✅ Delete Fee Category
  // ---------------------------
  const deleteFeeCategory = useMutationApi({
    key: "fee-categories",
    url: ApiConfig.FEE_CATEGORY_DELETE, // base URL only
    method: "DELETE",
    requireAuth: true,
    options: {
      onSuccess: () => {
        toast.success("Fee category deleted successfully!");
        setDeleteData(null);
      },
      onError: (err) => {
        toast.error("Failed to delete fee category. Please try again.");
        console.error("Delete Fee Category Error:", err);
      },
    },
  });

  // ✅ Handle Delete Action
  const handleDelete = (data) => {
    deleteFeeCategory.mutate({
      id: data.id, // ✅ append ID correctly
    });
  };

  // ---------------------------
  // Open edit modal
  // ---------------------------
  const handleEdit = (category) => {
    setEditFeeCategory(category);
    setShowAddFeeCategoryModal(true);
  };

  useEffect(() => {
    console.log("Fetched Fee Categories:", feeCategories);
  }, [feeCategories]);

  if (isLoading) return <p className="text-gray-600">Loading fee categories...</p>;
  if (isError)
    return (
      <p className="text-red-600">Failed to load fee categories: {error.message}</p>
    );

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Fee Categories"
          items={[
            { label: "Fee Categories", path: "/finance/fee-categories" },
            { label: "Manage Fee Categories", path: "/finance/fee-categories/manage" },
          ]}
        />

        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditFeeCategory(null);
              setShowAddFeeCategoryModal(true);
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add Fee Category
          </button>
        </div>
      </div>

      {/* Fee Categories Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={feeCategories}
        headers={feeCategoryConfig.table.headers}
        dataKeys={feeCategoryConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(fc) => setViewFeeCategory(fc)}
        hasStatus="status"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this fee category?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewFeeCategory}
        onClose={() => setViewFeeCategory(null)}
        title="View Fee Category Details"
        data={viewFeeCategory}
      />

      {/* Add/Edit Fee Category Modal */}
      <CreateFeeCategory
        isOpen={showAddFeeCategoryModal}
        onClose={() => {
          setShowAddFeeCategoryModal(false);
          setEditFeeCategory(null);
        }}
        editData={editFeeCategory}
        onSuccess={() => queryClient.invalidateQueries(["fee-categories"])}
      />
    </>
  );
};

export default ManageFeeCategory;
