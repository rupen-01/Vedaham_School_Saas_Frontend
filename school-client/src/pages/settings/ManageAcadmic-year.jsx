
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import HeadingHeader from "../../components/common/HeadingHeader";
import Table from "../../components/common/Table";
import DeleteModal from "../../components/common/Delete";
import ViewModal from "../../components/common/Viewmodel";
import Loader from "../../components/common/Loader";
import CreateAcademicYear from "./CreateAcademic-year";
import ApiConfig from "../../config/ApiConfig";
import { toast } from "react-hot-toast";
import { useGetApi, useMutationApi } from "../../config/UseApi";
const ManageAcademicYear = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewYear, setViewYear] = useState(null);
  const [showAddYearModal, setShowAddYearModal] = useState(false);
  const [editYear, setEditYear] = useState(null);

  const queryClient = useQueryClient();

  const academicYearConfig = {
    table: {
      headers: ["Label", "Start Date", "End Date", "Description", "Active", "Actions"],
      keys: [
        "academic_year_label",
        "start_date",
        "end_date",
        "description",
        "is_active",
      ],
    },
  };

  // ---------------------------
  // Fetch academic years
  // ---------------------------
  const { data: academicYearsRes, isLoading, isError, error } = useGetApi({
    key: "academic-years",
    url: ApiConfig.ACADEMIC_YEAR_GET_ALL,
  });

  const academicYears = Array.isArray(academicYearsRes?.data)
    ? academicYearsRes.data
    : [];

  // Map active status for display
  const mappedYears = academicYears.map((year) => ({
    ...year,
    is_active: year.is_active ? "Yes" : "No",
  }));

  // ---------------------------
  // Delete academic year
  // ---------------------------
  const { mutate: deleteAcademicYear } = useMutationApi({
    key: "academic-years",
    url: ApiConfig.ACADEMIC_YEAR_DELETE(""), // base URL without ID
    method: "DELETE",
    requireAuth: true,
    options: {
      onSuccess: () => {
        toast.success("Academic year deleted successfully!");
        setDeleteData(null);
      },
      onError: () => {
        toast.error("Failed to delete academic year.");
      },
    },
  });

  const handleDelete = (year) => {
    deleteAcademicYear({ id: year.id || year._id });
  };

  // ---------------------------
  // Open edit modal
  // ---------------------------
  const handleEdit = (year) => {
    setEditYear(year);
    setShowAddYearModal(true);
  };

  useEffect(() => {
    console.log("Mapped Academic Years:", mappedYears);
  }, [mappedYears]);

  if (isLoading) return <Loader text="Loading academic years..." />;
  if (isError)
    return (
      <p className="text-red-600">
        Failed to load academic years: {error.message}
      </p>
    );

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Academic Years"
          items={[
            { label: "Academic Years", path: "/settings/academic-years" },
            { label: "Manage Academic Years", path: "/settings/academic-years/manage" },
          ]}
        />
        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditYear(null);
              setShowAddYearModal(true);
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add Academic Year
          </button>
        </div>
      </div>

      {/* Academic Years Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={mappedYears}
        headers={academicYearConfig.table.headers}
        dataKeys={academicYearConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(y) => setViewYear(y)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this academic year?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewYear}
        onClose={() => setViewYear(null)}
        title="View Academic Year Details"
        data={viewYear}
      />

      {/* Add/Edit Academic Year Modal */}
      <CreateAcademicYear
        isOpen={showAddYearModal}
        onClose={() => {
          setShowAddYearModal(false);
          setEditYear(null);
        }}
        editData={editYear}
        onSuccess={() => queryClient.invalidateQueries(["academic-years"])}
      />
    </>
  );
};

export default ManageAcademicYear;
