import { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import { CardSim } from "lucide-react";
import Card from "../../../components/common/Card";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";

const AddAttendance = () => {
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // default today
  });

  const [staffList, setStaffList] = useState([
    {
      staffId: "StaffID1",
      staffName: "Ravi Sharma",
      attendance: "Half Day",
      entryTime: "08:00",
      exitTime: "12:00",
      remarks: "Leave due to Fever.",
    },
    {
      staffId: "StaffID2",
      staffName: "Puja Singh",
      attendance: "Late",
      entryTime: "11:00",
      exitTime: "14:00",
      remarks: "",
    },
    {
      staffId: "StaffID3",
      staffName: "Deepika",
      attendance: "Present",
      entryTime: "",
      exitTime: "",
      remarks: "",
    },
    {
      staffId: "StaffID4",
      staffName: "Khushi",
      attendance: "",
      entryTime: "",
      exitTime: "",
      remarks: "",
    },
  ]);

  // Add more staff when Generate Attendance Sheet is clicked
  const handleGenerateSheet = () => {
    const newStaff = [
      {
        staffId: "StaffID5",
        staffName: "Rahul Mehta",
        attendance: "",
        entryTime: "",
        exitTime: "",
        remarks: "",
      },
      {
        staffId: "StaffID6",
        staffName: "Anjali Gupta",
        attendance: "",
        entryTime: "",
        exitTime: "",
        remarks: "",
      },
    ];
    setStaffList((prev) => [...prev, ...newStaff]);
  };

  // Handle edits in table cells
  const handleFieldChange = (staffId, field, value) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff.staffId === staffId ? { ...staff, [field]: value } : staff
      )
    );
  };

  // Table headers & keys
  const tableHeaders = [
    "Staff ID",
    "Staff Name",
    "Attendance",
    "Entry Time",
    "Exit Time",
    "Remarks",
  ];

  const tableDataKeys = [
    "staffId",
    "staffName",
    "attendance",
    "entryTime",
    "exitTime",
    "remarks",
  ];

  // Create filtered data with JSX for editable fields
  const filteredData = staffList.map((staff) => ({
    ...staff,
    attendance: (
      <select
        value={staff.attendance}
        onChange={(e) =>
          handleFieldChange(staff.staffId, "attendance", e.target.value)
        }
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="">Select Attendance</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Half Day">Half Day</option>
        <option value="Late">Late</option>
        <option value="Holiday">Holiday</option>
      </select>
    ),
    entryTime: (
      <input
        type="time"
        value={staff.entryTime}
        onChange={(e) =>
          handleFieldChange(staff.staffId, "entryTime", e.target.value)
        }
        className="border border-gray-300 rounded px-2 py-1"
      />
    ),
    exitTime: (
      <input
        type="time"
        value={staff.exitTime}
        onChange={(e) =>
          handleFieldChange(staff.staffId, "exitTime", e.target.value)
        }
        className="border border-gray-300 rounded px-2 py-1"
      />
    ),
    remarks: (
      <input
        type="text"
        value={staff.remarks}
        onChange={(e) =>
          handleFieldChange(staff.staffId, "remarks", e.target.value)
        }
        placeholder="Enter remarks..."
        className="border border-gray-300 rounded px-2 py-1"
      />
    ),
  }));

  const handleAddAttendance = () => {
    console.log("Attendance Data:", { department, role, date, staffList });
    alert("Attendance Saved!");
  };

  return (
  <>  
      {/* Heading */}
        <HeadingHeader
          title="Add Attendance"
          items={[
            { label: "Staff", path: "/" },
            { label: "Attendance", path: "/staff/attendance" },
            { label: "Add Attendance", path: "/staff/attendance/add" },
          ]}
        />
   <Card  className="mb-4"> 
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Select Department */}
    <SlidingLabelSelect
      label="Select Department"
      name={"department"}
      value={department}
      onChangeProp={(e) => setDepartment(e.target.value)}
    options={[
      { label: "All", value: "All" },
      { label: "Science", value: "Science" },
      { label: "Maths", value: "Maths" },
      { label: "English", value: "English" },   
      { label: "History", value: "History" },
      { label: "Geography", value: "Geography" },
      { label: "Computer Science", value: "Computer Science" },
      { label: "Biology", value: "Biology" },
      { label: "Chemistry", value: "Chemistry" },
      { label: "Physics", value: "Physics" },   
    ]}
    />

    {/* Select Role */}
    <SlidingLabelSelect
      label="Select Role"
      name={"role"}
      value={role}
      onChangeProp={(e) => setRole(e.target.value)}
      options={[                                                          
      { label: "All", value: "All" }, 
      { label: "Teacher", value: "Teacher" },
      { label: "Clerk", value: "Clerk" },
      { label: "Principal", value: "Principal" },
    ]}
    />

    {/* Date */}
    <SlidingLabelInput
      type="date"
      label="Date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

    {/* Generate Button */}
       
  </div>
     <div className="text-right mt-6">
            <button
               onClick={handleGenerateSheet}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
                Generate Attendance Sheet
            </button>
          </div>
</Card>


      {/* Attendance Table */}
   
        <Table

          Search={true}
          filters={true}
          ImageContainerShow={false}
          Data={filteredData}
          headers={tableHeaders}
          dataKeys={tableDataKeys}
          onDelete={(data) => console.log("Delete:", data)}
          onView={(staff) => console.log("View:", staff)}
        />


      {/* Save Button */}
           <div className="text-right mt-6">
            <button
             onClick={handleAddAttendance}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
               Add Attendance
            </button>
          </div>
</>
  );
};

export default AddAttendance;
