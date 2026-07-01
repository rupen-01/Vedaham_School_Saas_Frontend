import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ExportExcel from "../../../components/common/ExecelButton";

const ManageStudents = () => {
  const [deleteData, setDeleteData] = useState(null);

  const navigate = useNavigate();

  // ✅ Handle view student
  const handleView = (student) => {
    navigate("/students/admission/view", { state: { student } });
  };

  // ✅ Config for Student Table
  const studentConfig = {
    table: {
      headers: [
        "Name",
        "DOB",
        "Gender",
        "Class",
        "Section",
        "Roll No.",
        "Admission No.",
      ],
      keys: [
        "name",
        "dob",
        "gender",
        "className",
        "section",
        "rollNo",
        "admissionNo",
      ],
    },
  };

  // ✅ Sample Student Data
  const students = [
    {
      id: 1,
      name: "Khushi",
      dob: "12/09/2006",
      gender: "Female",
      className: "12th",
      section: "A",
      rollNo: "123456",
      admissionNo: "2001",
    },
    {
      id: 2,
      name: "Divya",
      dob: "12/09/2006",
      gender: "Female",
      className: "10th",
      section: "B",
      rollNo: "123456",
      admissionNo: "2002",
    },
    {
      id: 3,
      name: "Ram",
      dob: "12/09/2006",
      gender: "Male",
      className: "10th",
      section: "A",
      rollNo: "123456",
      admissionNo: "2003",
    },
  ];

  return (
    <>
      {/* Header with Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
        <HeadingHeader
          title="Manage Student"
          items={[
            { label: "Student", path: "/" },
            { label: "Manage Students", path: "/students/manage-students" },
          ]}
        />

        <div className="w-full sm:w-auto flex justify-start sm:justify-end">
          <ExportExcel data={students} fileName="students.xlsx" />
        </div>
      </div>

      {/* Table */}
      <Table
        Search={true}             // 🔹 show search box
        ImageContainerShow={false} // 🔹 no image column
        Data={students}            // 🔹 use raw students
        headers={studentConfig.table.headers}
        dataKeys={studentConfig.table.keys}
        onDelete={(student) => setDeleteData(student)}
        onView={handleView}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this student?"
      />
    </>
  );
};

export default ManageStudents;
