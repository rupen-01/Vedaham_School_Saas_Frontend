
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";
import AddCategory from "./AddCategories";

const ManageBookCategories = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const navigate = useNavigate();

  // ✅ Config for Table
  const categoryConfig = {
    filters: ["All", "Active", "Inactive"],
    table: {
      headers: ["Category Name", "Theme"],
      keys: ["name", "theme"],
    },
  };

  // ✅ Sample Book Categories Data
  const categories = [
    { id: 1, name: "Biography", theme: "Life Stories", status: "Active" },
    { id: 2, name: "Science", theme: "Textbook", status: "Active" },
    { id: 3, name: "Reference", theme: "Informational", status: "Inactive" },
  ];

  // ✅ Filtering
  const filteredCategories = categories.filter((category) => {
    const matchesFilter = filter === "All" || category.status === filter;
    const matchesSearch =
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.theme.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <HeadingHeader
          title="Book Categories"
          items={[
            { label: "Library", path: "/" },
            { label: "Book Categories", path: "/library/book-categories" },
          ]}
        />

        {/* Add Category Button */}
        <div className="sm:text-right">
          <button
            onClick={() => setShowAddCategoryModal(true)}
            className="ml-3 sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        hasStatus={"status"}
        Data={filteredCategories}
        headers={categoryConfig.table.headers}
        dataKeys={categoryConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onView={(category) => setViewCategory(category)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this category?"
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewCategory}
        onClose={() => setViewCategory(null)}
        title="View Category Details"
        data={viewCategory}
      />

      {/* Add Category Modal */}
      <AddCategory
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
      />
    </>
  );
};

export default ManageBookCategories;
