
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import ApiConfig from "../../../../config/ApiConfig";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import Table from "../../../../components/common/Table";
import DeleteModal from "../../../../components/common/Delete";
import ViewModal from "../../staffSetting/component/ViewModal";
import Loader from "../../../../components/common/Loader";
import CreateSubject from "./CreateSubject";
import { useGetApi, useMutationApi } from "../../../../config/UseApi";


const ManageSubjects = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewSubject, setViewSubject] = useState(null);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [editSubject, setEditSubject] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Table headers and keys
  const subjectConfig = {
    table: {
      headers: [
        "Subject Name",
        "Subject Code",
        "Subject Type",
        "Display Order",
        "Description",
        "Actions",
      ],
      keys: [
        "subject_name",
        "subject_code",
        "subject_type",
        "display_order",
        "description",
      ],
    },
  };

  // ---------------------------
  // ✅ Fetch all subjects using useGetApi
  // ---------------------------
  const { data: subjectsRes, isLoading, isError, error, } = useGetApi({ key: "subjects", url: ApiConfig.SUBJECT_GET_ALL, });

  // format subjects safely
  const subjects = Array.isArray(subjectsRes?.data)
    ? subjectsRes.data.map((subj) => ({
      ...subj,
      status: subj.is_active ? "Active" : "Inactive",
    }))
    : [];

  // ---------------------------
  // ✅ Delete subject using useMutationApi
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
  const handleEdit = (subjectItem) => {
    setEditSubject(subjectItem);
    setShowAddSubjectModal(true);
  };

  useEffect(() => {
    console.log("Fetched Subjects:", subjects);
  }, [subjects]);

  if (isLoading) return <Loader text="Loading subjects..." />;
  if (isError)
    return (
      <p className="text-red-600">Failed to load subjects: {error.message}</p>
    );

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Subjects"
          items={[
            { label: "Subjects", path: "/academics/subjects" },
            { label: "Manage Subjects", path: "/academics/subjects/manage" },
          ]}
        />

        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditSubject(null);
              setShowAddSubjectModal(true);
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add Subject
          </button>
        </div>
      </div>

      {/* Subjects Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={subjects}
        headers={subjectConfig.table.headers}
        dataKeys={subjectConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(subj) => setViewSubject(subj)}
        hasStatus="status"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this subject?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewSubject}
        onClose={() => setViewSubject(null)}
        title="View Subject Details"
        data={viewSubject}
      />

      {/* Add/Edit Subject Modal */}
      <CreateSubject
        isOpen={showAddSubjectModal}
        onClose={() => {
          setShowAddSubjectModal(false);
          setEditSubject(null);
        }}
        editData={editSubject}
        onSuccess={() => queryClient.invalidateQueries(["subjects"])}
      />
    </>
  );
};

export default ManageSubjects;
