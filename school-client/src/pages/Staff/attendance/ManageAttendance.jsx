import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import HeadingHeader from "../../../components/common/HeadingHeader";
import ViewModal from "../../../components/common/Viewmodel";
import { Search } from "lucide-react";
import AttendanceStatCards from "./statCard";

const ManageAttendance = () => {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const navigate = useNavigate();

  // Sample attendance data
  const attendanceData = [
    { id: 1, staffName: "Ravi Sharma", department: "Mathematics", role: "Teacher", attendance: "Absent", date: "05/07/2025" },
    { id: 2, staffName: "Neha Verma", department: "Admin", role: "Clerk", attendance: "Present", date: "05/07/2025" },
    { id: 3, staffName: "Amit Joshi", department: "Science", role: "Lab Assistant", attendance: "Half Day", date: "05/07/2025" },
  ];

  // Stats
  const totalPresent = attendanceData.filter((d) => d.attendance === "Present").length;
  const totalAbsent = attendanceData.filter((d) => d.attendance === "Absent").length;
  const totalStaff = attendanceData.length;

  // Filters
  const filteredData = attendanceData.filter((staff) => {
    const matchSearch = staff.staffName.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || staff.department === deptFilter;
    const matchRole = roleFilter === "All" || staff.role === roleFilter;
    return matchSearch && matchDept && matchRole;
  });

  const tableHeaders = ["Staff Name", "Department", "Role", "Attendance", "Date"];
  const tableDataKeys = ["staffName", "department", "role", "attendance", "date"];

  return (
    <>
      {/* Heading */}
      <HeadingHeader
        title="Manage Attendance"
        items={[
          { label: "Staff", path: "/" },
          { label: "Attendance", path: "/staff/attendance" },
          { label: "Manage Attendance", path: "/staff/attendance/manage" },
        ]}
      />

      {/* ✅ Attendance Stat Cards */}
      <AttendanceStatCards
        present={String(totalPresent).padStart(2, "0")}
        absent={String(totalAbsent).padStart(2, "0")}
        total={String(totalStaff).padStart(2, "0")}
      />

   
      {/* Table */}
      <Table
        Search={false}
        filters={false}
        ImageContainerShow={false}
        Data={filteredData}
        headers={tableHeaders}
        dataKeys={tableDataKeys}
        onDelete={(data) => setDeleteData(data)}
        onView={(data) => setViewData(data)}
      />

      {/* Modals */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this attendance record?"
      />
      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="Attendance Details"
        data={viewData}
      />
    </>
  );
};

export default ManageAttendance;
