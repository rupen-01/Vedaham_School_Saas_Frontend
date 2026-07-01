import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";

const ManageBooks = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewBook, setViewBook] = useState(null);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const navigate = useNavigate();


  const bookConfig = {
    filters: ["All", "Available", "Unavailable"],
    table: {
      headers: [
        "Book Title",
        "Book Code / ISBN",
        "Author",
        "Available Count",
        "Quantity",
       
      ],
      keys: ["title", "code", "author", "available", "quantity"]
    },
  };

  // ✅ Sample Books Data
  const books = [
    {
      id: 1,
      title: "Biography",
      code: "Life Stories",
      author: "Mohn das",
      available: 1,
      quantity: 1,
      status: "Available",
    },
    {
      id: 2,
      title: "Science",
      code: "Textbook",
      author: "Menu titina",
      available: 3,
      quantity: 5,
      status: "Available",
    },
    {
      id: 3,
      title: "Reference",
      code: "Informational",
      author: "Ranu mandal",
      available: 5,
      quantity: 8,
      status: "Unavailable",
    },
  ];

  // ✅ Filtering
  const filteredBooks = books.filter((book) => {
    const matchesFilter = filter === "All" || book.status === filter;
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.code.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
     <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
  <HeadingHeader
    title="Manage Books"
    items={[
      { label: "Library", path: "/" },
      { label: "Manage Books", path: "/library/manage-books" },
    ]}
  />

  {/* Add Book Button */}
  <div className="xl:text-right">
    <button
      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer ml-3 sm:w-auto"
    >
      Bulk Import
    </button>
  </div>
</div>


      {/* Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        // filters={bookConfig.filters}
        Data={filteredBooks}
        headers={bookConfig.table.headers}
        dataKeys={bookConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onView={(book) => setViewBook(book)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this book?"
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewBook}
        onClose={() => setViewBook(null)}
        title="View Book Details"
        data={viewBook}
      />

    </>
  );
};

export default ManageBooks;
