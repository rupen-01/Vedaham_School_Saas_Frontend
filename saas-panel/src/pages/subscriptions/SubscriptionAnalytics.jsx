import React, { useState, useMemo } from "react";
import {
  FiLayers,
  FiCheckCircle,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiRefreshCcw,
  FiAlertTriangle,
  FiSearch,
  FiDownload,
  FiBarChart2,
  FiActivity,
  FiPieChart,
  FiClock,
  FiCalendar,
  FiUsers,
  FiHome,
  FiX,
  FiEye,
  FiSend,
  FiAward,
  FiZap,
  FiStar,
  FiTarget,
  FiArrowUpCircle,
  FiArrowDownCircle,
  FiXCircle,
  FiPlusCircle,
  FiInbox,
} from "react-icons/fi";
 
// ------------------------------------------------------------------
// Static Options
// ------------------------------------------------------------------
const DATE_RANGES = ["Today", "This Week", "This Month", "This Year"];
const PLANS = ["Basic", "Standard", "Premium", "Enterprise"];
const BILLING_CYCLES = ["Monthly", "Yearly"];
const INSTITUTION_TYPES = ["Private", "Public", "International", "Government"];
const SUBSCRIPTION_STATUSES = [
  "Active",
  "Trial",
  "Pending",
  "Expired",
  "Cancelled",
];
const RENEWAL_STATUSES = ["Active", "Renewing Soon", "Expired", "Cancelled"];
 
const PLAN_FILTER_OPTIONS = ["All Plans", ...PLANS];
const STATUS_FILTER_OPTIONS = ["All Status", ...RENEWAL_STATUSES];
const BILLING_FILTER_OPTIONS = ["All Cycles", ...BILLING_CYCLES];
const INSTITUTION_TYPE_FILTER_OPTIONS = ["All Types", ...INSTITUTION_TYPES];
 
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
 
const INSTITUTION_NAMES = [
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
];
 
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
 
// Plan performance (base figures; contribution % is derived below)
const PLAN_PERFORMANCE_BASE = [
  {
    plan: "Basic",
    subscribers: 210,
    monthlyRevenue: 1260000,
    renewalRate: 78,
    churnRate: 8.2,
    growth: 4.1,
  },
  {
    plan: "Standard",
    subscribers: 165,
    monthlyRevenue: 1980000,
    renewalRate: 84,
    churnRate: 5.4,
    growth: 9.6,
  },
  {
    plan: "Premium",
    subscribers: 98,
    monthlyRevenue: 2450000,
    renewalRate: 89,
    churnRate: 3.1,
    growth: 14.2,
  },
  {
    plan: "Enterprise",
    subscribers: 42,
    monthlyRevenue: 1470000,
    renewalRate: 93,
    churnRate: 1.8,
    growth: 21.5,
  },
];
 
const MONTHLY_REVENUE_TREND = [
  { month: "Nov", revenue: 5820000 },
  { month: "Dec", revenue: 6150000 },
  { month: "Jan", revenue: 6480000 },
  { month: "Feb", revenue: 6290000 },
  { month: "Mar", revenue: 6780000 },
  { month: "Apr", revenue: 7020000 },
  { month: "May", revenue: 7160000 },
];
 
const SUBSCRIPTION_GROWTH = [
  { month: "Nov", newSubs: 28, renewals: 34, cancellations: 6 },
  { month: "Dec", newSubs: 32, renewals: 38, cancellations: 7 },
  { month: "Jan", newSubs: 30, renewals: 41, cancellations: 5 },
  { month: "Feb", newSubs: 35, renewals: 44, cancellations: 8 },
  { month: "Mar", newSubs: 41, renewals: 48, cancellations: 6 },
  { month: "Apr", newSubs: 46, renewals: 52, cancellations: 9 },
  { month: "May", newSubs: 52, renewals: 58, cancellations: 7 },
];
 
const STATUS_DISTRIBUTION = [
  { status: "Active", count: 480, color: "bg-green-500" },
  { status: "Trial", count: 42, color: "bg-blue-500" },
  { status: "Pending", count: 18, color: "bg-amber-500" },
  { status: "Expired", count: 25, color: "bg-red-400" },
  { status: "Cancelled", count: 13, color: "bg-gray-400" },
];
 
const CANCELLATION_REASONS = [
  { reason: "Pricing", percentage: 34 },
  { reason: "Not Required", percentage: 22 },
  { reason: "Competitor", percentage: 18 },
  { reason: "Poor Usage", percentage: 16 },
  { reason: "Other", percentage: 10 },
];
 
const generateRenewals = (count) => {
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const plan = rand(PLANS);
    const daysOut = randInt(-5, 45);
    const renewalDate =
      daysOut >= 0 ? daysFromNow(daysOut) : daysAgo(Math.abs(daysOut));
    let status = "Renewing Soon";
    if (daysOut < 0) status = "Expired";
    else if (daysOut > 30) status = "Active";
    if (Math.random() < 0.08) status = "Cancelled";
 
    rows.push({
      id: i,
      institution: rand(INSTITUTION_NAMES),
      plan,
      renewalDate,
      amount:
        plan === "Basic"
          ? randInt(4, 7) * 1000
          : plan === "Standard"
          ? randInt(9, 13) * 1000
          : plan === "Premium"
          ? randInt(20, 28) * 1000
          : randInt(38, 50) * 1000,
      status,
      daysRemaining: daysOut,
      billingCycle: rand(BILLING_CYCLES),
      institutionType: rand(INSTITUTION_TYPES),
    });
  }
  return rows;
};
 
const RENEWAL_ROWS = generateRenewals(12);
 
const TOP_INSTITUTIONS = [
  {
    rank: 1,
    institution: "Horizon Global School",
    plan: "Enterprise",
    students: 3120,
    value: 576000,
    renewalDate: daysFromNow(52),
    status: "Active",
  },
  {
    rank: 2,
    institution: "Green Valley Public School",
    plan: "Enterprise",
    students: 2450,
    value: 540000,
    renewalDate: daysFromNow(38),
    status: "Active",
  },
  {
    rank: 3,
    institution: "Emerald Heights School",
    plan: "Enterprise",
    students: 2890,
    value: 558000,
    renewalDate: daysAgo(4),
    status: "Expired",
  },
  {
    rank: 4,
    institution: "Sunrise International School",
    plan: "Premium",
    students: 1680,
    value: 336000,
    renewalDate: daysFromNow(11),
    status: "Renewing Soon",
  },
  {
    rank: 5,
    institution: "St. Xavier's Academy",
    plan: "Premium",
    students: 1520,
    value: 324000,
    renewalDate: daysFromNow(9),
    status: "Renewing Soon",
  },
  {
    rank: 6,
    institution: "Riverside Convent School",
    plan: "Premium",
    students: 1440,
    value: 318000,
    renewalDate: daysFromNow(60),
    status: "Active",
  },
  {
    rank: 7,
    institution: "Maple Leaf Academy",
    plan: "Standard",
    students: 860,
    value: 138000,
    renewalDate: daysFromNow(75),
    status: "Active",
  },
  {
    rank: 8,
    institution: "Oakwood International",
    plan: "Standard",
    students: 940,
    value: 150000,
    renewalDate: daysFromNow(4),
    status: "Renewing Soon",
  },
];
 
const INSIGHTS = [
  { label: "Best Performing Plan", value: "Premium (34% of revenue)", icon: FiZap },
  { label: "Fastest Growing Plan", value: "Enterprise (+21.5% MoM)", icon: FiTrendingUp },
  { label: "Highest Revenue Plan", value: "Premium (₹24.5L MRR)", icon: FiDollarSign },
  { label: "Highest Renewal Rate", value: "Enterprise (93%)", icon: FiAward },
  { label: "Highest Churn Plan", value: "Basic (8.2%)", icon: FiTrendingDown },
  { label: "Month-over-Month Growth", value: "+2.0% revenue growth", icon: FiStar },
];
 
const RECENT_ACTIVITY = [
  {
    id: 1,
    type: "New Subscription",
    institution: "Oakwood International",
    description: "Subscribed to the Standard plan on a monthly billing cycle.",
    date: daysAgo(0),
    icon: FiPlusCircle,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 2,
    type: "Subscription Renewed",
    institution: "Green Valley Public School",
    description: "Renewed the Enterprise plan for another 12 months.",
    date: daysAgo(1),
    icon: FiRefreshCcw,
    color: "text-green-600 bg-green-100",
  },
  {
    id: 3,
    type: "Plan Upgraded",
    institution: "Blue Bells High School",
    description: "Upgraded from Standard to Premium plan.",
    date: daysAgo(2),
    icon: FiArrowUpCircle,
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: 4,
    type: "Plan Downgraded",
    institution: "Silver Oak School",
    description: "Downgraded from Standard to Basic plan.",
    date: daysAgo(3),
    icon: FiArrowDownCircle,
    color: "text-amber-600 bg-amber-100",
  },
  {
    id: 5,
    type: "Subscription Cancelled",
    institution: "Crescent Public School",
    description: "Cancelled the Basic plan, citing pricing concerns.",
    date: daysAgo(4),
    icon: FiXCircle,
    color: "text-red-600 bg-red-100",
  },
  {
    id: 6,
    type: "Subscription Expired",
    institution: "Emerald Heights School",
    description: "Enterprise plan expired without renewal confirmation.",
    date: daysAgo(4),
    icon: FiAlertTriangle,
    color: "text-gray-600 bg-gray-200",
  },
];
 
// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------
const formatCurrency = (value) => {
  if (!value) return "—";
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
};
 
const formatDate = (dateString) => {
  if (!dateString) return "—";
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
    case "Active":
      return "bg-green-100 text-green-700";
    case "Trial":
      return "bg-blue-100 text-blue-700";
    case "Pending":
      return "bg-amber-100 text-amber-700";
    case "Renewing Soon":
      return "bg-orange-100 text-orange-700";
    case "Expired":
      return "bg-red-100 text-red-700";
    case "Cancelled":
      return "bg-gray-200 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
 
const getPlanDotColor = (plan) => {
  switch (plan) {
    case "Basic":
      return "bg-sky-400";
    case "Standard":
      return "bg-purple-400";
    case "Premium":
      return "bg-fuchsia-500";
    case "Enterprise":
      return "bg-indigo-600";
    default:
      return "bg-gray-400";
  }
};
 
const getPlanBarColor = (plan) => getPlanDotColor(plan);
 
const getDaysRemainingLabel = (days) => {
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "Due today";
  return `${days}d left`;
};
 
// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const SubscriptionAnalytics = () => {
  const [dateRange, setDateRange] = useState("This Month");
 
  // Filters (draft vs applied) - applied to the Renewal Overview table
  const [draftFilters, setDraftFilters] = useState({
    search: "",
    plan: "All Plans",
    status: "All Status",
    billingCycle: "All Cycles",
    dateFrom: "",
    dateTo: "",
    institutionType: "All Types",
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
 
  // Reminder toggle (dummy interactivity, no backend)
  const [remindedIds, setRemindedIds] = useState([]);
 
  // View modal for Top Subscribing Institutions
  const [viewInstitution, setViewInstitution] = useState(null);
 
  // --------------------------------------------------------------
  // Filter Handlers
  // --------------------------------------------------------------
  const updateDraftFilter = (field, value) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
  };
 
  const applyFilters = () => setAppliedFilters(draftFilters);
 
  const resetFilters = () => {
    const cleared = {
      search: "",
      plan: "All Plans",
      status: "All Status",
      billingCycle: "All Cycles",
      dateFrom: "",
      dateTo: "",
      institutionType: "All Types",
    };
    setDraftFilters(cleared);
    setAppliedFilters(cleared);
  };
 
  const toggleReminder = (id) => {
    setRemindedIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };
 
  // --------------------------------------------------------------
  // Filtered Renewal Rows
  // --------------------------------------------------------------
  const filteredRenewals = useMemo(() => {
    return RENEWAL_ROWS.filter((row) => {
      const matchesSearch = row.institution
        .toLowerCase()
        .includes(appliedFilters.search.toLowerCase());
      const matchesPlan =
        appliedFilters.plan === "All Plans" || row.plan === appliedFilters.plan;
      const matchesStatus =
        appliedFilters.status === "All Status" ||
        row.status === appliedFilters.status;
      const matchesBilling =
        appliedFilters.billingCycle === "All Cycles" ||
        row.billingCycle === appliedFilters.billingCycle;
      const matchesType =
        appliedFilters.institutionType === "All Types" ||
        row.institutionType === appliedFilters.institutionType;
      const matchesFrom =
        !appliedFilters.dateFrom || row.renewalDate >= appliedFilters.dateFrom;
      const matchesTo =
        !appliedFilters.dateTo || row.renewalDate <= appliedFilters.dateTo;
 
      return (
        matchesSearch &&
        matchesPlan &&
        matchesStatus &&
        matchesBilling &&
        matchesType &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [appliedFilters]);
 
  // --------------------------------------------------------------
  // Summary Cards
  // --------------------------------------------------------------
  const totalSubscriptions = STATUS_DISTRIBUTION.reduce(
    (sum, s) => sum + s.count,
    0
  );
  const activeSubscriptions =
    STATUS_DISTRIBUTION.find((s) => s.status === "Active")?.count || 0;
  const totalMonthlyRevenue = PLAN_PERFORMANCE_BASE.reduce(
    (sum, p) => sum + p.monthlyRevenue,
    0
  );
  const totalAnnualRevenue = totalMonthlyRevenue * 12;
  const averageRenewalRate = (
    PLAN_PERFORMANCE_BASE.reduce((sum, p) => sum + p.renewalRate, 0) /
    PLAN_PERFORMANCE_BASE.length
  ).toFixed(1);
  const averageChurnRate = (
    PLAN_PERFORMANCE_BASE.reduce((sum, p) => sum + p.churnRate, 0) /
    PLAN_PERFORMANCE_BASE.length
  ).toFixed(1);
 
  const summaryCards = [
    {
      label: "Total Subscriptions",
      value: totalSubscriptions,
      description: "Across all institutions",
      icon: FiLayers,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "up",
      trendValue: "6.8%",
    },
    {
      label: "Active Subscriptions",
      value: activeSubscriptions,
      description: "Currently in good standing",
      icon: FiCheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trend: "up",
      trendValue: "4.2%",
    },
    {
      label: "Monthly Recurring Revenue",
      value: formatCurrency(totalMonthlyRevenue),
      description: "MRR across all plans",
      icon: FiDollarSign,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "up",
      trendValue: "2.0%",
    },
    {
      label: "Annual Recurring Revenue",
      value: formatCurrency(totalAnnualRevenue),
      description: "Projected revenue this year",
      icon: FiBarChart2,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      trend: "up",
      trendValue: "8.4%",
    },
    {
      label: "Renewal Rate",
      value: `${averageRenewalRate}%`,
      description: "Average across all plans",
      icon: FiRefreshCcw,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "up",
      trendValue: "1.6%",
    },
    {
      label: "Churn Rate",
      value: `${averageChurnRate}%`,
      description: "Average across all plans",
      icon: FiAlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      trend: "down",
      trendValue: "0.9%",
    },
  ];
 
  // --------------------------------------------------------------
  // Plan Performance (with derived contribution %)
  // --------------------------------------------------------------
  const planPerformance = useMemo(() => {
    return PLAN_PERFORMANCE_BASE.map((plan) => ({
      ...plan,
      annualRevenue: plan.monthlyRevenue * 12,
      contribution: Number(
        ((plan.monthlyRevenue / totalMonthlyRevenue) * 100).toFixed(1)
      ),
    }));
  }, [totalMonthlyRevenue]);
 
  // --------------------------------------------------------------
  // Chart scaling
  // --------------------------------------------------------------
  const maxRevenue = Math.max(...MONTHLY_REVENUE_TREND.map((m) => m.revenue));
  const currentMonthRevenue =
    MONTHLY_REVENUE_TREND[MONTHLY_REVENUE_TREND.length - 1].revenue;
  const previousMonthRevenue =
    MONTHLY_REVENUE_TREND[MONTHLY_REVENUE_TREND.length - 2].revenue;
  const revenueGrowth = (
    ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) *
    100
  ).toFixed(1);
 
  const maxGrowthValue = Math.max(
    ...SUBSCRIPTION_GROWTH.map((m) => m.newSubs)
  );
 
  const maxStatusCount = Math.max(...STATUS_DISTRIBUTION.map((s) => s.count));
 
  // --------------------------------------------------------------
  // Renewal Overview mini stats
  // --------------------------------------------------------------
  const upcomingRenewals = RENEWAL_ROWS.filter(
    (r) => r.daysRemaining >= 0 && r.status !== "Cancelled"
  ).length;
  const renewedThisMonth = 28;
  const expiring7Days = RENEWAL_ROWS.filter(
    (r) => r.daysRemaining >= 0 && r.daysRemaining <= 7
  ).length;
  const expiring30Days = RENEWAL_ROWS.filter(
    (r) => r.daysRemaining >= 0 && r.daysRemaining <= 30
  ).length;
 
  // --------------------------------------------------------------
  // Churn Analysis
  // --------------------------------------------------------------
  const totalCancelled =
    STATUS_DISTRIBUTION.find((s) => s.status === "Cancelled")?.count || 0;
  const cancellationRate = (
    (totalCancelled / totalSubscriptions) *
    100
  ).toFixed(1);
 
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* -------------------------------------------------- */}
      {/* Page Header */}
      {/* -------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Subscription Analytics
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Analyze subscription growth, revenue, renewals, and plan
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
      {/* Summary Cards */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        {summaryCards.map((card, index) => {
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
                  <Icon size={19} />
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
      {/* Filter Section */}
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
              value={draftFilters.search}
              onChange={(e) => updateDraftFilter("search", e.target.value)}
              placeholder="Search institution..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
 
          <select
            value={draftFilters.plan}
            onChange={(e) => updateDraftFilter("plan", e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {PLAN_FILTER_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
 
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
            value={draftFilters.billingCycle}
            onChange={(e) => updateDraftFilter("billingCycle", e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {BILLING_FILTER_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
 
          <select
            value={draftFilters.institutionType}
            onChange={(e) =>
              updateDraftFilter("institutionType", e.target.value)
            }
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {INSTITUTION_TYPE_FILTER_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
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
      {/* Subscription Revenue + Subscription Growth */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscription Revenue */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <FiBarChart2 className="text-purple-600" size={18} />
                Subscription Revenue
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Monthly recurring revenue over the last 7 months
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-400">This Month</p>
                <p className="font-semibold text-gray-800">
                  {formatCurrency(currentMonthRevenue)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Previous Month</p>
                <p className="font-semibold text-gray-800">
                  {formatCurrency(previousMonthRevenue)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Growth</p>
                <p
                  className={`font-semibold flex items-center gap-1 ${
                    revenueGrowth >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {revenueGrowth >= 0 ? (
                    <FiTrendingUp size={14} />
                  ) : (
                    <FiTrendingDown size={14} />
                  )}
                  {Math.abs(revenueGrowth)}%
                </p>
              </div>
            </div>
          </div>
 
          <div className="flex items-end justify-between gap-3 h-48">
            {MONTHLY_REVENUE_TREND.map((item, index) => {
              const heightPercentage = (item.revenue / maxRevenue) * 100;
              const isLast = index === MONTHLY_REVENUE_TREND.length - 1;
              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center justify-end h-full gap-2 group"
                >
                  <p className="text-xs font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {formatCurrency(item.revenue)}
                  </p>
                  <div
                    style={{ height: `${heightPercentage}%` }}
                    className={`w-full max-w-[36px] rounded-t-lg transition-all duration-300 ${
                      isLast
                        ? "bg-purple-600"
                        : "bg-purple-200 group-hover:bg-purple-400"
                    }`}
                  />
                  <p className="text-xs text-gray-400">{item.month}</p>
                </div>
              );
            })}
          </div>
        </div>
 
        {/* Subscription Status Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiPieChart className="text-purple-600" size={18} />
            Subscription Status
          </h3>
          <p className="text-xs text-gray-400 mb-5">
            Distribution across all subscriptions
          </p>
 
          <div className="space-y-4">
            {STATUS_DISTRIBUTION.map((item) => (
              <div key={item.status}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-gray-700 font-medium">
                      {item.status}
                    </span>
                  </div>
                  <span className="text-gray-500">
                    {item.count} (
                    {((item.count / totalSubscriptions) * 100).toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${(item.count / maxStatusCount) * 100}%`,
                    }}
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Subscription Growth */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
          <FiActivity className="text-purple-600" size={18} />
          Subscription Growth
        </h3>
        <p className="text-xs text-gray-400 mb-5">
          New subscriptions, renewals, and cancellations over the last 7
          months
        </p>
 
        <div className="flex items-center gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> New
            Subscriptions
          </span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Renewals
          </span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Cancellations
          </span>
        </div>
 
        <div className="flex items-end justify-between gap-3 h-48">
          {SUBSCRIPTION_GROWTH.map((item) => (
            <div
              key={item.month}
              className="flex-1 flex flex-col items-center justify-end h-full gap-1.5"
            >
              <div className="flex items-end gap-1 h-full w-full justify-center">
                <div
                  style={{ height: `${(item.newSubs / maxGrowthValue) * 100}%` }}
                  className="w-2.5 sm:w-3 rounded-t-md bg-purple-600"
                  title={`New: ${item.newSubs}`}
                />
                <div
                  style={{ height: `${(item.renewals / maxGrowthValue) * 100}%` }}
                  className="w-2.5 sm:w-3 rounded-t-md bg-green-500"
                  title={`Renewals: ${item.renewals}`}
                />
                <div
                  style={{
                    height: `${(item.cancellations / maxGrowthValue) * 100}%`,
                  }}
                  className="w-2.5 sm:w-3 rounded-t-md bg-red-400"
                  title={`Cancellations: ${item.cancellations}`}
                />
              </div>
              <p className="text-xs text-gray-400">{item.month}</p>
            </div>
          ))}
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Plan Performance */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
          <FiTarget className="text-purple-600" size={18} />
          Plan Performance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {planPerformance.map((plan) => (
            <div
              key={plan.plan}
              className="p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2.5 h-2.5 rounded-full ${getPlanDotColor(plan.plan)}`} />
                <p className="text-sm font-semibold text-gray-800">
                  {plan.plan}
                </p>
              </div>
 
              <div className="space-y-2 text-xs text-gray-500 mb-3">
                <div className="flex items-center justify-between">
                  <span>Active Subscribers</span>
                  <span className="font-medium text-gray-800">
                    {plan.subscribers}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Monthly Revenue</span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(plan.monthlyRevenue)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Annual Revenue</span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(plan.annualRevenue)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Renewal Rate</span>
                  <span className="font-medium text-green-600">
                    {plan.renewalRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Churn Rate</span>
                  <span className="font-medium text-red-500">
                    {plan.churnRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Growth</span>
                  <span className="font-medium text-green-600 flex items-center gap-1">
                    <FiTrendingUp size={11} />
                    {plan.growth}%
                  </span>
                </div>
              </div>
 
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Revenue Contribution</span>
                  <span className="text-gray-700 font-medium">
                    {plan.contribution}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${plan.contribution}%` }}
                    className={`h-full rounded-full ${getPlanBarColor(plan.plan)} transition-all duration-500`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Revenue Breakdown */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
          <FiDollarSign className="text-purple-600" size={18} />
          Revenue Breakdown by Plan
        </h3>
        <p className="text-xs text-gray-400 mb-5">
          Share of monthly recurring revenue by plan
        </p>
        <div className="space-y-4">
          {planPerformance.map((plan) => (
            <div key={plan.plan}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getPlanDotColor(plan.plan)}`} />
                  <span className="text-gray-700 font-medium">{plan.plan}</span>
                  <span className="text-xs text-gray-400">
                    ({plan.subscribers} subscriptions)
                  </span>
                </div>
                <span className="text-gray-600 font-medium">
                  {formatCurrency(plan.monthlyRevenue)} · {plan.contribution}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${plan.contribution}%` }}
                  className={`h-full rounded-full ${getPlanBarColor(plan.plan)} transition-all duration-500`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Renewal Overview */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
          <FiClock className="text-purple-600" size={18} />
          Renewal Overview
        </h3>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-purple-50/60">
            <p className="text-xs text-gray-400">Upcoming Renewals</p>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {upcomingRenewals}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-green-50/60">
            <p className="text-xs text-gray-400">Renewed This Month</p>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {renewedThisMonth}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-blue-50/60">
            <p className="text-xs text-gray-400">Renewal Rate</p>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {averageRenewalRate}%
            </p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/60">
            <p className="text-xs text-gray-400">Expiring in 7 Days</p>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {expiring7Days}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-red-50/60">
            <p className="text-xs text-gray-400">Expiring in 30 Days</p>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {expiring30Days}
            </p>
          </div>
        </div>
 
        <div className="overflow-x-auto -mx-5 sm:-mx-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap">
                  Institution
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap">
                  Current Plan
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap">
                  Renewal Date
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap">
                  Amount
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap">
                  Days Remaining
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRenewals.length > 0 ? (
                filteredRenewals.map((row) => {
                  const reminded = remindedIds.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-purple-50/40 transition-colors duration-150"
                    >
                      <td className="px-5 sm:px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                        {row.institution}
                      </td>
                      <td className="px-5 sm:px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                          <span
                            className={`w-2 h-2 rounded-full ${getPlanDotColor(row.plan)}`}
                          />
                          {row.plan}
                        </span>
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(row.renewalDate)}
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-gray-600 whitespace-nowrap">
                        {formatCurrency(row.amount)}
                      </td>
                      <td className="px-5 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadgeClasses(
                            row.status
                          )}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-medium ${
                            row.daysRemaining < 0
                              ? "text-red-500"
                              : row.daysRemaining <= 7
                              ? "text-amber-600"
                              : "text-gray-500"
                          }`}
                        >
                          {getDaysRemainingLabel(row.daysRemaining)}
                        </span>
                      </td>
                      <td className="px-5 sm:px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => toggleReminder(row.id)}
                          disabled={row.status === "Cancelled"}
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                            reminded
                              ? "bg-green-50 text-green-600"
                              : "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white"
                          }`}
                        >
                          <FiSend size={12} />
                          {reminded ? "Reminder Sent" : "Send Reminder"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 sm:px-6 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="bg-purple-50 text-purple-400 p-4 rounded-full mb-3">
                        <FiInbox size={26} />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        No renewals found
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
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Top Subscribing Institutions */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <FiAward className="text-purple-600" size={18} />
            Top Subscribing Institutions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Rank</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Institution
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Plan</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Students
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Subscription Value
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Renewal Date
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TOP_INSTITUTIONS.map((inst) => (
                <tr
                  key={inst.rank}
                  className="hover:bg-purple-50/40 transition-colors duration-150"
                >
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-semibold">
                      #{inst.rank}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {inst.institution}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                      <span
                        className={`w-2 h-2 rounded-full ${getPlanDotColor(inst.plan)}`}
                      />
                      {inst.plan}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {inst.students.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {formatCurrency(inst.value)}
                  </td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                    {formatDate(inst.renewalDate)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadgeClasses(
                        inst.status
                      )}`}
                    >
                      {inst.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => setViewInstitution(inst)}
                      title="View Details"
                      className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-200"
                    >
                      <FiEye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Churn Analysis */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FiAlertTriangle className="text-red-500" size={18} />
            Churn Analysis
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Cancelled</span>
              <span className="text-sm font-semibold text-gray-800">
                {totalCancelled}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Cancellation Rate</span>
              <span className="text-sm font-semibold text-red-500">
                {cancellationRate}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Avg. Subscription Duration
              </span>
              <span className="text-sm font-semibold text-gray-800">
                14 months
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Most Cancelled Plan
              </span>
              <span className="text-sm font-semibold text-gray-800">Basic</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Main Cancellation Reason
              </span>
              <span className="text-sm font-semibold text-gray-800">
                Pricing
              </span>
            </div>
          </div>
        </div>
 
        {/* Cancellation Reason Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiBarChart2 className="text-purple-600" size={18} />
            Cancellation Reason Breakdown
          </h3>
          <p className="text-xs text-gray-400 mb-5">
            Why institutions cancel their subscription
          </p>
          <div className="space-y-3">
            {CANCELLATION_REASONS.map((item) => (
              <div key={item.reason}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">
                    {item.reason}
                  </span>
                  <span className="text-gray-500">{item.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full rounded-full bg-red-400 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Subscription Insights + Recent Activity */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Insights */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FiZap className="text-purple-600" size={18} />
            Subscription Insights
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
 
        {/* Recent Subscription Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FiActivity className="text-purple-600" size={18} />
            Recent Activity
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
                      {activity.institution}
                    </p>
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
      {/* View Institution Modal */}
      {/* -------------------------------------------------- */}
      {viewInstitution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                {viewInstitution.institution}
              </h3>
              <button
                onClick={() => setViewInstitution(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>
 
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadgeClasses(
                    viewInstitution.status
                  )}`}
                >
                  {viewInstitution.status}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <span
                    className={`w-2 h-2 rounded-full ${getPlanDotColor(
                      viewInstitution.plan
                    )}`}
                  />
                  {viewInstitution.plan} Plan
                </span>
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiHome size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Rank</p>
                    <p className="text-sm font-medium text-gray-800">
                      #{viewInstitution.rank} by revenue
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiUsers size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Students</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewInstitution.students.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiDollarSign size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Subscription Value</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatCurrency(viewInstitution.value)}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiCalendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Renewal Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewInstitution.renewalDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewInstitution(null)}
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
 
export default SubscriptionAnalytics;
