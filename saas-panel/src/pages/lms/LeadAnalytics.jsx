
import React, { useState, useMemo } from "react";
import {
  FiUsers,
  FiUserPlus,
  FiCheckCircle,
  FiAward,
  FiPercent,
  FiDollarSign,
  FiDownload,
  FiCalendar,
  FiSearch,
  FiRefreshCcw,
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiPieChart,
  FiBarChart2,
  FiMapPin,
  FiClock,
  FiPhoneCall,
  FiFileText,
  FiSend,
  FiFlag,
  FiHome,
  FiTarget,
  FiStar,
  FiZap,
  FiInbox,
} from "react-icons/fi";
 
// ------------------------------------------------------------------
// Dummy Data
// ------------------------------------------------------------------
const DATE_RANGES = ["Today", "This Week", "This Month", "This Year"];
 
const LEAD_SOURCES = [
  "Website",
  "Referral",
  "Advertisement",
  "Cold Calling",
  "Social Media",
  "Events",
];
const SALES_EXECUTIVE_NAMES = [
  "Rohit Sinha",
  "Anjali Mehra",
  "Vikram Chauhan",
  "Sneha Patil",
  "Karan Bedi",
];
const STATE_NAMES = [
  "Haryana",
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Punjab",
  "Uttar Pradesh",
];
const SCHOOL_TYPES = ["Private", "Public", "International", "Government"];
const LEAD_STATUSES_LIST = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Converted",
  "Lost",
];
 
const MONTHLY_TREND = [
  { month: "Nov", leads: 62, conversions: 8, revenue: 320000 },
  { month: "Dec", leads: 74, conversions: 11, revenue: 415000 },
  { month: "Jan", leads: 81, conversions: 13, revenue: 480000 },
  { month: "Feb", leads: 69, conversions: 9, revenue: 360000 },
  { month: "Mar", leads: 95, conversions: 16, revenue: 610000 },
  { month: "Apr", leads: 108, conversions: 19, revenue: 705000 },
  { month: "May", leads: 121, conversions: 22, revenue: 840000 },
];
 
const LEAD_SOURCE_DATA = [
  { label: "Website", value: 32, color: "#9333ea" },
  { label: "Referral", value: 22, color: "#3b82f6" },
  { label: "Advertisement", value: 15, color: "#f59e0b" },
  { label: "Cold Calling", value: 12, color: "#ef4444" },
  { label: "Social Media", value: 13, color: "#10b981" },
  { label: "Events", value: 6, color: "#6366f1" },
];
 
const LEAD_STATUS_DATA = [
  { label: "New", value: 18, color: "#3b82f6" },
  { label: "Contacted", value: 20, color: "#f97316" },
  { label: "Qualified", value: 17, color: "#8b5cf6" },
  { label: "Proposal Sent", value: 14, color: "#eab308" },
  { label: "Converted", value: 21, color: "#10b981" },
  { label: "Lost", value: 10, color: "#6b7280" },
];
 
const FUNNEL_STAGES = [
  { stage: "New Leads", count: 610 },
  { stage: "Contacted", count: 482 },
  { stage: "Qualified", count: 356 },
  { stage: "Demo Scheduled", count: 248 },
  { stage: "Proposal Sent", count: 174 },
  { stage: "Negotiation", count: 112 },
  { stage: "Converted", count: 78 },
];
 
const SALES_LEADERBOARD = [
  {
    rank: 1,
    executive: "Rohit Sinha",
    assigned: 142,
    qualified: 96,
    converted: 34,
    revenue: 1420000,
  },
  {
    rank: 2,
    executive: "Anjali Mehra",
    assigned: 128,
    qualified: 84,
    converted: 29,
    revenue: 1180000,
  },
  {
    rank: 3,
    executive: "Vikram Chauhan",
    assigned: 115,
    qualified: 71,
    converted: 22,
    revenue: 940000,
  },
  {
    rank: 4,
    executive: "Sneha Patil",
    assigned: 98,
    qualified: 58,
    converted: 17,
    revenue: 705000,
  },
  {
    rank: 5,
    executive: "Karan Bedi",
    assigned: 84,
    qualified: 46,
    converted: 12,
    revenue: 512000,
  },
].map((exec) => ({
  ...exec,
  conversionRate: ((exec.converted / exec.assigned) * 100).toFixed(1),
}));
 
const TOP_STATES = [
  {
    state: "Maharashtra",
    totalLeads: 168,
    converted: 32,
    pending: 96,
    revenue: 1560000,
    growth: 14.2,
  },
  {
    state: "Delhi",
    totalLeads: 142,
    converted: 27,
    pending: 78,
    revenue: 1320000,
    growth: 9.6,
  },
  {
    state: "Karnataka",
    totalLeads: 121,
    converted: 21,
    pending: 70,
    revenue: 980000,
    growth: 7.4,
  },
  {
    state: "Haryana",
    totalLeads: 96,
    converted: 18,
    pending: 52,
    revenue: 760000,
    growth: -2.1,
  },
  {
    state: "Punjab",
    totalLeads: 74,
    converted: 11,
    pending: 46,
    revenue: 540000,
    growth: 4.8,
  },
  {
    state: "Uttar Pradesh",
    totalLeads: 68,
    converted: 9,
    pending: 44,
    revenue: 410000,
    growth: -1.5,
  },
];
 
const today = new Date();
const daysAgo = (n) => {
  const date = new Date(today);
  date.setDate(date.getDate() - n);
  return date.toISOString().split("T")[0];
};
 
const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: "New Lead",
    description: "New lead added for Horizon Global School by Rohit Sinha.",
    date: daysAgo(0),
    icon: FiUserPlus,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 2,
    type: "Proposal Sent",
    description:
      "Proposal sent to Maple Leaf Academy for Enterprise plan subscription.",
    date: daysAgo(0),
    icon: FiSend,
    color: "text-amber-600 bg-amber-100",
  },
  {
    id: 3,
    type: "Follow-up Completed",
    description:
      "Follow-up call completed with Crescent Public School regarding pricing.",
    date: daysAgo(1),
    icon: FiPhoneCall,
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: 4,
    type: "Lead Converted",
    description:
      "Riverside Convent School converted to a paying customer on Premium plan.",
    date: daysAgo(1),
    icon: FiCheckCircle,
    color: "text-green-600 bg-green-100",
  },
  {
    id: 5,
    type: "Demo Scheduled",
    description: "Product demo scheduled with Oakwood International for Friday.",
    date: daysAgo(2),
    icon: FiCalendar,
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    id: 6,
    type: "School Registered",
    description: "Emerald Heights School completed onboarding and registration.",
    date: daysAgo(3),
    icon: FiFlag,
    color: "text-teal-600 bg-teal-100",
  },
];
 
const RECENT_CONVERSIONS = [
  {
    id: 1,
    school: "Riverside Convent School",
    executive: "Anjali Mehra",
    source: "Social Media",
    closingDate: daysAgo(1),
    revenue: 318000,
    duration: "18 days",
    status: "Converted",
  },
  {
    id: 2,
    school: "Emerald Heights School",
    executive: "Rohit Sinha",
    source: "Cold Calling",
    closingDate: daysAgo(3),
    revenue: 558000,
    duration: "26 days",
    status: "Converted",
  },
  {
    id: 3,
    school: "Horizon Global School",
    executive: "Rohit Sinha",
    source: "Website",
    closingDate: daysAgo(6),
    revenue: 540000,
    duration: "14 days",
    status: "Converted",
  },
  {
    id: 4,
    school: "Pinewood High School",
    executive: "Sneha Patil",
    source: "Referral",
    closingDate: daysAgo(8),
    revenue: 69600,
    duration: "32 days",
    status: "Converted",
  },
  {
    id: 5,
    school: "Oakwood International",
    executive: "Vikram Chauhan",
    source: "Website",
    closingDate: daysAgo(10),
    revenue: 300000,
    duration: "21 days",
    status: "Converted",
  },
  {
    id: 6,
    school: "Maple Leaf Academy",
    executive: "Karan Bedi",
    source: "Events",
    closingDate: daysAgo(12),
    revenue: 336000,
    duration: "29 days",
    status: "Converted",
  },
];
 
const INSIGHTS = [
  {
    label: "Highest Converting Source",
    value: "Website (34% conversion)",
    icon: FiZap,
  },
  {
    label: "Best Performing State",
    value: "Maharashtra",
    icon: FiMapPin,
  },
  {
    label: "Best Sales Executive",
    value: "Rohit Sinha",
    icon: FiStar,
  },
  {
    label: "Average Conversion Time",
    value: "21 days",
    icon: FiClock,
  },
  {
    label: "Lowest Performing Source",
    value: "Cold Calling (9% conversion)",
    icon: FiTrendingDown,
  },
  {
    label: "Monthly Growth",
    value: "+12.6% vs last month",
    icon: FiTrendingUp,
  },
];
 
const LEAD_SOURCE_FILTER_OPTIONS = ["All Sources", ...LEAD_SOURCES];
const EXECUTIVE_FILTER_OPTIONS = ["All Executives", ...SALES_EXECUTIVE_NAMES];
const STATE_FILTER_OPTIONS = ["All States", ...STATE_NAMES];
const SCHOOL_TYPE_FILTER_OPTIONS = ["All School Types", ...SCHOOL_TYPES];
const STATUS_FILTER_OPTIONS = ["All Status", ...LEAD_STATUSES_LIST];
 
// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------
const formatCurrency = (value) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
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
 
const buildConicGradient = (data) => {
  let cumulative = 0;
  const segments = data.map((item) => {
    const start = cumulative;
    cumulative += item.value;
    return `${item.color} ${start}% ${cumulative}%`;
  });
  return `conic-gradient(${segments.join(", ")})`;
};
 
const getStatusBadgeClasses = (status) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-700";
    case "Contacted":
      return "bg-orange-100 text-orange-700";
    case "Qualified":
      return "bg-purple-100 text-purple-700";
    case "Proposal Sent":
      return "bg-yellow-100 text-yellow-700";
    case "Converted":
      return "bg-green-100 text-green-700";
    case "Lost":
      return "bg-gray-200 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
 
const getPerformanceBadge = (conversionRate) => {
  const rate = Number(conversionRate);
  if (rate >= 25) return { label: "Excellent", classes: "bg-green-100 text-green-700" };
  if (rate >= 18) return { label: "Good", classes: "bg-blue-100 text-blue-700" };
  return { label: "Average", classes: "bg-amber-100 text-amber-700" };
};
 
// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const LeadAnalytics = () => {
  const [dateRange, setDateRange] = useState("This Month");
 
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [executiveFilter, setExecutiveFilter] = useState("All Executives");
  const [stateFilter, setStateFilter] = useState("All States");
  const [schoolTypeFilter, setSchoolTypeFilter] = useState("All School Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
 
  const resetFilters = () => {
    setSearchTerm("");
    setSourceFilter("All Sources");
    setExecutiveFilter("All Executives");
    setStateFilter("All States");
    setSchoolTypeFilter("All School Types");
    setStatusFilter("All Status");
  };
 
  // --------------------------------------------------------------
  // Filtered Recent Conversions (the filters apply to this table)
  // --------------------------------------------------------------
  const filteredConversions = useMemo(() => {
    return RECENT_CONVERSIONS.filter((item) => {
      const matchesSearch =
        item.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.executive.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSource =
        sourceFilter === "All Sources" || item.source === sourceFilter;
      const matchesExecutive =
        executiveFilter === "All Executives" ||
        item.executive === executiveFilter;
      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;
 
      return matchesSearch && matchesSource && matchesExecutive && matchesStatus;
    });
  }, [searchTerm, sourceFilter, executiveFilter, statusFilter]);
 
  // --------------------------------------------------------------
  // Analytics Cards
  // --------------------------------------------------------------
  const totalLeads = 610;
  const newLeads = 108;
  const qualifiedLeads = 356;
  const convertedLeads = 78;
  const conversionRate = ((convertedLeads / totalLeads) * 100).toFixed(1);
  const revenueGenerated = MONTHLY_TREND.reduce((sum, m) => sum + m.revenue, 0);
 
  const analyticsCards = [
    {
      label: "Total Leads",
      value: totalLeads,
      description: "All leads captured across sources",
      icon: FiUsers,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "up",
      trendValue: "8.4%",
    },
    {
      label: "New Leads",
      value: newLeads,
      description: "Added this month",
      icon: FiUserPlus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "up",
      trendValue: "12.1%",
    },
    {
      label: "Qualified Leads",
      value: qualifiedLeads,
      description: "Ready for the sales pipeline",
      icon: FiCheckCircle,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      trend: "up",
      trendValue: "5.7%",
    },
    {
      label: "Converted Leads",
      value: convertedLeads,
      description: "Became paying institutions",
      icon: FiAward,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trend: "up",
      trendValue: "9.3%",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      description: "Leads converted to customers",
      icon: FiPercent,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      trend: "up",
      trendValue: "1.9%",
    },
    {
      label: "Revenue Generated",
      value: formatCurrency(revenueGenerated),
      description: "From converted schools",
      icon: FiDollarSign,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "up",
      trendValue: "15.2%",
    },
  ];
 
  // --------------------------------------------------------------
  // Chart scaling helpers
  // --------------------------------------------------------------
  const maxLeads = Math.max(...MONTHLY_TREND.map((m) => m.leads));
  const maxConversions = Math.max(...MONTHLY_TREND.map((m) => m.conversions));
  const maxRevenue = Math.max(...MONTHLY_TREND.map((m) => m.revenue));
  const maxFunnelCount = FUNNEL_STAGES[0].count;
 
  // Build SVG points for the line chart (Lead Generation Trend)
  const lineChartPoints = MONTHLY_TREND.map((item, index) => {
    const x = (index / (MONTHLY_TREND.length - 1)) * 100;
    const y = 100 - (item.leads / maxLeads) * 90;
    return `${x},${y}`;
  }).join(" ");
 
  // Build SVG area path for the Revenue chart
  const areaChartPath = useMemo(() => {
    const points = MONTHLY_TREND.map((item, index) => {
      const x = (index / (MONTHLY_TREND.length - 1)) * 100;
      const y = 100 - (item.revenue / maxRevenue) * 90;
      return `${x},${y}`;
    });
    const linePath = `M${points.join(" L")}`;
    const closingPath = ` L100,100 L0,100 Z`;
    return linePath + closingPath;
  }, [maxRevenue]);
 
  const conicGradientSources = buildConicGradient(LEAD_SOURCE_DATA);
  const conicGradientStatus = buildConicGradient(LEAD_STATUS_DATA);
  const totalSourceLeads = LEAD_SOURCE_DATA.reduce((sum, d) => sum + d.value, 0);
  const totalStatusLeads = LEAD_STATUS_DATA.reduce((sum, d) => sum + d.value, 0);
 
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* -------------------------------------------------- */}
      {/* Page Header */}
      {/* -------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Lead Analytics
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Monitor lead generation, conversion trends, and overall sales
            performance.
          </p>
        </div>
 
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {DATE_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200"
          >
            <FiDownload size={15} />
            Export Report
          </button>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Analytics Cards */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        {analyticsCards.map((card, index) => {
          const Icon = card.icon;
          const TrendIcon = card.trend === "up" ? FiTrendingUp : FiTrendingDown;
          const trendColor =
            card.trend === "up" ? "text-green-600" : "text-red-500";
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`${card.iconBg} ${card.iconColor} p-3 rounded-xl flex items-center justify-center`}
                >
                  <Icon size={20} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}
                >
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
      {/* Filters */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="relative xl:col-span-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search school or executive..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
 
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {LEAD_SOURCE_FILTER_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
 
          <select
            value={executiveFilter}
            onChange={(e) => setExecutiveFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {EXECUTIVE_FILTER_OPTIONS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
 
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {STATE_FILTER_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
 
          <select
            value={schoolTypeFilter}
            onChange={(e) => setSchoolTypeFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {SCHOOL_TYPE_FILTER_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
 
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
      {/* Charts Section: Trend + Sources + Status */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Generation Trend - Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiActivity className="text-purple-600" size={18} />
            Lead Generation Trend
          </h3>
          <p className="text-xs text-gray-400 mb-5">
            Monthly leads captured over the last 7 months
          </p>
 
          <div className="relative h-52">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <polyline
                points={lineChartPoints}
                fill="none"
                stroke="#9333ea"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {MONTHLY_TREND.map((item, index) => {
                const x = (index / (MONTHLY_TREND.length - 1)) * 100;
                const y = 100 - (item.leads / maxLeads) * 90;
                return (
                  <circle
                    key={item.month}
                    cx={x}
                    cy={y}
                    r="1.6"
                    fill="#9333ea"
                    stroke="white"
                    strokeWidth="0.8"
                  />
                );
              })}
            </svg>
          </div>
          <div className="flex justify-between mt-2">
            {MONTHLY_TREND.map((item) => (
              <span key={item.month} className="text-xs text-gray-400">
                {item.month}
              </span>
            ))}
          </div>
        </div>
 
        {/* Lead Sources - Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiPieChart className="text-purple-600" size={18} />
            Lead Sources
          </h3>
          <p className="text-xs text-gray-400 mb-5">Breakdown by acquisition channel</p>
 
          <div className="flex flex-col items-center">
            <div
              className="w-36 h-36 rounded-full"
              style={{ background: conicGradientSources }}
            />
            <div className="w-full mt-5 space-y-2">
              {LEAD_SOURCE_DATA.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-gray-500 font-medium">
                    {((item.value / totalSourceLeads) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Charts Section: Status Distribution + Conversions + Revenue */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Status Distribution - Doughnut Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiPieChart className="text-purple-600" size={18} />
            Lead Status Distribution
          </h3>
          <p className="text-xs text-gray-400 mb-5">Where leads currently stand</p>
 
          <div className="flex flex-col items-center">
            <div
              className="relative w-36 h-36 rounded-full flex items-center justify-center"
              style={{ background: conicGradientStatus }}
            >
              <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-gray-800">
                  {totalStatusLeads}
                </p>
                <p className="text-[10px] text-gray-400">Total</p>
              </div>
            </div>
            <div className="w-full mt-5 grid grid-cols-2 gap-x-2 gap-y-2">
              {LEAD_STATUS_DATA.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 truncate">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* Monthly Conversions - Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiBarChart2 className="text-purple-600" size={18} />
            Monthly Conversions
          </h3>
          <p className="text-xs text-gray-400 mb-5">Schools converted per month</p>
 
          <div className="flex items-end justify-between gap-2 h-40">
            {MONTHLY_TREND.map((item, index) => {
              const heightPercentage = (item.conversions / maxConversions) * 100;
              const isLast = index === MONTHLY_TREND.length - 1;
              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center justify-end h-full gap-2"
                >
                  <div
                    style={{ height: `${heightPercentage}%` }}
                    className={`w-full max-w-[24px] rounded-t-lg transition-all duration-300 ${
                      isLast ? "bg-purple-600" : "bg-purple-200"
                    }`}
                  />
                  <p className="text-[10px] text-gray-400">{item.month}</p>
                </div>
              );
            })}
          </div>
        </div>
 
        {/* Revenue Generated - Area Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiDollarSign className="text-purple-600" size={18} />
            Revenue Generated
          </h3>
          <p className="text-xs text-gray-400 mb-5">
            Monthly revenue from converted schools
          </p>
 
          <div className="relative h-40">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9333ea" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaChartPath} fill="url(#revenueGradient)" />
              <polyline
                points={MONTHLY_TREND.map((item, index) => {
                  const x = (index / (MONTHLY_TREND.length - 1)) * 100;
                  const y = 100 - (item.revenue / maxRevenue) * 90;
                  return `${x},${y}`;
                }).join(" ")}
                fill="none"
                stroke="#9333ea"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex justify-between mt-2">
            {MONTHLY_TREND.map((item) => (
              <span key={item.month} className="text-[10px] text-gray-400">
                {item.month}
              </span>
            ))}
          </div>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Top Performing Sales Executives */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <FiAward className="text-purple-600" size={18} />
            Top Performing Sales Executives
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
      {/* Top States by Leads */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <FiMapPin className="text-purple-600" size={18} />
            Top States by Leads
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">State</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Total Leads
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Converted
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Pending
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Revenue
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Growth %
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TOP_STATES.map((state) => (
                <tr
                  key={state.state}
                  className="hover:bg-purple-50/40 transition-colors duration-150"
                >
                  <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {state.state}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {state.totalLeads}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {state.converted}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {state.pending}
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {formatCurrency(state.revenue)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`flex items-center gap-1 text-xs font-medium ${
                        state.growth >= 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {state.growth >= 0 ? (
                        <FiTrendingUp size={12} />
                      ) : (
                        <FiTrendingDown size={12} />
                      )}
                      {Math.abs(state.growth)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Recent Activities + Conversion Funnel */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Lead Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FiActivity className="text-purple-600" size={18} />
            Recent Lead Activities
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
 
        {/* Conversion Funnel */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FiTarget className="text-purple-600" size={18} />
            Conversion Funnel
          </h3>
          <div className="space-y-2.5">
            {FUNNEL_STAGES.map((stage, index) => {
              const widthPercentage = (stage.count / maxFunnelCount) * 100;
              return (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">
                      {stage.stage}
                    </span>
                    <span className="text-gray-500">{stage.count}</span>
                  </div>
                  <div className="w-full h-6 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      style={{
                        width: `${widthPercentage}%`,
                        opacity: 1 - index * 0.08,
                      }}
                      className="h-full rounded-lg bg-purple-600 transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Recent Conversions Table */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <FiHome className="text-purple-600" size={18} />
            Recent Conversions
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Filtered using the filters above
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  School Name
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Sales Executive
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Lead Source
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Closing Date
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Revenue
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Duration to Convert
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredConversions.length > 0 ? (
                filteredConversions.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-purple-50/40 transition-colors duration-150"
                  >
                    <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                      {item.school}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {item.executive}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {item.source}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(item.closingDate)}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                      {formatCurrency(item.revenue)}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {item.duration}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadgeClasses(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="bg-purple-50 text-purple-400 p-4 rounded-full mb-3">
                        <FiInbox size={26} />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        No conversions found
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
          Showing {filteredConversions.length} of {RECENT_CONVERSIONS.length}{" "}
          conversions
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Insights Panel */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
          <FiFileText className="text-purple-600" size={18} />
          Insights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
};
 
export default LeadAnalytics;