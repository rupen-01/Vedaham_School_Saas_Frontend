
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import ApiConfig from "../../../../config/ApiConfig";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import Table from "../../../../components/common/Table";
import DeleteModal from "../../../../components/common/Delete";
import ViewModal from "../../staffSetting/component/ViewModal";
import Loader from "../../../../components/common/Loader";
import CreateHouse from "./CreateHouses";
import { useGetApi, useMutationApi } from "../../../../config/UseApi";

const ManageHouses = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewHouse, setViewHouse] = useState(null);
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const [editHouse, setEditHouse] = useState(null);

  const queryClient = useQueryClient();

  // ---------------------------
  // Table headers and keys
  // ---------------------------
  const houseConfig = {
    table: {
      headers: [
        "House Name",
        "House Code",
        "House Color",
        "Display Order",
        "Description",
        "Actions",
      ],
      keys: [
        "house_name",
        "house_code",
        "house_color",
        "display_order",
        "description",
      ],
    },
  };

  // ---------------------------
  // ✅ Fetch all houses using useGetApi
  // ---------------------------
  const {
    data: housesRes,
    isLoading,
    isError,
    error,
  } = useGetApi({
    key: "houses",
    url: ApiConfig.HOUSE_GET_ALL,
  });

  const houses = Array.isArray(housesRes?.data)
    ? housesRes.data.map((house) => ({
        ...house,
        status: house.is_active ? "Active" : "Inactive",
      }))
    : [];


 // ---------------------------
// ✅ Delete house using useMutationApi (same style as Department)
// ---------------------------
const deleteHouse = useMutationApi({
  key: "houses", // Same key as useGetApi for invalidation
  url: ApiConfig.HOUSE_DELETE, // Base URL, ID will be passed in mutation
  method: "DELETE",
  requireAuth: true,
  options: {
    onSuccess: () => {
      toast.success("House deleted successfully!");
      setDeleteData(null);
    },
    onError: (err) => {
      toast.error("Failed to delete house. Please try again.");
      console.error("Delete House Error:", err);
    },
  },
});

// ✅ Handle Delete Action
const handleDelete = (data) => {
  deleteHouse.mutate({
    id: data.id, // ✅ Pass house ID
  });
};

  // ---------------------------
  // Open edit modal
  // ---------------------------
  const handleEdit = (houseItem) => {
    setEditHouse(houseItem);
    setShowAddHouseModal(true);
  };

  useEffect(() => {
    console.log("Fetched Houses:", houses);
  }, [houses]);

  if (isLoading) return <Loader text="Loading houses..." />;
  if (isError)
    return <p className="text-red-600">Failed to load houses: {error.message}</p>;

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Houses"
          items={[
            { label: "Houses", path: "/academics/houses" },
            { label: "Manage Houses", path: "/academics/houses/manage" },
          ]}
        />

        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditHouse(null);
              setShowAddHouseModal(true);
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add House
          </button>
        </div>
      </div>

      {/* Houses Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={houses}
        headers={houseConfig.table.headers}
        dataKeys={houseConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(house) => setViewHouse(house)}
        hasStatus="status"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this house?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewHouse}
        onClose={() => setViewHouse(null)}
        title="View House Details"
        data={viewHouse}
      />

      {/* Add/Edit House Modal */}
      <CreateHouse
        isOpen={showAddHouseModal}
        onClose={() => {
          setShowAddHouseModal(false);
          setEditHouse(null);
        }}
        editData={editHouse}
        onSuccess={() => queryClient.invalidateQueries(["houses"])}
      />
    </>
  );
};

export default ManageHouses;
