
import React, { useState, useMemo } from "react";
import {
  FiUsers,
  FiUserPlus,
  FiCheckCircle,
  FiAward,
  FiXCircle,
  FiPercent,
  FiDownload,
  FiFileText,
  FiSearch,
  FiRefreshCcw,
  FiTrendingUp,
  FiTrendingDown,
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiX,
  FiBarChart2,
  FiTarget,
  FiStar,
  FiZap,
  FiInbox,
  FiCalendar,
  FiHome,
  FiUser,
  FiMapPin,
  FiTag,
  FiMail,
  FiPhone,
  FiActivity,
  FiClock,
  FiSend,
  FiRefreshCw,
  FiGlobe,
  FiDollarSign,
} from "react-icons/fi";
 
// ------------------------------------------------------------------
// Static Options
// ------------------------------------------------------------------
const LEAD_SOURCES = [
  "Website",
  "Referral",
  "Advertisement",
  "Cold Call",
  "Social Media",
  "Events",
];
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
const PRIORITIES = ["Low", "Medium", "High"];
const SALES_EXECUTIVES = [
  "Rohit Sinha",
  "Anjali Mehra",
  "Vikram Chauhan",
  "Sneha Patil",
  "Karan Bedi",
];
const STATES = [
  "Haryana",
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Punjab",
  "Uttar Pradesh",
];
const SCHOOL_TYPES = ["Private", "Public", "International", "Government"];
const BOARDS = ["CBSE", "ICSE", "State Board", "IB"];
 
const STATUS_FILTER_OPTIONS = ["All Status", ...LEAD_STATUSES];
const SOURCE_FILTER_OPTIONS = ["All Sources", ...LEAD_SOURCES];
const PRIORITY_FILTER_OPTIONS = ["All Priorities", ...PRIORITIES];
const EXECUTIVE_FILTER_OPTIONS = ["All Executives", ...SALES_EXECUTIVES];
const STATE_FILTER_OPTIONS = ["All States", ...STATES];
const SCHOOL_TYPE_FILTER_OPTIONS = ["All School Types", ...SCHOOL_TYPES];
 
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
    const isConverted = status === "Converted";
    const isClosed = status === "Converted" || status === "Lost";
    const estimatedValue = randInt(80, 600) * 1000;
 
    leads.push({
      id: `LD-${3000 + i}`,
      schoolName: rand(SCHOOL_NAMES),
      schoolType: rand(SCHOOL_TYPES),
      board: rand(BOARDS),
      studentCount: randInt(300, 3000),
      city,
      state,
      contactPerson: rand(CONTACT_NAMES),
      email: `contact${i}@school${i}.edu`,
      phone: `+91 9${randInt(100000000, 999999999)}`,
      source: rand(LEAD_SOURCES),
      assignedExecutive: rand(SALES_EXECUTIVES),
      status,
      priority: rand(PRIORITIES),
      dateAdded: daysAgo(randInt(5, 90)),
      followUpDate: isClosed ? "—" : daysFromNow(randInt(1, 15)),
      conversionDate: isConverted ? daysAgo(randInt(0, 20)) : "—",
      estimatedValue,
      revenue: isConverted ? estimatedValue : 0,
      notes:
        "Prospect has been engaged multiple times and is evaluating ERP options against two other vendors. Awaiting final budget approval from the management committee.",
    });
  }
  return leads;
};
 
const ALL_LEADS = generateLeads(38);
 
const MONTHLY_PERFORMANCE = [
  { month: "Nov", generated: 58, qualified: 34, converted: 8 },
  { month: "Dec", generated: 71, qualified: 42, converted: 11 },
  { month: "Jan", generated: 84, qualified: 51, converted: 13 },
  { month: "Feb", generated: 76, qualified: 46, converted: 9 },
  { month: "Mar", generated: 97, qualified: 60, converted: 16 },
  { month: "Apr", generated: 112, qualified: 71, converted: 19 },
  { month: "May", generated: 128, qualified: 84, converted: 23 },
];
 
const SALES_LEADERBOARD = [
  { rank: 1, executive: "Rohit Sinha", assigned: 142, qualified: 96, converted: 34, revenue: 1420000 },
  { rank: 2, executive: "Anjali Mehra", assigned: 128, qualified: 84, converted: 29, revenue: 1180000 },
  { rank: 3, executive: "Vikram Chauhan", assigned: 115, qualified: 71, converted: 22, revenue: 940000 },
  { rank: 4, executive: "Sneha Patil", assigned: 98, qualified: 58, converted: 17, revenue: 705000 },
  { rank: 5, executive: "Karan Bedi", assigned: 84, qualified: 46, converted: 12, revenue: 512000 },
].map((exec) => ({
  ...exec,
  conversionRate: ((exec.converted / exec.assigned) * 100).toFixed(1),
}));
 
const RECENT_ACTIVITY = [
  {
    id: 1,
    type: "Report Generated",
    description: "Monthly lead performance report generated for May 2026.",
    date: daysAgo(0),
    icon: FiFileText,
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: 2,
    type: "Lead Converted",
    description: "Riverside Convent School converted to a paying customer.",
    date: daysAgo(1),
    icon: FiCheckCircle,
    color: "text-green-600 bg-green-100",
  },
  {
    id: 3,
    type: "Follow-up Completed",
    description: "Follow-up call completed with Silver Oak School regarding pricing.",
    date: daysAgo(2),
    icon: FiPhone,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 4,
    type: "Proposal Sent",
    description: "Proposal sent to Maple Leaf Academy for the Enterprise plan.",
    date: daysAgo(3),
    icon: FiSend,
    color: "text-amber-600 bg-amber-100",
  },
  {
    id: 5,
    type: "Status Changed",
    description: "Crescent Public School moved from Contacted to Qualified.",
    date: daysAgo(4),
    icon: FiRefreshCw,
    color: "text-indigo-600 bg-indigo-100",
  },
];
 
const INSIGHTS = [
  { label: "Best Performing Lead Source", value: "Website (34% conversion)", icon: FiZap },
  { label: "Highest Converting Executive", value: "Rohit Sinha (23.9%)", icon: FiStar },
  { label: "Best Performing State", value: "Maharashtra", icon: FiMapPin },
  { label: "Average Conversion Time", value: "21 days", icon: FiClock },
  { label: "Highest Revenue Source", value: "Website (₹18.6L)", icon: FiDollarSign },
  { label: "Monthly Conversion Growth", value: "+12.6% vs last month", icon: FiTrendingUp },
];
 
// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------
const formatCurrency = (value) => {
  if (!value) return "—";
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
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
 
const getPerformanceBadge = (conversionRate) => {
  const rate = Number(conversionRate);
  if (rate >= 25) return { label: "Excellent", classes: "bg-green-100 text-green-700" };
  if (rate >= 18) return { label: "Good", classes: "bg-blue-100 text-blue-700" };
  if (rate >= 10) return { label: "Average", classes: "bg-amber-100 text-amber-700" };
  return { label: "Needs Attention", classes: "bg-red-100 text-red-700" };
};
 
const ROWS_PER_PAGE_DEFAULT = 10;
 
// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const LeadReports = () => {
  // Filters (draft vs applied)
  const [draftFilters, setDraftFilters] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    status: "All Status",
    source: "All Sources",
    priority: "All Priorities",
    executive: "All Executives",
    state: "All States",
    schoolType: "All School Types",
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
 
  // Sorting
  const [sortField, setSortField] = useState("dateAdded");
  const [sortDirection, setSortDirection] = useState("desc");
 
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_DEFAULT);
 
  // View modal
  const [viewLead, setViewLead] = useState(null);
 
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
      search: "",
      dateFrom: "",
      dateTo: "",
      status: "All Status",
      source: "All Sources",
      priority: "All Priorities",
      executive: "All Executives",
      state: "All States",
      schoolType: "All School Types",
    };
    setDraftFilters(cleared);
    setAppliedFilters(cleared);
    setCurrentPage(1);
  };
 
  // --------------------------------------------------------------
  // Filtering
  // --------------------------------------------------------------
  const filteredLeads = useMemo(() => {
    return ALL_LEADS.filter((lead) => {
      const matchesSearch =
        lead.schoolName.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
        lead.contactPerson.toLowerCase().includes(appliedFilters.search.toLowerCase());
      const matchesStatus =
        appliedFilters.status === "All Status" || lead.status === appliedFilters.status;
      const matchesSource =
        appliedFilters.source === "All Sources" || lead.source === appliedFilters.source;
      const matchesPriority =
        appliedFilters.priority === "All Priorities" ||
        lead.priority === appliedFilters.priority;
      const matchesExecutive =
        appliedFilters.executive === "All Executives" ||
        lead.assignedExecutive === appliedFilters.executive;
      const matchesState =
        appliedFilters.state === "All States" || lead.state === appliedFilters.state;
      const matchesSchoolType =
        appliedFilters.schoolType === "All School Types" ||
        lead.schoolType === appliedFilters.schoolType;
      const matchesFrom =
        !appliedFilters.dateFrom || lead.dateAdded >= appliedFilters.dateFrom;
      const matchesTo = !appliedFilters.dateTo || lead.dateAdded <= appliedFilters.dateTo;
 
      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource &&
        matchesPriority &&
        matchesExecutive &&
        matchesState &&
        matchesSchoolType &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [appliedFilters]);
 
  // --------------------------------------------------------------
  // Sorting
  // --------------------------------------------------------------
  const sortedLeads = useMemo(() => {
    const sorted = [...filteredLeads].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
 
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
 
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredLeads, sortField, sortDirection]);
 
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
 
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <FiChevronDown className="opacity-20" size={12} />;
    return sortDirection === "asc" ? (
      <FiChevronUp size={12} />
    ) : (
      <FiChevronDown size={12} />
    );
  };
 
  // --------------------------------------------------------------
  // Pagination
  // --------------------------------------------------------------
  const totalPages = Math.max(1, Math.ceil(sortedLeads.length / rowsPerPage));
  const paginatedLeads = sortedLeads.slice(
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
  // Summary Cards
  // --------------------------------------------------------------
  const totalLeads = ALL_LEADS.length;
  const newLeads = ALL_LEADS.filter((l) => l.status === "New").length;
  const qualifiedLeads = ALL_LEADS.filter((l) => l.status === "Qualified").length;
  const convertedLeads = ALL_LEADS.filter((l) => l.status === "Converted").length;
  const lostLeads = ALL_LEADS.filter((l) => l.status === "Lost").length;
  const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1);
 
  const summaryCards = [
    {
      label: "Total Leads",
      value: totalLeads,
      description: "All leads captured",
      icon: FiUsers,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "up",
      trendValue: "8.2%",
    },
    {
      label: "New Leads",
      value: newLeads,
      description: "Awaiting first contact",
      icon: FiUserPlus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "up",
      trendValue: "5.4%",
    },
    {
      label: "Qualified Leads",
      value: qualifiedLeads,
      description: "Ready for the pipeline",
      icon: FiCheckCircle,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      trend: "up",
      trendValue: "6.1%",
    },
    {
      label: "Converted Leads",
      value: convertedLeads,
      description: "Became paying institutions",
      icon: FiAward,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trend: "up",
      trendValue: "11.4%",
    },
    {
      label: "Lost Leads",
      value: lostLeads,
      description: "Did not convert",
      icon: FiXCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      trend: "down",
      trendValue: "3.6%",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      description: "Leads converted to customers",
      icon: FiPercent,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      trend: "up",
      trendValue: "1.8%",
    },
  ];
 
  // --------------------------------------------------------------
  // Lead Status Overview
  // --------------------------------------------------------------
  const statusOverview = useMemo(() => {
    return LEAD_STATUSES.map((status) => ({
      status,
      count: ALL_LEADS.filter((l) => l.status === status).length,
    }));
  }, []);
  const maxStatusCount = Math.max(...statusOverview.map((s) => s.count), 1);
 
  // --------------------------------------------------------------
  // Lead Source Performance
  // --------------------------------------------------------------
  const sourcePerformance = useMemo(() => {
    return LEAD_SOURCES.map((source) => {
      const sourceLeads = ALL_LEADS.filter((l) => l.source === source);
      const qualified = sourceLeads.filter(
        (l) =>
          l.status === "Qualified" ||
          l.status === "Demo Scheduled" ||
          l.status === "Proposal Sent" ||
          l.status === "Negotiation" ||
          l.status === "Converted"
      ).length;
      const converted = sourceLeads.filter((l) => l.status === "Converted").length;
      return {
        source,
        total: sourceLeads.length,
        qualified,
        converted,
        rate:
          sourceLeads.length > 0
            ? ((converted / sourceLeads.length) * 100).toFixed(1)
            : "0.0",
      };
    });
  }, []);
 
  // --------------------------------------------------------------
  // Monthly performance scaling
  // --------------------------------------------------------------
  const maxMonthlyValue = Math.max(
    ...MONTHLY_PERFORMANCE.map((m) => m.generated)
  );
 
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* -------------------------------------------------- */}
      {/* Page Header */}
      {/* -------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Lead Reports
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Generate and analyze detailed reports on school leads and sales
            performance.
          </p>
        </div>
 
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200"
          >
            <FiDownload size={15} />
            Download CSV
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200"
          >
            <FiFileText size={15} />
            Export Report
          </button>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Summary Cards */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          const TrendIcon = card.trend === "up" ? FiTrendingUp : FiTrendingDown;
          const trendColor = card.trend === "up" ? "text-green-600" : "text-red-500";
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`${card.iconBg} ${card.iconColor} p-3 rounded-xl flex items-center justify-center`}
                >
                  <Icon size={19} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
                  <TrendIcon size={13} />
                  {card.trendValue}
                </div>
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
      {/* Filter Section */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="relative xl:col-span-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={draftFilters.search}
              onChange={(e) => updateDraftFilter("search", e.target.value)}
              placeholder="Search by school or contact..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
 
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
 
          <select
            value={draftFilters.state}
            onChange={(e) => updateDraftFilter("state", e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {STATE_FILTER_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
 
          <select
            value={draftFilters.schoolType}
            onChange={(e) => updateDraftFilter("schoolType", e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {SCHOOL_TYPE_FILTER_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
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
      {/* Report Overview: Status Overview + Monthly Performance */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Status Overview */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiBarChart2 className="text-purple-600" size={18} />
            Lead Status Overview
          </h3>
          <p className="text-xs text-gray-400 mb-5">
            Current pipeline distribution
          </p>
          <div className="space-y-3">
            {statusOverview.map((item) => (
              <div key={item.status}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{item.status}</span>
                  <span className="text-gray-500">{item.count}</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(item.count / maxStatusCount) * 100}%` }}
                    className="h-full rounded-full bg-purple-600 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Monthly Lead Performance */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <FiActivity className="text-purple-600" size={18} />
              Monthly Lead Performance
            </h3>
          </div>
          <p className="text-xs text-gray-400 mb-5">
            Leads generated, qualified, and converted over time
          </p>
 
          <div className="flex items-center gap-4 mb-4 text-xs">
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Generated
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Qualified
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Converted
            </span>
          </div>
 
          <div className="flex items-end justify-between gap-3 h-48">
            {MONTHLY_PERFORMANCE.map((item) => (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center justify-end h-full gap-1.5"
              >
                <div className="flex items-end gap-1 h-full w-full justify-center">
                  <div
                    style={{ height: `${(item.generated / maxMonthlyValue) * 100}%` }}
                    className="w-2.5 sm:w-3 rounded-t-md bg-purple-600"
                    title={`Generated: ${item.generated}`}
                  />
                  <div
                    style={{ height: `${(item.qualified / maxMonthlyValue) * 100}%` }}
                    className="w-2.5 sm:w-3 rounded-t-md bg-indigo-400"
                    title={`Qualified: ${item.qualified}`}
                  />
                  <div
                    style={{ height: `${(item.converted / maxMonthlyValue) * 100}%` }}
                    className="w-2.5 sm:w-3 rounded-t-md bg-green-500"
                    title={`Converted: ${item.converted}`}
                  />
                </div>
                <p className="text-xs text-gray-400">{item.month}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Lead Source Performance */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <FiGlobe className="text-purple-600" size={18} />
            Lead Source Performance
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Source</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Total Leads
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Qualified Leads
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Converted Leads
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Conversion Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sourcePerformance.map((item) => (
                <tr
                  key={item.source}
                  className="hover:bg-purple-50/40 transition-colors duration-150"
                >
                  <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {item.source}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {item.total}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {item.qualified}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {item.converted}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${item.rate}%` }}
                          className="h-full bg-purple-600 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-gray-500">{item.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Detailed Report Table */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">
            Detailed Lead Report
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Click a column header to sort
          </p>
        </div>
 
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th
                  onClick={() => handleSort("id")}
                  className="px-5 py-3 font-semibold whitespace-nowrap cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1">
                    Lead ID <SortIcon field="id" />
                  </span>
                </th>
                <th
                  onClick={() => handleSort("schoolName")}
                  className="px-5 py-3 font-semibold whitespace-nowrap cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1">
                    School Name <SortIcon field="schoolName" />
                  </span>
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Contact Person
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Source</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Assigned Executive
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-5 py-3 font-semibold whitespace-nowrap cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1">
                    Status <SortIcon field="status" />
                  </span>
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Priority
                </th>
                <th
                  onClick={() => handleSort("dateAdded")}
                  className="px-5 py-3 font-semibold whitespace-nowrap cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1">
                    Date Added <SortIcon field="dateAdded" />
                  </span>
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Follow-up Date
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Conversion Date
                </th>
                <th
                  onClick={() => handleSort("revenue")}
                  className="px-5 py-3 font-semibold whitespace-nowrap cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1">
                    Revenue <SortIcon field="revenue" />
                  </span>
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
                      <p className="font-medium text-gray-800">{lead.schoolName}</p>
                      <p className="text-xs text-gray-400">{lead.city}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {lead.contactPerson}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {lead.assignedExecutive}
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
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityBadgeClasses(
                          lead.priority
                        )}`}
                      >
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(lead.dateAdded)}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(lead.followUpDate)}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(lead.conversionDate)}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                      {formatCurrency(lead.revenue)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => setViewLead(lead)}
                        title="View Details"
                        className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
                      >
                        <FiEye size={13} />
                        View
                      </button>
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
        {sortedLeads.length > 0 && (
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
                {Math.min(currentPage * rowsPerPage, sortedLeads.length)} of{" "}
                {sortedLeads.length}
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
      {/* Sales Executive Performance */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <FiAward className="text-purple-600" size={18} />
            Sales Executive Performance
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Rank</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Executive
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Leads Assigned
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Qualified
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Converted
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Conversion Rate
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Revenue
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SALES_LEADERBOARD.map((exec) => {
                const badge = getPerformanceBadge(exec.conversionRate);
                return (
                  <tr
                    key={exec.rank}
                    className="hover:bg-purple-50/40 transition-colors duration-150"
                  >
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-semibold">
                        #{exec.rank}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                      {exec.executive}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {exec.assigned}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {exec.qualified}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {exec.converted}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {exec.conversionRate}%
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                      {formatCurrency(exec.revenue)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge.classes}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Report Insights + Recent Report Activity */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Insights */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FiTarget className="text-purple-600" size={18} />
            Report Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INSIGHTS.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/50 hover:bg-purple-50 transition-colors duration-150"
                >
                  <div className="bg-purple-100 text-purple-600 p-2.5 rounded-lg">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{insight.label}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">
                      {insight.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
 
        {/* Recent Report Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FiActivity className="text-purple-600" size={18} />
            Recent Report Activity
          </h3>
          <div className="space-y-5">
            {RECENT_ACTIVITY.map((activity) => {
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
      </div>
 
      {/* -------------------------------------------------- */}
      {/* View Report Modal */}
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
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadgeClasses(
                    viewLead.status
                  )}`}
                >
                  {viewLead.status}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityBadgeClasses(
                    viewLead.priority
                  )}`}
                >
                  {viewLead.priority} Priority
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
                    <p className="text-xs text-gray-400">Student Count</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.studentCount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiMapPin size={11} /> Location
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.city}, {viewLead.state}
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
                    <p className="text-xs text-gray-400">Lead ID</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Source</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.source}
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
                      <FiCalendar size={11} /> Date Added
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewLead.dateAdded)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Last Follow-up</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewLead.followUpDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Conversion Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewLead.conversionDate)}
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Sales Information */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiDollarSign className="text-purple-600" size={15} />
                  Sales Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Estimated Value</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatCurrency(viewLead.estimatedValue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Final Revenue</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatCurrency(viewLead.revenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Conversion Time</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.status === "Converted"
                        ? `${Math.max(
                            1,
                            Math.round(
                              (new Date(viewLead.conversionDate) -
                                new Date(viewLead.dateAdded)) /
                                (1000 * 60 * 60 * 24)
                            )
                          )} days`
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Notes */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FiFileText className="text-purple-600" size={15} />
                  Notes / Activity Summary
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
    </div>
  );
};
 
export default LeadReports;
 