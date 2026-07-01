import { useRef, useState } from "react";
import Table from "../../../components/common/Table";
import HeadingHeader from "../../../components/common/HeadingHeader";
import { Download } from "lucide-react";
import ExportPdf from "../../../components/common/ExportPdf";

const TeacherTimeTable = () => {
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const pdfRef = useRef(); 
  // Dummy Teacher Timetable Data (from screenshot)
  const teacherTimeTable = [
    {
      id: 1,
      subject: "Mathematics",
      class: "1",
      section: "A",
      period: "Period 1",
      timeSlot: "8:00 AM – 8:45 AM",
      weekDays: "Mon, Tue, Wed, Thu, Fri",
    },
    {
      id: 2,
      subject: "Bio",
      class: "1",
      section: "B",
      period: "Period 2",
      timeSlot: "9:00 AM – 9:45 AM",
      weekDays: "Mon, Tue, Wed, Fri",
    },
    {
      id: 3,
      subject: "Ev. Studies",
      class: "4",
      section: "B",
      period: "Period 4",
      timeSlot: "11:00 AM – 12:30 PM",
      weekDays: "Tue, Wed, Fri, Sat",
    },
  ];

  // Filter Data
  const filteredData = teacherTimeTable.filter((row) => {
    const matchesSearch = row.subject.toLowerCase().includes(search.toLowerCase());
    const matchesClass = filterClass === "All" || row.class === filterClass;
    return matchesSearch && matchesClass;
  });

  // Table headers and keys
  const tableHeaders = [
    "Subject",
    "Class",
    "Section",
    "Period No",
    "Time Slot",
    "Week Working Days",
  ];

  const tableDataKeys = [
    "subject",
    "class",
    "section",
    "period",
    "timeSlot",
    "weekDays",
  ];

  const classOptions = ["All", "1", "2", "3", "4", "5"];

  return (
    <>
          {/* Top Controls */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
  {/* Header */}
  <HeadingHeader
    title="Teacher-Name Time Table"
    items={[
      { label: "Academic", path: "/academic" },
      { label: "Time Table", path: "/academic/timetable" },
      { label: "Teacher Time Table", path: "/academic/timetable/view-teacher" },
    ]}
    className="text-sm sm:text-base"
  />

  {/* Export PDF Button */}
  <div className="w-full sm:w-auto">
    <ExportPdf
      targetRef={pdfRef}
      fileName="TeacherTimeTable.pdf"
      buttonLabel="Download PDF"
      className="text-xs sm:text-sm"
    />
  </div>
</div>


      {/* Table */}
      <Table
           ref={pdfRef}
        Search={false}
        ImageContainerShow={false}
        Data={filteredData}
        headers={tableHeaders}
        dataKeys={tableDataKeys}
      />
    </>
  );
};

export default TeacherTimeTable;
