
import React, { useState, useMemo } from "react";
import {
  FiUsers,
  FiUserPlus,
  FiPhoneCall,
  FiCheckCircle,
  FiAward,
  FiXCircle,
  FiDownload,
  FiPlus,
  FiSearch,
  FiRefreshCcw,
  FiEye,
  FiEdit3,
  FiUserCheck,
  FiRefreshCw,
  FiTrash2,
  FiX,
  FiHome,
  FiUser,
  FiMapPin,
  FiTag,
  FiCalendar,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
  FiInbox,
  FiClock,
  FiSend,
  FiFlag,
  FiActivity,
  FiGlobe,
  FiMail,
  FiPhone,
} from "react-icons/fi";
 
// ------------------------------------------------------------------
// Static Options
// ------------------------------------------------------------------
const SCHOOL_TYPES = ["Private", "Public", "International", "Government"];
const BOARDS = ["CBSE", "ICSE", "State Board", "IB"];
const LEAD_SOURCES = [
  "Website",
  "Referral",
  "Advertisement",
  "Cold Call",
  "Social Media",
  "Event",
];
const SALES_EXECUTIVES = [
  "Rohit Sinha",
  "Anjali Mehra",
  "Vikram Chauhan",
  "Sneha Patil",
  "Karan Bedi",
];
const PRIORITIES = ["High", "Medium", "Low"];
const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Demo Scheduled",
  "Proposal Sent",
  "Negotiation",
  "Converted",
  "Lost",
];
const INTERESTED_MODULES = [
  "Student Management",
  "Attendance",
  "Fees",
  "LMS",
  "Exams",
  "HRMS",
  "Transport",
  "Library",
];
 
const STATUS_FILTER_OPTIONS = ["All Status", ...LEAD_STATUSES];
const PRIORITY_FILTER_OPTIONS = ["All Priorities", ...PRIORITIES];
const SOURCE_FILTER_OPTIONS = ["All Sources", ...LEAD_SOURCES];
const EXECUTIVE_FILTER_OPTIONS = ["All Executives", ...SALES_EXECUTIVES];
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];
 
// ------------------------------------------------------------------
// Dummy Data
// ------------------------------------------------------------------
const today = new Date();
const daysAgo = (n) => {
  const date = new Date(today);
  date.setDate(date.getDate() - n);
  return date.toISOString().split("T")[0];
};
const daysFromNow = (n) => {
  const date = new Date(today);
  date.setDate(date.getDate() + n);
  return date.toISOString().split("T")[0];
};
 
const SCHOOL_NAMES = [
  "Green Valley Public School",
  "Sunrise International School",
  "Blue Bells High School",
  "St. Xavier's Academy",
  "Silver Oak School",
  "Maple Leaf Academy",
  "Horizon Global School",
  "Crescent Public School",
  "Riverside Convent School",
  "Oakwood International",
  "Pinewood High School",
  "Emerald Heights School",
  "Cedar Grove School",
  "Lotus Valley School",
  "Sapphire International",
  "Willow Creek Academy",
  "Newton Public School",
  "Everest Global School",
];
const CONTACT_NAMES = [
  "Rajesh Kumar",
  "Meena Iyer",
  "Vikas Rathore",
  "Sarah Thomas",
  "Anil Bhardwaj",
  "Farida Sheikh",
  "Daniel Fernandes",
  "Geeta Nair",
  "Priya Desai",
  "Yash Malhotra",
  "Ishaan Kapoor",
  "Tanvi Joshi",
  "Rahul Kulkarni",
  "Ishita Bansal",
  "Karan Mehta",
  "Simran Kaur",
  "Devansh Gupta",
  "Ananya Iyer",
];
const CITIES_STATES = [
  ["New Delhi", "Delhi"],
  ["Bengaluru", "Karnataka"],
  ["Ludhiana", "Punjab"],
  ["Pune", "Maharashtra"],
  ["Noida", "Uttar Pradesh"],
  ["Gurugram", "Haryana"],
  ["Mumbai", "Maharashtra"],
  ["Mysuru", "Karnataka"],
];
 
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
 
const generateLeads = (count) => {
  const leads = [];
  for (let i = 1; i <= count; i++) {
    const [city, state] = rand(CITIES_STATES);
    const status = rand(LEAD_STATUSES);
    const moduleCount = randInt(1, 3);
    const shuffledModules = [...INTERESTED_MODULES].sort(
      () => 0.5 - Math.random()
    );
    leads.push({
      id: `LD-${2000 + i}`,
      schoolName: rand(SCHOOL_NAMES),
      schoolType: rand(SCHOOL_TYPES),
      board: rand(BOARDS),
      studentStrength: randInt(300, 3000),
      address: `${randInt(1, 99)} Sector ${randInt(1, 90)}, ${city}`,
      city,
      state,
      contactPerson: rand(CONTACT_NAMES),
      designation: rand(["Principal", "Director", "Administrator", "Vice Principal"]),
      email: `contact${i}@school${i}.edu`,
      phone: `+91 9${randInt(100000000, 999999999)}`,
      leadSource: rand(LEAD_SOURCES),
      assignedExecutive: rand(SALES_EXECUTIVES),
      priority: rand(PRIORITIES),
      status,
      nextFollowUp:
        status === "Converted" || status === "Lost"
          ? "—"
          : daysFromNow(randInt(1, 20)),
      dateAdded: daysAgo(randInt(0, 45)),
      expectedClosingDate: daysFromNow(randInt(5, 60)),
      interestedModules: shuffledModules.slice(0, moduleCount),
      notes:
        "Prospect is actively evaluating ERP options and has requested a follow-up call to discuss pricing and implementation timelines.",
    });
  }
  return leads;
};
 
const INITIAL_LEADS = generateLeads(24);
 
const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: "Lead Created",
    description: "New lead added for Horizon Global School by Rohit Sinha.",
    date: daysAgo(0),
    icon: FiUserPlus,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 2,
    type: "Status Updated",
    description: "Crescent Public School moved from Contacted to Qualified.",
    date: daysAgo(0),
    icon: FiRefreshCw,
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: 3,
    type: "Demo Scheduled",
    description: "Product demo scheduled with Oakwood International for Friday.",
    date: daysAgo(1),
    icon: FiCalendar,
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    id: 4,
    type: "Proposal Sent",
    description: "Proposal sent to Maple Leaf Academy for the Enterprise plan.",
    date: daysAgo(2),
    icon: FiSend,
    color: "text-amber-600 bg-amber-100",
  },
  {
    id: 5,
    type: "Follow-up Completed",
    description: "Follow-up call completed with Silver Oak School regarding pricing.",
    date: daysAgo(3),
    icon: FiPhoneCall,
    color: "text-teal-600 bg-teal-100",
  },
  {
    id: 6,
    type: "Lead Converted",
    description: "Riverside Convent School converted to a paying customer.",
    date: daysAgo(4),
    icon: FiCheckCircle,
    color: "text-green-600 bg-green-100",
  },
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
    case "New":
      return "bg-blue-100 text-blue-700";
    case "Contacted":
      return "bg-orange-100 text-orange-700";
    case "Qualified":
      return "bg-purple-100 text-purple-700";
    case "Demo Scheduled":
      return "bg-indigo-100 text-indigo-700";
    case "Proposal Sent":
      return "bg-yellow-100 text-yellow-700";
    case "Negotiation":
      return "bg-pink-100 text-pink-700";
    case "Converted":
      return "bg-green-100 text-green-700";
    case "Lost":
      return "bg-gray-200 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
 
const formatDate = (dateString) => {
  if (!dateString || dateString === "—") return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
 
// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const ManageLeads = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
 
  // Filters (draft vs applied)
  const [draftFilters, setDraftFilters] = useState({
    schoolSearch: "",
    contactSearch: "",
    status: "All Status",
    priority: "All Priorities",
    source: "All Sources",
    executive: "All Executives",
    dateFrom: "",
    dateTo: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
 
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
 
  // Modals
  const [viewLead, setViewLead] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [assignLead, setAssignLead] = useState(null);
  const [assignForm, setAssignForm] = useState({
    executive: SALES_EXECUTIVES[0],
    followUpDate: "",
    comments: "",
  });
  const [statusLead, setStatusLead] = useState(null);
  const [statusForm, setStatusForm] = useState({
    status: LEAD_STATUSES[0],
    followUpDate: "",
    remarks: "",
  });
  const [deleteTarget, setDeleteTarget] = useState(null);
 
  // --------------------------------------------------------------
  // Filter Handlers
  // --------------------------------------------------------------
  const updateDraftFilter = (field, value) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
  };
 
  const applyFilters = () => {
    setAppliedFilters(draftFilters);
    setCurrentPage(1);
  };
 
  const resetFilters = () => {
    const cleared = {
      schoolSearch: "",
      contactSearch: "",
      status: "All Status",
      priority: "All Priorities",
      source: "All Sources",
      executive: "All Executives",
      dateFrom: "",
      dateTo: "",
    };
    setDraftFilters(cleared);
    setAppliedFilters(cleared);
    setCurrentPage(1);
  };
 
  // --------------------------------------------------------------
  // Filtering
  // --------------------------------------------------------------
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSchool = lead.schoolName
        .toLowerCase()
        .includes(appliedFilters.schoolSearch.toLowerCase());
      const matchesContact = lead.contactPerson
        .toLowerCase()
        .includes(appliedFilters.contactSearch.toLowerCase());
      const matchesStatus =
        appliedFilters.status === "All Status" ||
        lead.status === appliedFilters.status;
      const matchesPriority =
        appliedFilters.priority === "All Priorities" ||
        lead.priority === appliedFilters.priority;
      const matchesSource =
        appliedFilters.source === "All Sources" ||
        lead.leadSource === appliedFilters.source;
      const matchesExecutive =
        appliedFilters.executive === "All Executives" ||
        lead.assignedExecutive === appliedFilters.executive;
      const matchesFrom =
        !appliedFilters.dateFrom || lead.dateAdded >= appliedFilters.dateFrom;
      const matchesTo =
        !appliedFilters.dateTo || lead.dateAdded <= appliedFilters.dateTo;
 
      return (
        matchesSchool &&
        matchesContact &&
        matchesStatus &&
        matchesPriority &&
        matchesSource &&
        matchesExecutive &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [leads, appliedFilters]);
 
  // --------------------------------------------------------------
  // Pagination
  // --------------------------------------------------------------
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / rowsPerPage));
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
 
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };
 
  // --------------------------------------------------------------
  // Summary Stats
  // --------------------------------------------------------------
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contactedLeads = leads.filter((l) => l.status === "Contacted").length;
  const qualifiedLeads = leads.filter((l) => l.status === "Qualified").length;
  const convertedLeads = leads.filter((l) => l.status === "Converted").length;
  const lostLeads = leads.filter((l) => l.status === "Lost").length;
 
  const summaryCards = [
    {
      label: "Total Leads",
      value: totalLeads,
      description: "All leads in the pipeline",
      icon: FiUsers,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "New Leads",
      value: newLeads,
      description: "Awaiting first contact",
      icon: FiUserPlus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Contacted",
      value: contactedLeads,
      description: "Initial outreach done",
      icon: FiPhoneCall,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Qualified",
      value: qualifiedLeads,
      description: "Ready for the sales pipeline",
      icon: FiCheckCircle,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      label: "Converted",
      value: convertedLeads,
      description: "Became paying institutions",
      icon: FiAward,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Lost Leads",
      value: lostLeads,
      description: "Did not convert",
      icon: FiXCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];
 
  // --------------------------------------------------------------
  // Edit Handlers
  // --------------------------------------------------------------
  const openEditModal = (lead) => {
    setEditLead(lead);
    setEditForm({
      schoolName: lead.schoolName,
      contactPerson: lead.contactPerson,
      email: lead.email,
      phone: lead.phone,
      priority: lead.priority,
      status: lead.status,
      assignedExecutive: lead.assignedExecutive,
      notes: lead.notes,
    });
  };
 
  const saveEdit = () => {
    if (!editLead) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === editLead.id ? { ...l, ...editForm } : l))
    );
    setEditLead(null);
    setEditForm(null);
  };
 
  // --------------------------------------------------------------
  // Assign Handlers
  // --------------------------------------------------------------
  const openAssignModal = (lead) => {
    setAssignLead(lead);
    setAssignForm({
      executive: lead.assignedExecutive,
      followUpDate: "",
      comments: "",
    });
  };
 
  const confirmAssign = () => {
    if (!assignLead) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === assignLead.id
          ? {
              ...l,
              assignedExecutive: assignForm.executive,
              nextFollowUp: assignForm.followUpDate || l.nextFollowUp,
            }
          : l
      )
    );
    setAssignLead(null);
  };
 
  // --------------------------------------------------------------
  // Status Handlers
  // --------------------------------------------------------------
  const openStatusModal = (lead) => {
    setStatusLead(lead);
    setStatusForm({
      status: lead.status,
      followUpDate: "",
      remarks: "",
    });
  };
 
  const confirmStatusUpdate = () => {
    if (!statusLead) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === statusLead.id
          ? {
              ...l,
              status: statusForm.status,
              nextFollowUp: statusForm.followUpDate || l.nextFollowUp,
            }
          : l
      )
    );
    setStatusLead(null);
  };
 
  // --------------------------------------------------------------
  // Delete Handlers
  // --------------------------------------------------------------
  const confirmDelete = () => {
    if (!deleteTarget) return;
    setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
    setDeleteTarget(null);
  };
 
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* -------------------------------------------------- */}
      {/* Page Header */}
      {/* -------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Lead Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage, track, and organize all school leads from a single
            dashboard.
          </p>
        </div>
 
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200"
          >
            <FiDownload size={15} />
            Export Leads
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200"
          >
            <FiPlus size={15} />
            Add Lead
          </button>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Summary Cards */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        {summaryCards.map((card, index) => {
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
      {/* Search & Filters */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={draftFilters.schoolSearch}
              onChange={(e) => updateDraftFilter("schoolSearch", e.target.value)}
              placeholder="Search by school name..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
 
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={draftFilters.contactSearch}
              onChange={(e) => updateDraftFilter("contactSearch", e.target.value)}
              placeholder="Search by contact person..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
 
          <select
            value={draftFilters.status}
            onChange={(e) => updateDraftFilter("status", e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {STATUS_FILTER_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
 
          <select
            value={draftFilters.priority}
            onChange={(e) => updateDraftFilter("priority", e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {PRIORITY_FILTER_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
 
          <select
            value={draftFilters.source}
            onChange={(e) => updateDraftFilter("source", e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {SOURCE_FILTER_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
 
          <select
            value={draftFilters.executive}
            onChange={(e) => updateDraftFilter("executive", e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {EXECUTIVE_FILTER_OPTIONS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
 
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={draftFilters.dateFrom}
              onChange={(e) => updateDraftFilter("dateFrom", e.target.value)}
              className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <span className="text-gray-400 text-sm">to</span>
            <input
              type="date"
              value={draftFilters.dateTo}
              onChange={(e) => updateDraftFilter("dateTo", e.target.value)}
              className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
 
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-white border border-purple-200 hover:bg-purple-600 px-4 py-2 rounded-xl transition-colors duration-200"
          >
            <FiRefreshCcw size={14} />
            Reset Filters
          </button>
          <button
            onClick={applyFilters}
            className="flex items-center gap-2 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Leads Table */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Lead ID
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  School Name
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Contact Person
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Phone
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Email
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Lead Source
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Assigned Executive
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Priority
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Next Follow-up
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Date Added
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedLeads.length > 0 ? (
                paginatedLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-purple-50/40 transition-colors duration-150"
                  >
                    <td className="px-5 py-4 font-medium text-purple-600 whitespace-nowrap">
                      {lead.id}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">
                        {lead.schoolName}
                      </p>
                      <p className="text-xs text-gray-400">{lead.city}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {lead.contactPerson}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {lead.phone}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {lead.email}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {lead.leadSource}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {lead.assignedExecutive}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityBadgeClasses(
                          lead.priority
                        )}`}
                      >
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadgeClasses(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(lead.nextFollowUp)}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(lead.dateAdded)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setViewLead(lead)}
                          title="View"
                          className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-200"
                        >
                          <FiEye size={13} />
                        </button>
                        <button
                          onClick={() => openEditModal(lead)}
                          title="Edit"
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                        >
                          <FiEdit3 size={13} />
                        </button>
                        <button
                          onClick={() => openAssignModal(lead)}
                          title="Assign"
                          className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                        >
                          <FiUserCheck size={13} />
                        </button>
                        <button
                          onClick={() => openStatusModal(lead)}
                          title="Update Status"
                          className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-colors duration-200"
                        >
                          <FiRefreshCw size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(lead)}
                          title="Delete"
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="bg-purple-50 text-purple-400 p-4 rounded-full mb-3">
                        <FiInbox size={26} />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        No leads found
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
 
        {/* Pagination */}
        {filteredLeads.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="py-1.5 px-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {ROWS_PER_PAGE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span className="ml-2">
                Showing {(currentPage - 1) * rowsPerPage + 1}-
                {Math.min(currentPage * rowsPerPage, filteredLeads.length)} of{" "}
                {filteredLeads.length}
              </span>
            </div>
 
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <FiChevronLeft size={13} />
                Prev
              </button>
 
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-xs font-medium rounded-lg transition-colors duration-200 ${
                    page === currentPage
                      ? "bg-purple-600 text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
 
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
                <FiChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Recent Activity Timeline */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
          <FiActivity className="text-purple-600" size={18} />
          Recent Activity Timeline
        </h3>
        <div className="space-y-5">
          {RECENT_ACTIVITIES.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2.5 rounded-lg ${activity.color}`}>
                  <Icon size={15} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.type}
                    </p>
                    <p className="text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(activity.date)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* View Lead Modal */}
      {/* -------------------------------------------------- */}
      {viewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {viewLead.schoolName}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{viewLead.id}</p>
              </div>
              <button
                onClick={() => setViewLead(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>
 
            <div className="px-6 py-5 space-y-6">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getPriorityBadgeClasses(
                    viewLead.priority
                  )}`}
                >
                  {viewLead.priority} Priority
                </span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadgeClasses(
                    viewLead.status
                  )}`}
                >
                  {viewLead.status}
                </span>
              </div>
 
              {/* School Information */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiHome className="text-purple-600" size={15} />
                  School Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">School Type</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.schoolType}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Board</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.board}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Student Strength</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.studentStrength.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiMapPin size={11} /> Address
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.address}, {viewLead.city}, {viewLead.state}
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Contact Information */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiUser className="text-purple-600" size={15} />
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Contact Person</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.contactPerson}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Designation</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.designation}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiMail size={11} /> Email
                    </p>
                    <p className="text-sm font-medium text-gray-800 break-all">
                      {viewLead.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiPhone size={11} /> Phone
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.phone}
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Lead Information */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiTag className="text-purple-600" size={15} />
                  Lead Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Lead Source</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.leadSource}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Assigned Executive</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.assignedExecutive}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiCalendar size={11} /> Expected Closing Date
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewLead.expectedClosingDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Next Follow-up</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewLead.nextFollowUp)}
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Interested Modules */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiGlobe className="text-purple-600" size={15} />
                  Interested Modules
                </h4>
                <div className="flex flex-wrap gap-2">
                  {viewLead.interestedModules.map((module) => (
                    <span
                      key={module}
                      className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {module}
                    </span>
                  ))}
                </div>
              </div>
 
              {/* Notes */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FiFileText className="text-purple-600" size={15} />
                  Notes
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
                  {viewLead.notes}
                </p>
              </div>
            </div>
 
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewLead(null)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* -------------------------------------------------- */}
      {/* Edit Lead Modal */}
      {/* -------------------------------------------------- */}
      {editLead && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Edit Lead</h3>
              <button
                onClick={() => setEditLead(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>
 
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500">
                  School Name
                </label>
                <input
                  type="text"
                  value={editForm.schoolName}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, schoolName: e.target.value }))
                  }
                  className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={editForm.contactPerson}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        contactPerson: e.target.value,
                      }))
                    }
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
 
              <div>
                <label className="text-xs font-medium text-gray-500">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Priority
                  </label>
                  <select
                    value={editForm.priority}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, priority: e.target.value }))
                    }
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, status: e.target.value }))
                    }
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Assigned Executive
                  </label>
                  <select
                    value={editForm.assignedExecutive}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        assignedExecutive: e.target.value,
                      }))
                    }
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {SALES_EXECUTIVES.map((exec) => (
                      <option key={exec} value={exec}>
                        {exec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
 
              <div>
                <label className="text-xs font-medium text-gray-500">Notes</label>
                <textarea
                  value={editForm.notes}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  rows={4}
                  className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
              </div>
            </div>
 
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setEditLead(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* -------------------------------------------------- */}
      {/* Assign Lead Modal */}
      {/* -------------------------------------------------- */}
      {assignLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Assign Lead
              </h3>
              <button
                onClick={() => setAssignLead(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Assign{" "}
              <span className="font-medium text-gray-700">
                {assignLead.schoolName}
              </span>{" "}
              to a sales executive.
            </p>
 
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Sales Executive
                </label>
                <select
                  value={assignForm.executive}
                  onChange={(e) =>
                    setAssignForm((prev) => ({
                      ...prev,
                      executive: e.target.value,
                    }))
                  }
                  className="w-full mt-1.5 py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {SALES_EXECUTIVES.map((exec) => (
                    <option key={exec} value={exec}>
                      {exec}
                    </option>
                  ))}
                </select>
              </div>
 
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={assignForm.followUpDate}
                  onChange={(e) =>
                    setAssignForm((prev) => ({
                      ...prev,
                      followUpDate: e.target.value,
                    }))
                  }
                  className="w-full mt-1.5 py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
 
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Comments
                </label>
                <textarea
                  value={assignForm.comments}
                  onChange={(e) =>
                    setAssignForm((prev) => ({
                      ...prev,
                      comments: e.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Add any handover notes..."
                  className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
              </div>
            </div>
 
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setAssignLead(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssign}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* -------------------------------------------------- */}
      {/* Update Status Modal */}
      {/* -------------------------------------------------- */}
      {statusLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Update Status
              </h3>
              <button
                onClick={() => setStatusLead(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Update the status for{" "}
              <span className="font-medium text-gray-700">
                {statusLead.schoolName}
              </span>
              .
            </p>
 
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Status
                </label>
                <select
                  value={statusForm.status}
                  onChange={(e) =>
                    setStatusForm((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full mt-1.5 py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
 
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Next Follow-up Date
                </label>
                <input
                  type="date"
                  value={statusForm.followUpDate}
                  onChange={(e) =>
                    setStatusForm((prev) => ({
                      ...prev,
                      followUpDate: e.target.value,
                    }))
                  }
                  className="w-full mt-1.5 py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
 
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Remarks
                </label>
                <textarea
                  value={statusForm.remarks}
                  onChange={(e) =>
                    setStatusForm((prev) => ({ ...prev, remarks: e.target.value }))
                  }
                  rows={3}
                  placeholder="Add remarks about this status change..."
                  className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
              </div>
            </div>
 
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStatusLead(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusUpdate}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* -------------------------------------------------- */}
      {/* Delete Confirmation Modal */}
      {/* -------------------------------------------------- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
            <div className="bg-red-100 text-red-600 p-3 rounded-full inline-flex mb-4">
              <FiTrash2 size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Delete Lead</h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700">
                "{deleteTarget.schoolName}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default ManageLeads;