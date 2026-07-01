import React from "react";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import Card from "../../../../components/common/Card";
import BackButton from "../../../../components/common/BackButton";
import { FaFilePdf } from "react-icons/fa";
import BorderedFieldset from "../../../../components/common/BorderedFieldset";
import { useState } from "react";
const ViewLeaveSummary = ({ summaryData }) => {
  const {
    staffName = "Ravi Sharma",
    department = "IT",
    role = "Teacher",
    contact = "1234567890",
    totalLeaves = 10,
    leavesTaken = 8,
    remainingLeaves = 2,
    leaveDistribution = [
      { type: "Medical", total: 2, remaining: 1, taken: 1 },
      { type: "Casual", total: 2, remaining: 1, taken: 1 },
      { type: "Sick", total: 2, remaining: 1, taken: 1 },
    ],
    leaveHistory = [
      {
        type: "Medical Leave",
        date: "05/07/2024",
        status: "Approved",
      },
      {
        type: "Medical Leave",
        date: "05/07/2024",
        status: "Rejected",
        rejectedBy: "Ravi Sharma",
        rejectedDate: "05/07/2024",
        fromDate: "05/07/2024",
        toDate: "05/07/2024",
        reason:
          "I am requesting a medical leave for 05/07/2024 due to a scheduled doctor's appointment for a recurring health issue that requires immediate attention...",
        rejectionReason:
          "I am requesting a medical leave for 05/07/2024 due to a scheduled doctor's appointment for a recurring health issue that requires immediate attention.",
        attachmentUrl: "#",
      },
    ],
  } = summaryData || {};

  const handleExportPDF = () => {
    console.log("Exporting PDF...");
    // PDF logic here
  };

  const statusColors = {
    Approved: "bg-green-100 text-green-700 border-green-500",
    Rejected: "bg-red-100 text-red-700 border-red-500",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-500",
  };


  return (
    <>
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <HeadingHeader
          title="View Leave Summary"
          items={[
            { label: "Staff", path: "/staff" },
            { label: "Leave Management", path: "/staff/leave" },
            { label: "Leave Summary", path: "/staff/leave/summary" },
            {
              label: "View Leave Summary",
              path: "/staff/leave-management/summary-view",
            },
          ]}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FaFilePdf />
            Export PDF
          </button>
          <BackButton back="/staff/leave-management/summary" />
        </div>
      </div>

      {/* Staff Info Card */}
      <Card>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <p><span className="font-semibold">Staff Name :</span> {staffName}</p>
          <p><span className="font-semibold">Department :</span> {department}</p>
          <p><span className="font-semibold">Role :</span> {role}</p>
          <p><span className="font-semibold">Contact :</span> {contact}</p>
          <p><span className="font-semibold">Total Leaves :</span> {totalLeaves}</p>
          <p><span className="font-semibold">Leaves Taken :</span> {leavesTaken}</p>
          <p><span className="font-semibold">Remaining :</span> {remainingLeaves}</p>
        </div>
  

      {/* Leave Distribution */}

      <BorderedFieldset legend='Leaves Distribution'>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Leave Type</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Remaining</th>
              <th className="border px-4 py-2">Leaves Taken</th>
            </tr>
          </thead>
          <tbody>
            {leaveDistribution.map((leave, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{leave.type}</td>
                <td className="border px-4 py-2 text-center">{leave.total}</td>
                <td className="border px-4 py-2 text-center">{leave.remaining}</td>
                <td className="border px-4 py-2 text-center">{leave.taken}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </BorderedFieldset>
<BorderedFieldset legend="Leaves History">
  {leaveHistory.map((history, idx) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div key={idx} className="mb-4 border rounded">
        {/* Header row with toggle */}
        <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b">
          <p className="font-semibold">
            {history.type} [{history.date}] <span
              className={`px-3 py-1 text-sm rounded-4xl border ${statusColors[history.status]}`}
            >
              {history.status}
            </span>
          </p>

          <div className="flex items-center gap-3">
           
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xl font-bold focus:outline-none"
            >
              {expanded ? "−" : "+"}
            </button>
          </div>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="p-4 space-y-3">
            {history.status === "Rejected" && (
              <>
                <div className="flex justify-between">
                  <p>
                    <span className="font-semibold">Rejected By :</span>{" "}
                    {history.rejectedBy}
                  </p>
                  <p>
                    <span className="font-semibold">Rejected Date :</span>{" "}
                    {history.rejectedDate}
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-between">
              <p>
                <span className="font-semibold">From Date :</span>{" "}
                {history.fromDate}
              </p>
              <p>
                <span className="font-semibold">To Date :</span>{" "}
                {history.toDate}
              </p>
            </div>

            <div>
              <p className="font-semibold mb-1">Subject (Leave Type) :</p>
              <p className="text-gray-700">{history.reason}</p>
            </div>

            {history.status === "Rejected" && (
            
                <BorderedFieldset legend={'Reason Of Rejection '}>
                <p className="text-gray-700">{history.rejectionReason}</p>
                </BorderedFieldset>
    
            )}

            {history.attachmentUrl && (
              <p>
                <span className="font-semibold">Attachment:</span>{" "}
                <a
                  href={history.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View Attachment
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    );
  })}
</BorderedFieldset>
      </Card>
    </>
  );
};

export default ViewLeaveSummary;
// import React from "react";
// import HeadingHeader from "../../../../components/common/HeadingHeader";
// import Card from "../../../../components/common/Card";
// import BackButton from "../../../../components/common/BackButton";
// import { FaFilePdf } from "react-icons/fa";
// import BorderedFieldset from "../../../../components/common/BorderedFieldset";
// import { useState } from "react";

// import { FaPlus, FaMinus } from "react-icons/fa"; // icons for expand/collapse

// const ViewLeaveSummary = ({ summaryData }) => {
//   const {
//     staffName = "Ravi Sharma",
//     department = "IT",
//     role = "Teacher",
//     contact = "1234567890",
//     totalLeaves = 10,
//     leavesTaken = 8,
//     remainingLeaves = 2,
//     leaveDistribution = [
//       { type: "Medical", total: 2, remaining: 1, taken: 1 },
//       { type: "Casual", total: 2, remaining: 1, taken: 1 },
//       { type: "Sick", total: 2, remaining: 1, taken: 1 },
//     ],
//     leaveHistory = [
//       {
//         type: "Medical Leave",
//         date: "05/07/2024",
//         status: "Approved",
//       },
//       {
//         type: "Medical Leave",
//         date: "05/07/2024",
//         status: "Rejected",
//         rejectedBy: "Ravi Sharma",
//         rejectedDate: "05/07/2024",
//         fromDate: "05/07/2024",
//         toDate: "05/07/2024",
//         reason:
//           "I am requesting a medical leave for 05/07/2024 due to a scheduled doctor's appointment for a recurring health issue that requires immediate attention...",
//         rejectionReason:
//           "I am requesting a medical leave for 05/07/2024 due to a scheduled doctor's appointment for a recurring health issue that requires immediate attention.",
//         attachmentUrl: "#",
//       },
//     ],
//   } = summaryData || {};

//   const handleExportPDF = () => {
//     console.log("Exporting PDF...");
//     // PDF logic here
//   };

//   const statusColors = {
//     Approved: "bg-green-100 text-green-700 border-green-500",
//     Rejected: "bg-red-100 text-red-700 border-red-500",
//     Pending: "bg-yellow-100 text-yellow-700 border-yellow-500",
//   };
// const [expandedIndex, setExpandedIndex] = useState(null);

//   return (
//     <>
//       {/* Header Row */}
//       <div className="flex justify-between items-center mb-4">
//         <HeadingHeader
//           title="View Leave Summary"
//           items={[
//             { label: "Staff", path: "/staff" },
//             { label: "Leave Management", path: "/staff/leave" },
//             { label: "Leave Summary", path: "/staff/leave/summary" },
//             {
//               label: "View Leave Summary",
//               path: "/staff/leave-management/summary-view",
//             },
//           ]}
//         />

//         {/* Action Buttons */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={handleExportPDF}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
//           >
//             <FaFilePdf />
//             Export PDF
//           </button>
//           <BackButton back="/staff/leave-management/leave-summary" />
//         </div>
//       </div>

//       {/* Staff Info Card */}
//       <Card>
//         <div className="grid md:grid-cols-3 gap-4 mb-4">
//           <p><span className="font-semibold">Staff Name :</span> {staffName}</p>
//           <p><span className="font-semibold">Department :</span> {department}</p>
//           <p><span className="font-semibold">Role :</span> {role}</p>
//           <p><span className="font-semibold">Contact :</span> {contact}</p>
//           <p><span className="font-semibold">Total Leaves :</span> {totalLeaves}</p>
//           <p><span className="font-semibold">Leaves Taken :</span> {leavesTaken}</p>
//           <p><span className="font-semibold">Remaining :</span> {remainingLeaves}</p>
//         </div>
  

//       {/* Leave Distribution */}

//       <BorderedFieldset legend='Leaves Distribution'>
//         <table className="w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2 text-left">Leave Type</th>
//               <th className="border px-4 py-2">Total</th>
//               <th className="border px-4 py-2">Remaining</th>
//               <th className="border px-4 py-2">Leaves Taken</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaveDistribution.map((leave, idx) => (
//               <tr key={idx}>
//                 <td className="border px-4 py-2">{leave.type}</td>
//                 <td className="border px-4 py-2 text-center">{leave.total}</td>
//                 <td className="border px-4 py-2 text-center">{leave.remaining}</td>
//                 <td className="border px-4 py-2 text-center">{leave.taken}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         </BorderedFieldset>
//   <BorderedFieldset legend='Leaves History'>
       
//         {/* Leave History Section */}
//         {leaveHistory.map((history, idx) => (
//           <div key={idx} className="mb-4 border rounded">
//             {/* Header */}
//             <div
//               className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b cursor-pointer"
//               onClick={() => handleToggle(idx)}
//             >
//               <p className="font-semibold">
//                 {history.type} [{history.date}]
//               </p>
//               <div className="flex items-center gap-3">
//                 <span
//                   className={`px-3 py-1 text-sm rounded border ${statusColors[history.status]}`}
//                 >
//                   {history.status}
//                 </span>
//                 {expandedIndex === idx ? <FaMinus /> : <FaPlus />}
//               </div>
//             </div>

//             {/* Expanded Content */}
//             {expandedIndex === idx && (
//               <div className="p-4 space-y-3">
//                 {history.status === "Rejected" && (
//                   <div className="flex justify-between">
//                     <p>
//                       <span className="font-semibold">Rejected By :</span>{" "}
//                       {history.rejectedBy}
//                     </p>
//                     <p>
//                       <span className="font-semibold">Rejected Date :</span>{" "}
//                       {history.rejectedDate}
//                     </p>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <p>
//                     <span className="font-semibold">From Date :</span>{" "}
//                     {history.fromDate}
//                   </p>
//                   <p>
//                     <span className="font-semibold">To Date :</span>{" "}
//                     {history.toDate}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="font-semibold mb-1">Subject (Leave Type) :</p>
//                   <p className="text-gray-700">{history.reason}</p>
//                 </div>

//                 {history.status === "Rejected" && (
//                   <div>
//                     <p className="font-semibold mb-1">Reason Of Rejection :</p>
//                     <p className="text-gray-700">{history.rejectionReason}</p>
//                   </div>
//                 )}

//                 {history.attachmentUrl && (
//                   <p>
//                     <span className="font-semibold">Attachment:</span>{" "}
//                     <a
//                       href={history.attachmentUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-indigo-600 hover:underline"
//                     >
//                       View Attachment
//                     </a>
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//           </BorderedFieldset>
//       </Card>
//     </>
//   );
// };

// export default ViewLeaveSummary;
