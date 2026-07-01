
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassTeacherViewModal from "./ClassTeacherViewModal";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import HeadingHeader from "../../../components/common/HeadingHeader";
import ViewModal from "../../../components/common/Viewmodel";
const ManageClassTeacherAllowcation = () => {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [results, setResults] = useState([]);
    const [deleteData, setDeleteData] = useState(null);
  const [viewTeacher, setViewTeacher] = useState(null);
const navigate = useNavigate();
  // Updated data from reference image
  const classTeachers = [
      {
      id: 1,
      class: "6th, 7th",
      section: "A, B",
      classTeacher: "Mr. Amit Sharma",
      coClassTeacher: "Mr. Rajesh Patel",
      status: "Active",
    },
    {
      id: 2,
      class: "8th",
      section: "A",
      classTeacher: "Mrs. Priya Verma",
      coClassTeacher: "Ms. Kavita Nair",
      status: "Active",
    },
    {
      id: 3,
      class: "9th, 10th",
      section: "A, B, C",
      classTeacher: "Mr. Rakesh Kumar",
      coClassTeacher: "Mr. Deepak Joshi",
      status: "Inactive",
    },
    {
      id: 4,
      class: "11th",
      section: "A",
      classTeacher: "Ms. Neha Singh",
      coClassTeacher: "Mrs. Pooja Desai",
      status: "Active",
    },
    {
      id: 5,
      class: "12th",
      section: "A, B",
      classTeacher: "Mr. Anil Mehta",
      coClassTeacher: "Mr. Vikram Sethi",
      status: "Active",
    }
  ];

  // Apply filter and search
  const filteredTeachers = classTeachers.filter((teacher) => {
    const matchesFilter = filter === "All" || teacher.status === filter;
    const matchesSearch =
      teacher.class.toLowerCase().includes(search.toLowerCase()) ||
      teacher.classTeacher.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tableHeaders = [
    "Class",
    "Section",
    "Class Teacher",
    "Co-Class Teacher",
  
  ];

  const tableDataKeys = [
    "class",
    "section",
    "classTeacher",
    "coClassTeacher",
 
  ];

  const handleSearch = () => {
    const filtered = classTeachers.filter((teacher) => {
      const matchSearch = teacher.classTeacher
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchFilter = filter === "All" || teacher.status === filter;
      return matchSearch && matchFilter;
    });
    setResults(filtered);
  };

  return (
    <>
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
  <HeadingHeader
    title="Manage Class Teacher Allocation"
    items={[
      { label: "Academics", path: "/" },
      {
        label: "Class Teacher Allocation",
        path: "/academics/class-teacher-allocation",
      },
    ]}
  />
  <div className="flex sm:justify-end ml-3">
    <button
      onClick={() =>
        navigate("/academics/class-teacher-allocation/AddClassTeacherAllowcation")
      }
      className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-sm sm:text-base"
    >
      Allocate Teacher
    </button>
  </div>
</div>


        <Table
          Search={true}
           ImageContainerShow={false}
          filters={true}
          Data={filteredTeachers}
          headers={tableHeaders}
          dataKeys={tableDataKeys}
         hasStatus="status"
    
     onDelete={(data) => setDeleteData(data)}
     onView={(teacher) => setViewTeacher(teacher)}
        >

          </Table>
   {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this user?"
      />
     {/* View Modal */}
      <ViewModal
        isOpen={!!viewTeacher}
        onClose={() => setViewTeacher(null)}
        title="Class Teacher Details"
        data={viewTeacher}
      />
 
    </>
  );
};

export default ManageClassTeacherAllowcation;
