// // import React, { useState } from "react"
// // import StatusBadge from "../../../components/common/StatusBadge";
// // import HeadingHeader from "../../../components/common/HeadingHeader";
// // import Card from "../../../components/common/Card";
// // import SlidingLabelSelect from "../../../components/common/SlidingSelect";
// // import Table from "../../../components/common/Table";

// // const ApproveLessonPlan = () => {
// //   const [filters, setFilters] = useState({ class: "", status: "" });

// //   const data = [
// //     {
// //       "Submitted By": "Ananya Sharma",
// //       Subject: "Mathematics",
// //       class: "6th",
// //       "Reviewer Name": "—",
// //       "Review Date": "—",
// //       Comment: "—",
// //       Status: <StatusBadge status="Pending" />,
// //       Action: <button className="text-indigo-600 underline text-sm">Review</button>,
// //     },
// //     {
// //       "Submitted By": "Raj Mehta",
// //       Subject: "Computer Science",
// //       class: "10th",
// //       "Reviewer Name": "Ram",
// //       "Review Date": "2025-07-10",
// //       Comment: "Well-structured content with relevant topics.",
// //       Status: <StatusBadge status="Approved" />,
// //       Action: <button className="text-indigo-600 underline text-sm">Review</button>,
// //     },
// //     {
// //       "Submitted By": "Priya Verma",
// //       Subject: "Environmental Sci.",
// //       class: "5th",
// //       "Reviewer Name": "—",
// //       "Review Date": "—",
// //       Comment: "—",
// //       Status: <StatusBadge status="Pending" />,
// //       Action: <button className="text-indigo-600 underline text-sm">Review</button>,
// //     },
// //     {
// //       "Submitted By": "Kunal Joshi",
// //       Subject: "History",
// //       class: "10th",
// //       "Reviewer Name": "Rajesh Sharma",
// //       "Review Date": "2025-07-12",
// //       Comment: "Minor changes suggested in unit 3 content.",
// //       Status: <StatusBadge status="Needs Changes" />,
// //       Action: <button className="text-indigo-600 underline text-sm">Review</button>,
// //     },
// //   ];

// //   const filteredData = data.filter((row) => {
// //     const matchesClass = !filters.class || row.class === filters.class;
// //     const matchesStatus =
// //       !filters.status || row.Status.props.status === filters.status;
// //     return matchesClass && matchesStatus;
// //   });

// //   return (
// //     <>
// //       <HeadingHeader
// //         title="Approve Lesson Plan"
// //         items={[
// //           { label: "Academic", path: "/academic" },
// //           { label: "Lesson Plan", path: "/academic/lesson-planning" },
// //           { label: "Approve Lesson Plan", path: "/academic/lesson-planning/approve" },
// //         ]}
// //       />

// //       <Card>
// //         {/* Filters */}
// //         <div className="flex gap-4 mb-4">
// //           <SlidingLabelSelect
// //             label="Class Filter"
// //             value={filters.class}
// //             onChange={(e) => setFilters({ ...filters, class: e.target.value })}
// //           >
// //             <option value="">All</option>
// //             <option value="6th">6th</option>
// //             <option value="10th">10th</option>
// //             <option value="5th">5th</option>
// //           </SlidingLabelSelect>

// //           <SlidingLabelSelect
// //             label="Status Filter"
// //             value={filters.status}
// //             onChange={(e) => setFilters({ ...filters, status: e.target.value })}
// //           >
// //             <option value="">All</option>
// //             <option value="Approved">Approved</option>
// //             <option value="Pending">Pending</option>
// //             <option value="Rejected">Rejected</option>
// //             <option value="Needs Changes">Needs Changes</option>
// //           </SlidingLabelSelect>
// //         </div>

// //         {/* Table */}
// //         <Table
// //           columns={[
// //             "Submitted By",
// //             "Subject",
// //             "class",
// //             "Reviewer Name",
// //             "Review Date",
// //             "Comment",
// //             "Status",
// //             "Action",
// //           ]}
// //           data={filteredData}
// //         />
// //       </Card>
// //     </>
// //   );
// // };

// // export default ApproveLessonPlan;
// import { useState } from "react";
// import HeadingHeader from "../../../components/common/HeadingHeader";
// import Table from "../../../components/common/Table";
// import DeleteModal from "../../../components/common/Delete";
// import ViewModal from "../../../components/common/Viewmodel";


// const ApproveLessonPlan = () => {
//   const [search, setSearch] = useState("");
//   const [deleteData, setDeleteData] = useState(null);
//   const [viewData, setViewData] = useState(null);

 
//   const lessonPlanConfig = {
//     table: {
//       headers: [
//         "Submitted By",
//         "Subject",
//         "Class",
//         "Reviewer Name",
//         "Review Date",
//         "Comment",
//         "Status",
//         "Action",
//       ],
//       keys: [
//         "submittedBy",
//         "subject",
//         "class",
//         "reviewerName",
//         "reviewDate",
//         "comment",
//         "status",
//         "action",
//       ],
//     },
//   };

// const lessonPlans = [
//     {
//       id: 1,
//       submittedBy: "Ananya Sharma",
//       subject: "Mathematics",
//       class: "6th",
//       reviewerName: "Vikas Patel",
//       reviewDate: "2025-07-15",
//       comment: "Lesson plan is pending for review.",
//       status: "Pending",
//     },
//     {
//       id: 2,
//       submittedBy: "Raj Mehta",
//       subject: "Computer Science",
//       class: "10th",
//       reviewerName: "Ram",
//       reviewDate: "2025-07-10",
//       comment: "Well-structured content with relevant topics.",
//       status: "Approved",
//     },
//     {
//       id: 3,
//       submittedBy: "Priya Verma",
//       subject: "Environmental Sci.",
//       class: "5th",
//       reviewerName: "Nisha Sharma",
//       reviewDate: "2025-07-13",
//       comment: "Content looks good but requires minor alignment fixes.",
//       status: "Pending",
//     },
//     {
//       id: 4,
//       submittedBy: "Kunal Joshi",
//       subject: "History",
//       class: "10th",
//       reviewerName: "Rajesh Sharma",
//       reviewDate: "2025-07-12",
//       comment: "Minor changes suggested in unit 3 content.",
//       status: "Needs Changes",
//     },
//   ];


//   const filteredLessonPlans = lessonPlans.filter(
//     (plan) =>
//       plan.submittedBy.toLowerCase().includes(search.toLowerCase()) ||
//       plan.subject.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <div className="flex justify-between items-center mb-4">
//         <HeadingHeader
//           title="Approve Lesson Plan"
//           items={[
//             { label: "Academic", path: "/" },
//             { label: "Lesson Planning", path: "/academics/lesson-planning" },
//             { label: "Approve Lesson Plan", path: "/academics/lesson-planning/approve" },
//           ]}
//         />
//       </div>

//       {/* Table */}
//       <Table
//       //  extraContent
//         Search={true}
//         filters={false} 
//         Data={filteredLessonPlans}
//         headers={lessonPlanConfig.table.headers}
//         dataKeys={lessonPlanConfig.table.keys}
//         onDelete={(data) => setDeleteData(data)}
//         onView={(data) => setViewData(data)}
//          extraContent
//       />

//       {/* Delete Modal */}
//       <DeleteModal
//         isOpen={!!deleteData}
//         onClose={() => setDeleteData(null)}
//         alertMessage="Are you sure you want to delete this lesson plan?"
//       />

//       {/* View Modal */}
//       <ViewModal
//         isOpen={!!viewData}
//         onClose={() => setViewData(null)}
//         title="View Lesson Plan"
//         data={viewData}
//       />
//     </>
//   );
// };

// export default ApproveLessonPlan;

// import React, { useState } from "react";
// import HeadingHeader from "../../../components/common/HeadingHeader";
// import Table from "../../../components/common/Table";
// import DeleteModal from "../../../components/common/Delete";
// import ReviewPlanModal from "./ReviewApproveLessonPlan";
// import { useState } from "react";
// import HeadingHeader from "../../../components/common/HeadingHeader";
// import Table from "../../../components/common/Table";
// import DeleteModal from "../../../components/common/Delete";
// import ReviewPlanModal from "./ReviewApproveLessonPlan";
// // import ViewApproveLesson from "./ViewApproveLesson"; // ✅ Import Review Modal

// const ApproveLessonPlan = () => {
//   const [search, setSearch] = useState("");
//   const [deleteData, setDeleteData] = useState(null);
//   const [reviewData, setReviewData] = useState(null); // ✅ For Review Modal

//   const lessonPlanConfig = {
//     table: {
//       headers: [
//         "Submitted By",
//         "Subject",
//         "Class",
//         "Reviewer Name",
//         "Review Date",
//         "Comment",
//         "Status",
//         "Action",
//       ],
//       keys: [
//         "submittedBy",
//         "subject",
//         "class",
//         "reviewerName",
//         "reviewDate",
//         "comment",
//         "status",
//         "action",
//       ],
//     },
//   };

//   const lessonPlans = [
//     {
//       id: 1,
//       submittedBy: "Ananya Sharma",
//       subject: "Mathematics",
//       class: "6th",
//       reviewerName: "Vikas Patel",
//       reviewDate: "2025-07-15",
//       comment: "Lesson plan is pending for review.",
//       status: "Pending",
//     },
//     {
//       id: 2,
//       submittedBy: "Raj Mehta",
//       subject: "Computer Science",
//       class: "10th",
//       reviewerName: "Ram",
//       reviewDate: "2025-07-10",
//       comment: "Well-structured content with relevant topics.",
//       status: "Approved",
//     },
//     {
//       id: 3,
//       submittedBy: "Priya Verma",
//       subject: "Environmental Sci.",
//       class: "5th",
//       reviewerName: "Nisha Sharma",
//       reviewDate: "2025-07-13",
//       comment: "Content looks good but requires minor alignment fixes.",
//       status: "Pending",
//     },
//     {
//       id: 4,
//       submittedBy: "Kunal Joshi",
//       subject: "History",
//       class: "10th",
//       reviewerName: "Rajesh Sharma",
//       reviewDate: "2025-07-12",
//       comment: "Minor changes suggested in unit 3 content.",
//       status: "Needs Changes",
//     },
//   ];

//   const filteredLessonPlans = lessonPlans.filter(
//     (plan) =>
//       plan.submittedBy.toLowerCase().includes(search.toLowerCase()) ||
//       plan.subject.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <div className="flex justify-between items-center mb-4">
//         <HeadingHeader
//           title="Approve Lesson Plan"
//           items={[
//             { label: "Academic", path: "/" },
//             { label: "Lesson Planning", path: "/academics/lesson-planning" },
//             { label: "Approve Lesson Plan", path: "/academics/lesson-planning/approve" },
//           ]}
//         />
//       </div>

//       {/* Table */}
//       <Table
//         Search={true}
//         filters={false}
//         Data={filteredLessonPlans}
//         headers={lessonPlanConfig.table.headers}
//         dataKeys={lessonPlanConfig.table.keys}
//         onDelete={(data) => setDeleteData(data)}
//         extraContent={(row) => (
//           <button
//             className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-600 cursor-pointer"
//             onClick={() => setReviewData(row)} // ✅ Opens Review Modal
//           >
//             Review
//           </button>
//         )}
//       />

//       {/* Delete Modal */}
//       <DeleteModal
//         isOpen={!!deleteData}
//         onClose={() => setDeleteData(null)}
//         alertMessage="Are you sure you want to delete this lesson plan?"
//       />

//     {/* //  View Approve Lesson Modal */}
//       <ReviewPlanModal
//         isOpen={!!reviewData}
//         onClose={() => setReviewData(null)}
//         data={reviewData}
//       />
//     </>
//   );
// };

// export default ApproveLessonPlan;
import { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ReviewPlanModal from "./ReviewApproveLessonPlan";

const ApproveLessonPlan = () => {
  const [search, setSearch] = useState("");
  const [deleteData, setDeleteData] = useState(null);
  const [reviewData, setReviewData] = useState(null); // ✅ For Review Modal

  const lessonPlanConfig = {
    table: {
      headers: [
        "Submitted By",
        "Subject",
        "Class",
        "Reviewer Name",
        "Review Date",
        "Comment",
    
      ],
      keys: [
        "submittedBy",
        "subject",
        "class",
        "reviewerName",
        "reviewDate",
        "comment",
    
      ],
    },
  };

  const lessonPlans = [
    {
      id: 1,
      submittedBy: "Ananya Sharma",
      subject: "Mathematics",
      class: "6th",
      reviewerName: "Vikas Patel",
      reviewDate: "2025-07-15",
      comment: "Lesson plan is pending for review.",
      status: "Pending",
    },
    {
      id: 2,
      submittedBy: "Raj Mehta",
      subject: "Computer Science",
      class: "10th",
      reviewerName: "Ram",
      reviewDate: "2025-07-10",
      comment: "Well-structured content with relevant topics.",
      status: "Approved",
    },
    {
      id: 3,
      submittedBy: "Priya Verma",
      subject: "Environmental Sci.",
      class: "5th",
      reviewerName: "Nisha Sharma",
      reviewDate: "2025-07-13",
      comment: "Content looks good but requires minor alignment fixes.",
      status: "Pending",
    },
    {
      id: 4,
      submittedBy: "Kunal Joshi",
      subject: "History",
      class: "10th",
      reviewerName: "Rajesh Sharma",
      reviewDate: "2025-07-12",
      comment: "Minor changes suggested in unit 3 content.",
      status: "Needs Changes",
    },
  ];

  const filteredLessonPlans = lessonPlans.filter(
    (plan) =>
      plan.submittedBy.toLowerCase().includes(search.toLowerCase()) ||
      plan.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <HeadingHeader
          title="Approve Lesson Plan"
          items={[
            { label: "Academic", path: "/" },
            { label: "Lesson Planning", path: "/academics/lesson-planning" },
            { label: "Approve Lesson Plan", path: "/academics/lesson-planning/approve" },
          ]}
        />
      </div>

      {/* Table */}
      <Table
        Search={true}
        // filters={false}
         ImageContainerShow={false}
        Data={filteredLessonPlans}
        headers={lessonPlanConfig.table.headers}
        dataKeys={lessonPlanConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
       hasStatus={"status"}
       extraColumns={['Review']}
 extraMethods={{
  'Review': (row) => {
    // Define colors for each status
    const statusColors = {
      Approved: "bg-green-100 text-green-700 border border-green-500 hover:bg-green-200",
      Pending: "bg-yellow-100 text-yellow-700 border border-yellow-500 hover:bg-yellow-200",
      Rejected: "bg-red-100 text-red-700 border border-red-500 hover:bg-red-200",
      "Needs Changes": "bg-orange-100 text-orange-700 border border-orange-500 hover:bg-orange-200",
      Default: "bg-gray-100 text-gray-600 border border-gray-400 hover:bg-gray-200"
    };

    // Pick correct color class based on row.status
    const buttonStyle = statusColors[row.status] || statusColors.Default;

    return (
      <button
        className={`px-4 py-1 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${buttonStyle}`}
        onClick={() => setReviewData(row)}
      >
        Review
      </button>
    );
  }
}}


  
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this lesson plan?"
      />

      {/* View Approve Lesson Modal */}
      <ReviewPlanModal
        isOpen={!!reviewData}
        onClose={() => setReviewData(null)}
        data={reviewData}
      />
    </>
  );
};

export default ApproveLessonPlan;

