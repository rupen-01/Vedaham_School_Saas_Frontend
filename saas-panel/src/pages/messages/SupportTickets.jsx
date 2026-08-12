import React, { useState, useMemo } from "react";
import {
  FiLifeBuoy,
  FiInbox,
  FiLoader,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiSearch,
  FiRefreshCcw,
  FiEye,
  FiUserPlus,
  FiXCircle,
  FiX,
  FiUser,
  FiMail,
  FiHome,
  FiTag,
  FiCalendar,
  FiPaperclip,
  FiMessageCircle,
  FiBarChart2,
} from "react-icons/fi";
 
// ------------------------------------------------------------------
// Dummy Data
// ------------------------------------------------------------------
const INSTITUTIONS = [
  "Green Valley Public School",
  "Sunrise International School",
  "Blue Bells High School",
  "St. Xavier's Academy",
  "Silver Oak School",
  "Maple Leaf Academy",
];
 
const CATEGORIES = [
  "Technical Issue",
  "Billing",
  "Login Problem",
  "Student Management",
  "Attendance",
  "Exams",
  "Reports",
  "Account Access",
  "Feature Request",
  "General Inquiry",
];
 
const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES = ["Open", "In Progress", "Resolved", "Closed"];
const STAFF_MEMBERS = [
  "Rohit Sinha",
  "Anjali Mehra",
  "Vikram Chauhan",
  "Sneha Patil",
  "Unassigned",
];
 
const today = new Date();
const daysAgo = (n) => {
  const date = new Date(today);
  date.setDate(date.getDate() - n);
  return date.toISOString().split("T")[0];
};
 
const INITIAL_TICKETS = [
  {
    id: "TCK-1001",
    institution: "Green Valley Public School",
    raisedBy: "Aarav Sharma",
    email: "aarav.sharma@gvps.edu",
    category: "Technical Issue",
    subject: "Unable to upload student report cards",
    description:
      "When trying to upload the report card PDF for grade 8 students, the system shows a timeout error after reaching 90% upload progress. This has happened consistently for the last three attempts.",
    priority: "High",
    status: "Open",
    createdDate: daysAgo(0),
    lastUpdated: daysAgo(0),
    assignedTo: "Unassigned",
    attachments: ["report_card_error.png"],
    conversation: [
      {
        author: "Aarav Sharma",
        message: "Attached a screenshot of the error for reference.",
        date: daysAgo(0),
      },
    ],
  },
  {
    id: "TCK-1002",
    institution: "Sunrise International School",
    raisedBy: "Neha Verma",
    email: "neha.verma@sunrise.edu",
    category: "Billing",
    subject: "Invoice amount mismatch for May billing cycle",
    description:
      "The invoice generated for May shows an amount that doesn't match our agreed subscription plan. We were charged for the Enterprise plan instead of Premium.",
    priority: "High",
    status: "In Progress",
    createdDate: daysAgo(2),
    lastUpdated: daysAgo(1),
    assignedTo: "Rohit Sinha",
    attachments: ["invoice_may_2024.pdf"],
    conversation: [
      {
        author: "Neha Verma",
        message: "Sharing the invoice PDF for your reference.",
        date: daysAgo(2),
      },
      {
        author: "Rohit Sinha",
        message:
          "Thanks for flagging this. We are checking with the billing team and will update the invoice shortly.",
        date: daysAgo(1),
      },
    ],
  },
  {
    id: "TCK-1003",
    institution: "Blue Bells High School",
    raisedBy: "Ritika Nair",
    email: "ritika.nair@bluebells.edu",
    category: "Login Problem",
    subject: "Teachers unable to log in after password reset",
    description:
      "Several teachers reset their passwords yesterday but are still receiving 'invalid credentials' errors when trying to log in through both the web portal and mobile app.",
    priority: "High",
    status: "Open",
    createdDate: daysAgo(1),
    lastUpdated: daysAgo(1),
    assignedTo: "Unassigned",
    attachments: [],
    conversation: [
      {
        author: "Ritika Nair",
        message: "This is affecting close to 12 teachers right now.",
        date: daysAgo(1),
      },
    ],
  },
  {
    id: "TCK-1004",
    institution: "St. Xavier's Academy",
    raisedBy: "Karan Mehta",
    email: "karan.mehta@stxaviers.edu",
    category: "Student Management",
    subject: "Duplicate student records after bulk import",
    description:
      "After importing the new admission list via CSV, around 20 students appear twice in the system with slightly different IDs. Need help merging or removing duplicates.",
    priority: "Medium",
    status: "In Progress",
    createdDate: daysAgo(4),
    lastUpdated: daysAgo(2),
    assignedTo: "Anjali Mehra",
    attachments: ["admission_list.csv"],
    conversation: [
      {
        author: "Karan Mehta",
        message: "Attaching the CSV file used for the import.",
        date: daysAgo(4),
      },
      {
        author: "Anjali Mehra",
        message:
          "We've identified the duplicate entries and are working on a safe merge script.",
        date: daysAgo(2),
      },
    ],
  },
  {
    id: "TCK-1005",
    institution: "Silver Oak School",
    raisedBy: "Simran Kaur",
    email: "simran.kaur@silveroak.edu",
    category: "Attendance",
    subject: "Attendance percentage calculating incorrectly",
    description:
      "The attendance dashboard shows 85% for a student who has been marked present for all working days this month. The calculation seems to be including holidays as absent days.",
    priority: "Medium",
    status: "Resolved",
    createdDate: daysAgo(7),
    lastUpdated: daysAgo(5),
    assignedTo: "Vikram Chauhan",
    attachments: [],
    conversation: [
      {
        author: "Simran Kaur",
        message: "Sharing the student ID for reference: SVK-2201.",
        date: daysAgo(7),
      },
      {
        author: "Vikram Chauhan",
        message:
          "We found the issue in the holiday calendar sync and have deployed a fix. Please confirm on your end.",
        date: daysAgo(5),
      },
    ],
  },
  {
    id: "TCK-1006",
    institution: "Maple Leaf Academy",
    raisedBy: "Devansh Gupta",
    email: "devansh.gupta@mapleleaf.edu",
    category: "Exams",
    subject: "Unable to publish exam results to parent portal",
    description:
      "Exam results for grade 10 have been finalized internally, but clicking 'Publish to Parents' does not trigger any notification or visibility change on the parent portal.",
    priority: "High",
    status: "Open",
    createdDate: daysAgo(0),
    lastUpdated: daysAgo(0),
    assignedTo: "Unassigned",
    attachments: ["grade10_results.xlsx"],
    conversation: [
      {
        author: "Devansh Gupta",
        message: "This is urgent as parents are expecting results today.",
        date: daysAgo(0),
      },
    ],
  },
  {
    id: "TCK-1007",
    institution: "Green Valley Public School",
    raisedBy: "Priya Desai",
    email: "priya.desai@gvps.edu",
    category: "Reports",
    subject: "Custom report builder not saving filters",
    description:
      "When creating a custom report with multiple filters applied, saving the report template discards the filters and only keeps the column selection.",
    priority: "Low",
    status: "In Progress",
    createdDate: daysAgo(3),
    lastUpdated: daysAgo(1),
    assignedTo: "Sneha Patil",
    attachments: [],
    conversation: [
      {
        author: "Priya Desai",
        message: "Happy to hop on a call if that helps debug faster.",
        date: daysAgo(3),
      },
      {
        author: "Sneha Patil",
        message: "Reproduced the issue on our end, working on a fix now.",
        date: daysAgo(1),
      },
    ],
  },
  {
    id: "TCK-1008",
    institution: "Sunrise International School",
    raisedBy: "Mohit Rao",
    email: "mohit.rao@sunrise.edu",
    category: "Account Access",
    subject: "Need additional admin account for finance team",
    description:
      "Our finance team has grown and we need one additional admin-level account restricted to billing and accounts modules only.",
    priority: "Low",
    status: "Resolved",
    createdDate: daysAgo(6),
    lastUpdated: daysAgo(4),
    assignedTo: "Rohit Sinha",
    attachments: [],
    conversation: [
      {
        author: "Mohit Rao",
        message: "The new team member's email is finance2@sunrise.edu.",
        date: daysAgo(6),
      },
      {
        author: "Rohit Sinha",
        message: "Account created with restricted access as requested.",
        date: daysAgo(4),
      },
    ],
  },
  {
    id: "TCK-1009",
    institution: "Blue Bells High School",
    raisedBy: "Ananya Iyer",
    email: "ananya.iyer@bluebells.edu",
    category: "Feature Request",
    subject: "Request for WhatsApp notification integration",
    description:
      "It would greatly help our parent communication if announcements and fee reminders could also be sent via WhatsApp in addition to email and SMS.",
    priority: "Low",
    status: "Open",
    createdDate: daysAgo(5),
    lastUpdated: daysAgo(5),
    assignedTo: "Unassigned",
    attachments: [],
    conversation: [
      {
        author: "Ananya Iyer",
        message: "Many parents in our community primarily use WhatsApp.",
        date: daysAgo(5),
      },
    ],
  },
  {
    id: "TCK-1010",
    institution: "St. Xavier's Academy",
    raisedBy: "Yash Malhotra",
    email: "yash.malhotra@stxaviers.edu",
    category: "General Inquiry",
    subject: "Clarification on data export policy",
    description:
      "We would like to understand the process and format available for exporting complete student and staff data before the end of the academic year.",
    priority: "Low",
    status: "Closed",
    createdDate: daysAgo(10),
    lastUpdated: daysAgo(8),
    assignedTo: "Anjali Mehra",
    attachments: [],
    conversation: [
      {
        author: "Yash Malhotra",
        message: "Looking for both CSV and PDF export options if possible.",
        date: daysAgo(10),
      },
      {
        author: "Anjali Mehra",
        message:
          "Shared the complete data export guide via email. Closing this ticket, feel free to reopen if needed.",
        date: daysAgo(8),
      },
    ],
  },
  {
    id: "TCK-1011",
    institution: "Silver Oak School",
    raisedBy: "Ishaan Kapoor",
    email: "ishaan.kapoor@silveroak.edu",
    category: "Technical Issue",
    subject: "Mobile app crashing on attendance screen",
    description:
      "The mobile app crashes consistently for teachers when they open the 'Mark Attendance' screen for classes with more than 40 students.",
    priority: "High",
    status: "In Progress",
    createdDate: daysAgo(1),
    lastUpdated: daysAgo(0),
    assignedTo: "Vikram Chauhan",
    attachments: ["crash_log.txt"],
    conversation: [
      {
        author: "Ishaan Kapoor",
        message: "Attaching the crash log captured from one teacher's device.",
        date: daysAgo(1),
      },
      {
        author: "Vikram Chauhan",
        message: "Thanks, our mobile team is reviewing the log now.",
        date: daysAgo(0),
      },
    ],
  },
  {
    id: "TCK-1012",
    institution: "Maple Leaf Academy",
    raisedBy: "Tanvi Joshi",
    email: "tanvi.joshi@mapleleaf.edu",
    category: "Billing",
    subject: "Refund request for duplicate payment",
    description:
      "Our accounts team accidentally paid the monthly subscription invoice twice. Requesting a refund or adjustment against next month's billing.",
    priority: "Medium",
    status: "Open",
    createdDate: daysAgo(0),
    lastUpdated: daysAgo(0),
    assignedTo: "Unassigned",
    attachments: ["payment_receipt_1.pdf", "payment_receipt_2.pdf"],
    conversation: [
      {
        author: "Tanvi Joshi",
        message: "Both payment receipts are attached for verification.",
        date: daysAgo(0),
      },
    ],
  },
  {
    id: "TCK-1013",
    institution: "Green Valley Public School",
    raisedBy: "Rahul Kulkarni",
    email: "rahul.kulkarni@gvps.edu",
    category: "Student Management",
    subject: "Unable to transfer student between sections",
    description:
      "Trying to move a student from Section A to Section B for grade 5 results in an error stating 'Section capacity exceeded' even though Section B has open seats.",
    priority: "Medium",
    status: "Resolved",
    createdDate: daysAgo(9),
    lastUpdated: daysAgo(6),
    assignedTo: "Sneha Patil",
    attachments: [],
    conversation: [
      {
        author: "Rahul Kulkarni",
        message: "Section B capacity is set to 40 and currently has 32 students.",
        date: daysAgo(9),
      },
      {
        author: "Sneha Patil",
        message:
          "Found a caching issue with capacity counts. Fixed and verified the transfer works now.",
        date: daysAgo(6),
      },
    ],
  },
  {
    id: "TCK-1014",
    institution: "Sunrise International School",
    raisedBy: "Ishita Bansal",
    email: "ishita.bansal@sunrise.edu",
    category: "Attendance",
    subject: "Biometric device not syncing with portal",
    description:
      "The biometric attendance device installed at the main gate stopped syncing data with the admin portal since yesterday morning.",
    priority: "High",
    status: "Open",
    createdDate: daysAgo(1),
    lastUpdated: daysAgo(1),
    assignedTo: "Unassigned",
    attachments: [],
    conversation: [
      {
        author: "Ishita Bansal",
        message: "The device shows a green light but no data appears in reports.",
        date: daysAgo(1),
      },
    ],
  },
];
 
const INSTITUTION_FILTER_OPTIONS = ["All Institutions", ...INSTITUTIONS];
const CATEGORY_FILTER_OPTIONS = ["All Categories", ...CATEGORIES];
const PRIORITY_FILTER_OPTIONS = ["All Priorities", ...PRIORITIES];
const STATUS_FILTER_OPTIONS = ["All Status", ...STATUSES];
const DATE_FILTER_OPTIONS = [
  "All Time",
  "Today",
  "Last 7 Days",
  "Last 30 Days",
];
 
// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------
const getPriorityBadgeClasses = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
 
const getStatusBadgeClasses = (status) => {
  switch (status) {
    case "Open":
      return "bg-blue-100 text-blue-700";
    case "In Progress":
      return "bg-orange-100 text-orange-700";
    case "Resolved":
      return "bg-green-100 text-green-700";
    case "Closed":
      return "bg-gray-200 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
 
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
 
const isWithinDateRange = (dateString, range) => {
  if (range === "All Time") return true;
  const ticketDate = new Date(dateString);
  const diffDays = Math.floor((today - ticketDate) / (1000 * 60 * 60 * 24));
 
  if (range === "Today") return diffDays === 0;
  if (range === "Last 7 Days") return diffDays <= 7;
  if (range === "Last 30 Days") return diffDays <= 30;
  return true;
};
 
const getMostCommonCategory = (tickets) => {
  const counts = {};
  tickets.forEach((t) => {
    counts[t.category] = (counts[t.category] || 0) + 1;
  });
  let topCategory = "—";
  let maxCount = 0;
  Object.entries(counts).forEach(([category, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topCategory = category;
    }
  });
  return topCategory;
};
 
// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const SupportTickets = () => {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
 
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [institutionFilter, setInstitutionFilter] = useState("All Institutions");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [dateFilter, setDateFilter] = useState("All Time");
 
  // Modals
  const [viewTicket, setViewTicket] = useState(null);
  const [assignTarget, setAssignTarget] = useState(null);
  const [selectedAssignee, setSelectedAssignee] = useState("");
 
  // --------------------------------------------------------------
  // Filtering
  // --------------------------------------------------------------
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.raisedBy.toLowerCase().includes(searchTerm.toLowerCase());
 
      const matchesInstitution =
        institutionFilter === "All Institutions" ||
        ticket.institution === institutionFilter;
 
      const matchesPriority =
        priorityFilter === "All Priorities" || ticket.priority === priorityFilter;
 
      const matchesStatus =
        statusFilter === "All Status" || ticket.status === statusFilter;
 
      const matchesCategory =
        categoryFilter === "All Categories" || ticket.category === categoryFilter;
 
      const matchesDate = isWithinDateRange(ticket.createdDate, dateFilter);
 
      return (
        matchesSearch &&
        matchesInstitution &&
        matchesPriority &&
        matchesStatus &&
        matchesCategory &&
        matchesDate
      );
    });
  }, [
    tickets,
    searchTerm,
    institutionFilter,
    priorityFilter,
    statusFilter,
    categoryFilter,
    dateFilter,
  ]);
 
  const resetFilters = () => {
    setSearchTerm("");
    setInstitutionFilter("All Institutions");
    setPriorityFilter("All Priorities");
    setStatusFilter("All Status");
    setCategoryFilter("All Categories");
    setDateFilter("All Time");
  };
 
  // --------------------------------------------------------------
  // Statistics
  // --------------------------------------------------------------
  const totalTickets = tickets.length;
  const openCount = tickets.filter((t) => t.status === "Open").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;
  const highPriorityCount = tickets.filter((t) => t.priority === "High").length;
  const averageResolutionTime = "6.4 hrs";
 
  const statCards = [
    {
      label: "Total Tickets",
      value: totalTickets,
      description: "All support requests",
      icon: FiLifeBuoy,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Open Tickets",
      value: openCount,
      description: "Awaiting first response",
      icon: FiInbox,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "In Progress",
      value: inProgressCount,
      description: "Currently being worked on",
      icon: FiLoader,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Resolved",
      value: resolvedCount,
      description: "Successfully closed out",
      icon: FiCheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "High Priority",
      value: highPriorityCount,
      description: "Needs urgent attention",
      icon: FiAlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      label: "Avg. Resolution Time",
      value: averageResolutionTime,
      description: "Across all resolved tickets",
      icon: FiClock,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
  ];
 
  // --------------------------------------------------------------
  // Quick Summary
  // --------------------------------------------------------------
  const mostCommonCategory = getMostCommonCategory(tickets);
  const createdTodayCount = tickets.filter(
    (t) => isWithinDateRange(t.createdDate, "Today")
  ).length;
  const resolvedTodayCount = tickets.filter(
    (t) =>
      (t.status === "Resolved" || t.status === "Closed") &&
      isWithinDateRange(t.lastUpdated, "Today")
  ).length;
  const averageResponseTime = "1.8 hrs";
 
  // --------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------
  const openAssignModal = (ticket) => {
    setAssignTarget(ticket);
    setSelectedAssignee(
      ticket.assignedTo === "Unassigned" ? "" : ticket.assignedTo
    );
  };
 
  const confirmAssign = () => {
    if (!assignTarget || !selectedAssignee) return;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === assignTarget.id
          ? {
              ...t,
              assignedTo: selectedAssignee,
              status: t.status === "Open" ? "In Progress" : t.status,
              lastUpdated: today.toISOString().split("T")[0],
            }
          : t
      )
    );
    setAssignTarget(null);
    setSelectedAssignee("");
  };
 
  const closeTicket = (ticket) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticket.id
          ? {
              ...t,
              status: "Closed",
              lastUpdated: today.toISOString().split("T")[0],
            }
          : t
      )
    );
  };
 
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* -------------------------------------------------- */}
      {/* Page Header */}
      {/* -------------------------------------------------- */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Support Tickets
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Track, prioritize, and resolve support requests from institutions.
        </p>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Statistics Cards */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <div
                className={`${card.iconBg} ${card.iconColor} w-10 h-10 rounded-xl flex items-center justify-center`}
              >
                <Icon size={19} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-4">
                {card.value}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
              <p className="text-xs text-gray-400 mt-1">{card.description}</p>
            </div>
          );
        })}
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Quick Summary Panel */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <FiBarChart2 className="text-purple-600" size={18} />
          Quick Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/60">
            <div className="bg-purple-100 text-purple-600 p-2.5 rounded-lg">
              <FiTag size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Most Common Category</p>
              <p className="text-sm font-semibold text-gray-800">
                {mostCommonCategory}
              </p>
            </div>
          </div>
 
          <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/60">
            <div className="bg-blue-100 text-blue-600 p-2.5 rounded-lg">
              <FiInbox size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Tickets Created Today</p>
              <p className="text-sm font-semibold text-gray-800">
                {createdTodayCount}
              </p>
            </div>
          </div>
 
          <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50/60">
            <div className="bg-green-100 text-green-600 p-2.5 rounded-lg">
              <FiCheckCircle size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Tickets Resolved Today</p>
              <p className="text-sm font-semibold text-gray-800">
                {resolvedTodayCount}
              </p>
            </div>
          </div>
 
          <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/60">
            <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-lg">
              <FiClock size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Avg. Response Time</p>
              <p className="text-sm font-semibold text-gray-800">
                {averageResponseTime}
              </p>
            </div>
          </div>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Filters */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Search */}
          <div className="relative xl:col-span-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ticket, ID or requester..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
 
          {/* Institution */}
          <select
            value={institutionFilter}
            onChange={(e) => setInstitutionFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {INSTITUTION_FILTER_OPTIONS.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </select>
 
          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {PRIORITY_FILTER_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
 
          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {STATUS_FILTER_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
 
          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {CATEGORY_FILTER_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
 
          {/* Date */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {DATE_FILTER_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
 
        <div className="flex justify-end mt-4">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-white border border-purple-200 hover:bg-purple-600 px-4 py-2 rounded-xl transition-colors duration-200"
          >
            <FiRefreshCcw size={14} />
            Reset Filters
          </button>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Support Ticket Table */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Ticket ID
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Institution
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Raised By
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Category
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Subject
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Priority
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Created Date
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Assigned To
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-purple-50/40 transition-colors duration-150"
                  >
                    <td className="px-5 py-4 font-medium text-purple-600 whitespace-nowrap">
                      {ticket.id}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {ticket.institution}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-gray-800 font-medium">{ticket.raisedBy}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-gray-700 truncate">{ticket.subject}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityBadgeClasses(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadgeClasses(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(ticket.createdDate)}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {ticket.assignedTo}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setViewTicket(ticket)}
                          title="View"
                          className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-200"
                        >
                          <FiEye size={14} />
                        </button>
                        <button
                          onClick={() => openAssignModal(ticket)}
                          title="Assign"
                          disabled={ticket.status === "Closed"}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-50 disabled:hover:text-blue-600"
                        >
                          <FiUserPlus size={14} />
                        </button>
                        <button
                          onClick={() => closeTicket(ticket)}
                          title="Close"
                          disabled={ticket.status === "Closed"}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-50 disabled:hover:text-red-600"
                        >
                          <FiXCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="bg-purple-50 text-purple-400 p-4 rounded-full mb-3">
                        <FiInbox size={26} />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        No support tickets found
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Try adjusting your filters to see more results.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
 
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Ticket Details Modal */}
      {/* -------------------------------------------------- */}
      {viewTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {viewTicket.id}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{viewTicket.subject}</p>
              </div>
              <button
                onClick={() => setViewTicket(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>
 
            {/* Modal Body */}
            <div className="px-6 py-5 space-y-5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getPriorityBadgeClasses(
                    viewTicket.priority
                  )}`}
                >
                  {viewTicket.priority} Priority
                </span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadgeClasses(
                    viewTicket.status
                  )}`}
                >
                  {viewTicket.status}
                </span>
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiUser size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Raised By</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewTicket.raisedBy}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiMail size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-800 break-all">
                      {viewTicket.email}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiHome size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Institution</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewTicket.institution}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiTag size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Category</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewTicket.category}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiCalendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Created Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewTicket.createdDate)}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiClock size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Last Updated</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewTicket.lastUpdated)}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiUserPlus size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Assigned To</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewTicket.assignedTo}
                    </p>
                  </div>
                </div>
              </div>
 
              <div>
                <p className="text-xs text-gray-400 mb-1">Full Description</p>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
                  {viewTicket.description}
                </p>
              </div>
 
              {/* Attachments */}
              <div>
                <p className="text-xs text-gray-400 mb-2">Attachments</p>
                {viewTicket.attachments.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {viewTicket.attachments.map((file, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg"
                      >
                        <FiPaperclip size={12} />
                        {file}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    No attachments added to this ticket.
                  </p>
                )}
              </div>
 
              {/* Conversation Timeline */}
              <div>
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1.5">
                  <FiMessageCircle size={13} />
                  Conversation Timeline
                </p>
                <div className="space-y-3">
                  {viewTicket.conversation.map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 border-l-2 border-purple-200 pl-4 py-1"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-800">
                            {entry.author}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(entry.date)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {entry.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
 
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewTicket(null)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* -------------------------------------------------- */}
      {/* Assign Ticket Modal */}
      {/* -------------------------------------------------- */}
      {assignTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Assign Ticket
              </h3>
              <button
                onClick={() => setAssignTarget(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Assign{" "}
              <span className="font-medium text-gray-700">
                {assignTarget.id}
              </span>{" "}
              to a support staff member.
            </p>
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="" disabled>
                Select staff member
              </option>
              {STAFF_MEMBERS.filter((s) => s !== "Unassigned").map((staff) => (
                <option key={staff} value={staff}>
                  {staff}
                </option>
              ))}
            </select>
 
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setAssignTarget(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssign}
                disabled={!selectedAssignee}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default SupportTickets;