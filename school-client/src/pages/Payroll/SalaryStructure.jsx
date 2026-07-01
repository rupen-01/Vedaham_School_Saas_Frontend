// import { useState } from "react";
// import HeadingHeader from "../../components/common/HeadingHeader";
// import Table from "../../components/common/Table";
// import DeleteModal from "../../components/common/Delete";
// import ViewModal from "../../components/common/Viewmodel";
// import { useNavigate } from "react-router-dom";


// const ManageSalaryStructure = () => {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [deleteData, setDeleteData] = useState(null);
//   const [viewData, setViewData] = useState(null);
//   const navigate = useNavigate();

//   // Data from screenshot
//   const salaryStructures = [
//     { id: 1, salaryStructureName: "Clerk Structure", status: "Active" },
//     { id: 2, salaryStructureName: "Receptionist Structure", status: "Active" },
//     { id: 3, salaryStructureName: "Manager Structure", status: "In-Active" },
//   ];

//   // Apply filter + search
//   const filteredData = salaryStructures.filter((item) => {
//     const matchesFilter = filter === "All" || item.status === filter;
//     const matchesSearch = item.salaryStructureName
//       .toLowerCase()
//       .includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const tableHeaders = ["Salary Structure Name", "Status", "Action"];
//   const tableDataKeys = ["salaryStructureName", "status", "action"];

//   return (
//     <>
//       <div className="flex justify-between items-center mb-4">
//         <HeadingHeader
//           title="Salary Structure"
//           items={[
//             { label: "Payroll", path: "/" },
//             { label: "Salary Structure", path: "/payroll/salary-structure" },
//           ]}
//         />
//         <div className="text-right mb-4">
//           <button
//             onClick={() =>
//               navigate("/payroll/salary-structure/add")
//             }
//             className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
//           >
//             Add Salary Structure
//           </button>
//         </div>
//       </div>

//       <Table
//         Search={true}
//         ImageContainerShow={false}
//         filters={true}
//         Data={filteredData}
//         headers={tableHeaders}
//         dataKeys={tableDataKeys}
//         onDelete={(data) => setDeleteData(data)}
//         onView={(data) => setViewData(data)}
//       />

//       {/* Delete Modal */}
//       <DeleteModal
//         isOpen={!!deleteData}
//         onClose={() => setDeleteData(null)}
//         alertMessage="Are you sure you want to delete this salary structure?"
//       />

//       {/* View Modal */}
//       <ViewModal
//         isOpen={!!viewData}
//         onClose={() => setViewData(null)}
//         title="Salary Structure Details"
//         data={viewData}
//       />
//     </>
//   );
// };

// export default ManageSalaryStructure;
import { useState } from "react";
import HeadingHeader from "../../components/common/HeadingHeader";
import Table from "../../components/common/Table";
import DeleteModal from "../../components/common/Delete";
import ViewSalaryStructure from "./component/Viewsalarystructure";
import { useNavigate } from "react-router-dom";
const ManageSalaryStructure = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const navigate = useNavigate();

  const salaryStructures = [
    { id: 1, salaryStructureName: "Clerk Structure", status: "Active" },
    { id: 2, salaryStructureName: "Receptionist Structure", status: "Active" },
    { id: 3, salaryStructureName: "Manager Structure", status: "In-Active" },
  ];

  const filteredData = salaryStructures.filter((item) => {
    const matchesFilter = filter === "All" || item.status === filter;
    const matchesSearch = item.salaryStructureName
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tableHeaders = ["Salary Structure Name"];
  const tableDataKeys = ["salaryStructureName"];

  return (
    <>
    
         <div className="flex justify-between items-center mb-4">
      <HeadingHeader
          title="Salary Structure"
          items={[
            { label: "Payroll", path: "/" },
            { label: "Salary Structure", path: "/payroll/salary-structure" },
          ]}
        />
        <div className="text-right mb-4">
          <button
            onClick={() =>
              navigate("/payroll/salary-structure/add")
            }
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Add Salary Structure
          </button>
        </div>
      </div>

      <Table
        Search={true}
        ImageContainerShow={false}
        hasStatus={'status'}
        filters={true}
        Data={filteredData}
        headers={tableHeaders}
        dataKeys={tableDataKeys}
        onDelete={(data) => setDeleteData(data)}
        onView={(data) => setViewData(data)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this salary structure?"
      />

      {/* View Modal */}
     
        <ViewSalaryStructure    isOpen={!!viewData}
        onClose={() => setViewData(null)} data={viewData}    title="Salary Structure Details" />

    </>
  );
};

export default ManageSalaryStructure;
