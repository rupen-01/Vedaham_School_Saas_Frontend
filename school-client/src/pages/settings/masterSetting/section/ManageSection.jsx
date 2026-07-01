
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
import CreateSection from "./CreateSection";
import { useGetApi, useMutationApi } from "../../../../config/UseApi";

const ManageSection = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewSection, setViewSection] = useState(null);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [editSection, setEditSection] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ---------------------------
  // Table headers and keys
  // ---------------------------
  const sectionConfig = {
    table: {
      headers: [
        "Section Name",
        "Section Code",
        "Display Order",
        "Description",
        "Actions",
      ],
      keys: ["section_name", "section_code", "display_order", "description"],
    },
  };

  // ---------------------------
  // ✅ Fetch all sections using useGetApi
  // ---------------------------
  const {
    data: sectionsRes,
    isLoading,
    isError,
    error,
  } = useGetApi({
    key: "sections",
    url: ApiConfig.SECTION_GET_ALL,
  });
const sections = Array.isArray(sectionsRes?.data)
  ? sectionsRes.data.map((sec) => ({
      ...sec,
      status: sec.is_active ? "Active" : "Inactive",
    }))
  : [];


  // ---------------------------
  // ✅ Delete section using useMutationApi
  // ---------------------------
// ---------------------------
// ✅ Delete Section using useMutationApi (consistent with others)
// ---------------------------
const deleteSection = useMutationApi({
  key: "sections", // Same key as useGetApi for invalidation
  url: ApiConfig.SECTION_DELETE, // Base URL, ID will be passed in mutation
  method: "DELETE",
  requireAuth: true,
  options: {
    onSuccess: () => {
      toast.success("Section deleted successfully!");
      setDeleteData(null);
    },
    onError: (err) => {
      toast.error("Failed to delete section. Please try again.");
      console.error("Delete Section Error:", err);
    },
  },
});

// ✅ Handle Delete Action
const handleDelete = (data) => {
  deleteSection.mutate({
    id: data.id, // ✅ Pass section ID
  });
};

  // ---------------------------
  // Open edit modal
  // ---------------------------
  const handleEdit = (sectionItem) => {
    setEditSection(sectionItem);
    setShowAddSectionModal(true);
  };

  useEffect(() => {
    console.log("Fetched Sections:", sections);
  }, [sections]);

  if (isLoading) return <Loader text="Loading sections..." />;
  if (isError)
    return (
      <p className="text-red-600">Failed to load sections: {error.message}</p>
    );

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Sections"
          items={[
            { label: "Sections", path: "/academics/sections" },
            { label: "Manage Sections", path: "/academics/sections/manage" },
          ]}
        />

        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditSection(null);
              setShowAddSectionModal(true);
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add Section
          </button>
        </div>
      </div>

      {/* Sections Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={sections}
        headers={sectionConfig.table.headers}
        dataKeys={sectionConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(sec) => setViewSection(sec)}
        hasStatus="status"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this section?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewSection}
        onClose={() => setViewSection(null)}
        title="View Section Details"
        data={viewSection}
      />

      {/* Add/Edit Section Modal */}
      <CreateSection
        isOpen={showAddSectionModal}
        onClose={() => {
          setShowAddSectionModal(false);
          setEditSection(null);
        }}
        editData={editSection}
        onSuccess={() => queryClient.invalidateQueries(["sections"])}
      />
    </>
  );
};

export default ManageSection;
