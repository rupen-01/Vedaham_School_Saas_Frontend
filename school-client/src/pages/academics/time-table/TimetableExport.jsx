import { useRef, useState } from "react";
import Table from "../../../components/common/Table";
import HeadingHeader from "../../../components/common/HeadingHeader";
import { Download } from "lucide-react";
import ExportPdf from "../../../components/common/ExportPdf";

const ViewTimeTable = () => {
  const [className] = useState("6th");
  const [section] = useState("A");
  const pdfRef = useRef();
  // Dummy timetable data (grid format)
  const timeTableData = [
    {
      timeSlot: "8:00 AM – 8:45 AM",
      period: "Period 1",
      Mon: "Sub 1",
      Tue: "—",
      Wed: "Sub 1",
      Thu: "Sub 1",
      Fri: "—",
    },
    {
      timeSlot: "9:00 AM – 9:45 AM",
      period: "Period 2",
      Mon: "Sub 2",
      Tue: "Sub 2",
      Wed: "Sub 2",
      Thu: "Sub 2",
      Fri: "Sub 2",
    },
    {
      timeSlot: "10:00 AM – 10:15 AM",
      period: "Break",
      Mon: "Lunch Break",
      Tue: "Lunch Break",
      Wed: "Lunch Break",
      Thu: "Lunch Break",
      Fri: "Lunch Break",
    },
    {
      timeSlot: "11:00 AM – 12:30 PM",
      period: "Period 4",
      Mon: "Sub 3",
      Tue: "Sub 3",
      Wed: "—",
      Thu: "Sub 3",
      Fri: "Sub 3",
    },
  ];

  // Table headers and keys
  const tableHeaders = [
    "Time Slot",
    "Period",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ];

  const tableDataKeys = [
    "timeSlot",
    "period",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ];

  return (
    <>
{/* Class and Section Info */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
  {/* Header */}
  <HeadingHeader
    title="Time Table Name"
    items={[
      { label: "Academic", path: "/academic" },
      { label: "Time Table", path: "/academic/timetable" },
      { label: "View Time Table", path: "/academic/timetable/view" },
    ]}
    className="text-sm sm:text-base"
  />

  {/* Reusable Export PDF Button */}
  <div className=" sm:w-auto">
    <ExportPdf      targetRef={pdfRef}          // Pass the ref of timetable content
      fileName="TimeTable.pdf"    // File name
      buttonLabel="Export PDF"    // Button text
      className="w-full sm:w-auto text-xs sm:text-sm"
    />
  </div>
</div>


      {/* Timetable Table */} 
    
        <Table
          Search={false}
          ImageContainerShow={false}
          Data={timeTableData}
          headers={tableHeaders}
          dataKeys={tableDataKeys}
          customRender={{
            period: (row) =>
              row.period === "Break" ? (
                <span className="text-gray-500 italic">{row.period}</span>
              ) : (
                row.period
              ),
          }}
        />
  
    </>
  );
};

export default ViewTimeTable;
