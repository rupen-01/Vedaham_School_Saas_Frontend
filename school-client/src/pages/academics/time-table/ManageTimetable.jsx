import { useState } from "react";
import Table from "../../../components/common/Table";
import HeadingHeader from "../../../components/common/HeadingHeader";
import DeleteModal from "../../../components/common/Delete";
import { Download } from "lucide-react";
import ExportExcel from "../../../components/common/ExecelButton";

const ManageTimeTable = () => {
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [deleteData, setDeleteData] = useState(null);

  // Dummy Data (from reference screenshot)
  const timeTables = [
    {
      id: 1,
      name: "Class1A_TT",
      class: "1",
      section: "A",
      weekDays: "Mon, Tue, Wed, Thu, Fri",
    },
    {
      id: 2,
      name: "Class1B_TT",
      class: "1",
      section: "B",
      weekDays: "Mon, Tue, Wed, Fri",
    },
    {
      id: 3,
      name: "Class4B_TT",
      class: "4",
      section: "B",
      weekDays: "Tue, Wed, Fri, Sat",
    },
  ];

  // Filters
  const filteredTimeTables = timeTables.filter((tt) => {
    const matchesSearch = tt.name.toLowerCase().includes(search.toLowerCase());
    const matchesClass = filterClass === "All" || tt.class === filterClass;
    return matchesSearch && matchesClass;
  });

  // Table headers
  const tableHeaders = [
    "Time Table Name",
    "Class",
    "Section",
    "Week Working Days",

  ];

  const tableDataKeys = [
    "name",
    "class",
    "section",
    "weekDays",
  
  ];

  return (
    <>
      {/* Header */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 w-full">
  <div className="flex-1 min-w-0">
    <HeadingHeader
      title="Manage Time Table"
      items={[
        { label: "Academic", path: "/academic" },
        { label: "Time Table", path: "/academic/timetable" },
        { label: "Manage Time Table", path: "/academic/timetable/manage" },
      ]}
      className="text-sm sm:text-base"
    />
  </div>

  <div className="w-full ml-3 sm:w-auto flex-shrink-0">
    <ExportExcel
      data={timeTables}
      fileName="Timetable.xlsx"
      className="w-full sm:w-auto text-xs sm:text-sm"
    />
  </div>
</div>


      {/* Table Component */}
      <Table
        Search={true}
         ImageContainerShow={false}
        Data={filteredTimeTables}
        headers={tableHeaders}
        dataKeys={tableDataKeys}

        onSearch={setSearch}
        onClassFilter={setFilterClass}
        onStatusFilter={setFilterStatus}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this timetable?"
      />
    </>
  );
};

export default ManageTimeTable;
