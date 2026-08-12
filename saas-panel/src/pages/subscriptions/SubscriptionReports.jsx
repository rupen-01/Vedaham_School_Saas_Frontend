import React, { useState, useMemo } from "react";
import {
  FiLayers,
  FiCheckCircle,
  FiUserPlus,
  FiRefreshCcw,
  FiXCircle,
  FiDollarSign,
  FiDownload,
  FiFileText,
  FiSearch,
  FiTrendingUp,
  FiTrendingDown,
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiX,
  FiBarChart2,
  FiActivity,
  FiClock,
  FiCalendar,
  FiHome,
  FiUser,
  FiMail,
  FiPhone,
  FiTag,
  FiHash,
  FiCreditCard,
  FiAlertTriangle,
  FiAward,
  FiZap,
  FiStar,
  FiArrowUpCircle,
  FiArrowDownCircle,
  FiPlusCircle,
  FiSend,
  FiInbox,
  FiUsers,
  FiPercent,
} from "react-icons/fi";

// ------------------------------------------------------------------
// Static Options
// ------------------------------------------------------------------
const DATE_RANGES = ["Today", "This Week", "This Month", "This Quarter", "This Year"];
const PLANS = ["Basic", "Standard", "Premium", "Enterprise"];
const BILLING_CYCLES = ["Monthly", "Yearly"];
const INSTITUTION_TYPES = ["Private", "Public", "International", "Government"];
const SUBSCRIPTION_STATUSES = ["Active", "Trial", "Pending", "Expired", "Cancelled"];
const PAYMENT_STATUSES = ["Paid", "Pending", "Failed", "Refunded"];
const PAYMENT_METHODS = ["Credit Card", "Bank Transfer", "UPI", "Cheque"];
const CHANGE_TYPES = ["Upgrade", "Downgrade"];

const PLAN_FILTER_OPTIONS = ["All Plans", ...PLANS];
const STATUS_FILTER_OPTIONS = ["All Status", ...SUBSCRIPTION_STATUSES];
const BILLING_FILTER_OPTIONS = ["All Cycles", ...BILLING_CYCLES];
const PAYMENT_FILTER_OPTIONS = ["All Payment Status", ...PAYMENT_STATUSES];
const INSTITUTION_TYPE_FILTER_OPTIONS = ["All Types", ...INSTITUTION_TYPES];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];
const ROWS_PER_PAGE_DEFAULT = 10;

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
  "Cedar Grove School",
  "Lotus Valley School",
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
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const PLAN_PRICE_RANGE = {
  Basic: [4000, 7000],
  Standard: [9000, 13000],
  Premium: [20000, 28000],
  Enterprise: [38000, 50000],
};

const generateSubscriptions = (count) => {
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const plan = rand(PLANS);
    const [minP, maxP] = PLAN_PRICE_RANGE[plan];
    const amount = randInt(minP, maxP);
    const tax = Math.round(amount * 0.18);
    const discount = Math.random() < 0.3 ? Math.round(amount * 0.05) : 0;
    const totalAmount = amount + tax - discount;
    const status = rand(SUBSCRIPTION_STATUSES);
    const paymentStatus =
      status === "Cancelled"
        ? rand(["Refunded", "Failed"])
        : status === "Pending"
        ? "Pending"
        : rand(["Paid", "Paid", "Paid", "Pending", "Failed"]);
    const startDate = daysAgo(randInt(30, 400));
    const renewalOffset = randInt(-10, 60);
    const renewalDate =
      renewalOffset >= 0 ? daysFromNow(renewalOffset) : daysAgo(Math.abs(renewalOffset));
    const assignedPlan = Math.random() < 0.85 ? plan : rand(PLANS);

    rows.push({
      id: `SUB-${5000 + i}`,
      institutionId: `INST-${1000 + i}`,
      institution: rand(INSTITUTION_NAMES),
      contactPerson: rand(CONTACT_NAMES),
      email: `contact${i}@school${i}.edu`,
      phone: `+91 9${randInt(100000000, 999999999)}`,
      plan,
      assignedPlan,
      billingCycle: rand(BILLING_CYCLES),
      startDate,
      renewalDate,
      amount,
      tax,
      discount,
      totalAmount,
      paymentStatus,
      paymentMethod: rand(PAYMENT_METHODS),
      status,
      institutionType: rand(INSTITUTION_TYPES),
      createdDate: startDate,
      lastPayment: daysAgo(randInt(1, 40)),
      lastPlanChange: Math.random() < 0.4 ? daysAgo(randInt(10, 200)) : "—",
      renewalHistory: [
        { date: daysAgo(randInt(370, 400)), amount },
        { date: daysAgo(randInt(5, 30)), amount },
      ],
    });
  }
  return rows;
};

const ALL_SUBSCRIPTIONS = generateSubscriptions(34);

const MONTHLY_REVENUE_REPORT = [
  { month: "Dec", total: 6150000, recurring: 5400000, renewal: 2800000, newSub: 750000, refunds: 42000 },
  { month: "Jan", total: 6480000, recurring: 5680000, renewal: 3050000, newSub: 800000, refunds: 38000 },
  { month: "Feb", total: 6290000, recurring: 5520000, renewal: 2900000, newSub: 770000, refunds: 51000 },
  { month: "Mar", total: 6780000, recurring: 5920000, renewal: 3200000, newSub: 860000, refunds: 35000 },
  { month: "Apr", total: 7020000, recurring: 6180000, renewal: 3380000, newSub: 840000, refunds: 47000 },
  { month: "May", total: 7160000, recurring: 6340000, renewal: 3460000, newSub: 820000, refunds: 44000 },
];

const PLAN_WISE_REPORT = [
  { plan: "Basic", totalSubscribers: 210, active: 178, newCount: 24, renewed: 142, cancelled: 8, revenue: 1260000, renewalRate: 78, churnRate: 8.2 },
  { plan: "Standard", totalSubscribers: 165, active: 148, newCount: 19, renewed: 121, cancelled: 5, revenue: 1980000, renewalRate: 84, churnRate: 5.4 },
  { plan: "Premium", totalSubscribers: 98, active: 91, newCount: 12, renewed: 78, cancelled: 3, revenue: 2450000, renewalRate: 89, churnRate: 3.1 },
  { plan: "Enterprise", totalSubscribers: 42, active: 40, newCount: 6, renewed: 34, cancelled: 1, revenue: 1470000, renewalRate: 93, churnRate: 1.8 },
];

const generateRenewalReportRows = (count) => {
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const plan = rand(PLANS);
    const [minP, maxP] = PLAN_PRICE_RANGE[plan];
    const daysOut = randInt(0, 35);
    rows.push({
      id: i,
      institution: rand(INSTITUTION_NAMES),
      plan,
      renewalDate: daysFromNow(daysOut),
      amount: randInt(minP, maxP),
      daysRemaining: daysOut,
      status: daysOut <= 7 ? "Renewing Soon" : "Active",
    });
  }
  return rows;
};

const RENEWAL_REPORT_ROWS = generateRenewalReportRows(9);

const CANCELLATION_REASONS = [
  { reason: "Pricing", percentage: 32 },
  { reason: "Not Required", percentage: 24 },
  { reason: "Competitor", percentage: 19 },
  { reason: "Low Usage", percentage: 15 },
  { reason: "Other", percentage: 10 },
];

const UPGRADE_DOWNGRADE_ROWS = [
  {
    id: 1,
    institution: "Blue Bells High School",
    previousPlan: "Standard",
    newPlan: "Premium",
    changeType: "Upgrade",
    date: daysAgo(2),
    revenueImpact: 15000,
  },
  {
    id: 2,
    institution: "Silver Oak School",
    previousPlan: "Standard",
    newPlan: "Basic",
    changeType: "Downgrade",
    date: daysAgo(3),
    revenueImpact: -6000,
  },
  {
    id: 3,
    institution: "Riverside Convent School",
    previousPlan: "Basic",
    newPlan: "Standard",
    changeType: "Upgrade",
    date: daysAgo(6),
    revenueImpact: 8000,
  },
  {
    id: 4,
    institution: "Oakwood International",
    previousPlan: "Premium",
    newPlan: "Enterprise",
    changeType: "Upgrade",
    date: daysAgo(9),
    revenueImpact: 22000,
  },
  {
    id: 5,
    institution: "Crescent Public School",
    previousPlan: "Premium",
    newPlan: "Standard",
    changeType: "Downgrade",
    date: daysAgo(11),
    revenueImpact: -15000,
  },
  {
    id: 6,
    institution: "Pinewood High School",
    previousPlan: "Basic",
    newPlan: "Standard",
    changeType: "Upgrade",
    date: daysAgo(14),
    revenueImpact: 6500,
  },
];

const TOP_INSTITUTIONS_BY_REVENUE = [
  { rank: 1, institution: "Horizon Global School", plan: "Enterprise", value: 576000, renewalDate: daysFromNow(52), status: "Active" },
  { rank: 2, institution: "Green Valley Public School", plan: "Enterprise", value: 540000, renewalDate: daysFromNow(38), status: "Active" },
  { rank: 3, institution: "Emerald Heights School", plan: "Enterprise", value: 558000, renewalDate: daysAgo(4), status: "Expired" },
  { rank: 4, institution: "Sunrise International School", plan: "Premium", value: 336000, renewalDate: daysFromNow(11), status: "Renewing Soon" },
  { rank: 5, institution: "St. Xavier's Academy", plan: "Premium", value: 324000, renewalDate: daysFromNow(9), status: "Renewing Soon" },
  { rank: 6, institution: "Riverside Convent School", plan: "Premium", value: 318000, renewalDate: daysFromNow(60), status: "Active" },
];

const INSIGHTS = [
  { label: "Highest Revenue-Generating Plan", value: "Premium (₹24.5L MRR)", icon: FiDollarSign },
  { label: "Fastest-Growing Plan", value: "Enterprise (+21.5% MoM)", icon: FiTrendingUp },
  { label: "Highest Renewal Rate", value: "Enterprise (93%)", icon: FiAward },
  { label: "Highest Churn Plan", value: "Basic (8.2%)", icon: FiTrendingDown },
  { label: "Month-over-Month Revenue Growth", value: "+2.0%", icon: FiZap },
  { label: "Total Active Institutions", value: "457 institutions", icon: FiHome },
  { label: "Average Subscription Value", value: "₹15.6K per institution", icon: FiStar },
];

const RECENT_ACTIVITY = [
  { id: 1, type: "New Subscription", institution: "Oakwood International", description: "Subscribed to the Standard plan on a monthly billing cycle.", date: daysAgo(0), icon: FiPlusCircle, color: "text-blue-600 bg-blue-100" },
  { id: 2, type: "Subscription Renewed", institution: "Green Valley Public School", description: "Renewed the Enterprise plan for another 12 months.", date: daysAgo(1), icon: FiRefreshCcw, color: "text-green-600 bg-green-100" },
  { id: 3, type: "Plan Upgraded", institution: "Blue Bells High School", description: "Upgraded from Standard to Premium plan.", date: daysAgo(2), icon: FiArrowUpCircle, color: "text-purple-600 bg-purple-100" },
  { id: 4, type: "Plan Downgraded", institution: "Silver Oak School", description: "Downgraded from Standard to Basic plan.", date: daysAgo(3), icon: FiArrowDownCircle, color: "text-amber-600 bg-amber-100" },
  { id: 5, type: "Payment Completed", institution: "Maple Leaf Academy", description: "Payment of ₹11,500 completed successfully via UPI.", date: daysAgo(3), icon: FiCreditCard, color: "text-indigo-600 bg-indigo-100" },
  { id: 6, type: "Subscription Cancelled", institution: "Crescent Public School", description: "Cancelled the Basic plan, citing pricing concerns.", date: daysAgo(4), icon: FiXCircle, color: "text-red-600 bg-red-100" },
  { id: 7, type: "Subscription Expired", institution: "Emerald Heights School", description: "Enterprise plan expired without renewal confirmation.", date: daysAgo(4), icon: FiAlertTriangle, color: "text-gray-600 bg-gray-200" },
];

// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------
const formatCurrency = (value) => {
  if (!value && value !== 0) return "—";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(2)}Cr`;
  if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(1)}L`;
  if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(1)}K`;
  return `${sign}₹${abs}`;
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

const getSubscriptionStatusBadgeClasses = (status) => {
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

const getPaymentStatusBadgeClasses = (status) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-amber-100 text-amber-700";
    case "Failed":
      return "bg-red-100 text-red-700";
    case "Refunded":
      return "bg-indigo-100 text-indigo-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getChangeTypeBadgeClasses = (type) =>
  type === "Upgrade"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

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

const getDaysRemainingLabel = (days) => {
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "Due today";
  return `${days}d left`;
};

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const SubscriptionReports = () => {
  const [dateRange, setDateRange] = useState("This Month");

  // Filters (draft vs applied) - applied to the Main Report Table
  const [draftFilters, setDraftFilters] = useState({
    search: "",
    plan: "All Plans",
    status: "All Status",
    billingCycle: "All Cycles",
    paymentStatus: "All Payment Status",
    dateFrom: "",
    dateTo: "",
    institutionType: "All Types",
  });
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

  // Sorting
  const [sortField, setSortField] = useState("startDate");
  const [sortDirection, setSortDirection] = useState("desc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_DEFAULT);

  // Modals
  const [viewSubscription, setViewSubscription] = useState(null);
  const [viewTopInstitution, setViewTopInstitution] = useState(null);

  // Reminder toggle (dummy interactivity for renewal table)
  const [remindedIds, setRemindedIds] = useState([]);
  const toggleReminder = (id) => {
    setRemindedIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

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
      plan: "All Plans",
      status: "All Status",
      billingCycle: "All Cycles",
      paymentStatus: "All Payment Status",
      dateFrom: "",
      dateTo: "",
      institutionType: "All Types",
    };
    setDraftFilters(cleared);
    setAppliedFilters(cleared);
    setCurrentPage(1);
  };

  // --------------------------------------------------------------
  // Filtering
  // --------------------------------------------------------------
  const filteredSubscriptions = useMemo(() => {
    return ALL_SUBSCRIPTIONS.filter((row) => {
      const matchesSearch = row.institution
        .toLowerCase()
        .includes(appliedFilters.search.toLowerCase());
      const matchesPlan =
        appliedFilters.plan === "All Plans" || row.plan === appliedFilters.plan;
      const matchesStatus =
        appliedFilters.status === "All Status" || row.status === appliedFilters.status;
      const matchesBilling =
        appliedFilters.billingCycle === "All Cycles" ||
        row.billingCycle === appliedFilters.billingCycle;
      const matchesPayment =
        appliedFilters.paymentStatus === "All Payment Status" ||
        row.paymentStatus === appliedFilters.paymentStatus;
      const matchesType =
        appliedFilters.institutionType === "All Types" ||
        row.institutionType === appliedFilters.institutionType;
      const matchesFrom =
        !appliedFilters.dateFrom || row.startDate >= appliedFilters.dateFrom;
      const matchesTo = !appliedFilters.dateTo || row.startDate <= appliedFilters.dateTo;

      return (
        matchesSearch &&
        matchesPlan &&
        matchesStatus &&
        matchesBilling &&
        matchesPayment &&
        matchesType &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [appliedFilters]);

  // --------------------------------------------------------------
  // Sorting
  // --------------------------------------------------------------
  const sortedSubscriptions = useMemo(() => {
    const sorted = [...filteredSubscriptions].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredSubscriptions, sortField, sortDirection]);

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
    return sortDirection === "asc" ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />;
  };

  // --------------------------------------------------------------
  // Pagination
  // --------------------------------------------------------------
  const totalPages = Math.max(1, Math.ceil(sortedSubscriptions.length / rowsPerPage));
  const paginatedSubscriptions = sortedSubscriptions.slice(
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
  const totalSubscriptions = ALL_SUBSCRIPTIONS.length;
  const activeSubscriptions = ALL_SUBSCRIPTIONS.filter((s) => s.status === "Active").length;
  const newSubscriptions = ALL_SUBSCRIPTIONS.filter(
    (s) => new Date(s.startDate) >= daysAgoDate(30)
  ).length;
  const renewalsCount = ALL_SUBSCRIPTIONS.reduce(
    (sum, s) => sum + s.renewalHistory.length,
    0
  );
  const cancelledSubscriptions = ALL_SUBSCRIPTIONS.filter(
    (s) => s.status === "Cancelled"
  ).length;
  const totalRevenue = MONTHLY_REVENUE_REPORT.reduce((sum, m) => sum + m.total, 0);

  function daysAgoDate(n) {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return d;
  }

  const summaryCards = [
    {
      label: "Total Subscriptions",
      value: totalSubscriptions,
      description: "All subscriptions on record",
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
      label: "New Subscriptions",
      value: newSubscriptions,
      description: "Started in the last 30 days",
      icon: FiUserPlus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "up",
      trendValue: "9.1%",
    },
    {
      label: "Renewals",
      value: renewalsCount,
      description: "Successful renewals recorded",
      icon: FiRefreshCcw,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      trend: "up",
      trendValue: "5.6%",
    },
    {
      label: "Cancelled Subscriptions",
      value: cancelledSubscriptions,
      description: "Ended before renewal",
      icon: FiXCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      trend: "down",
      trendValue: "1.4%",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      description: "Across the reporting period",
      icon: FiDollarSign,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "up",
      trendValue: "8.4%",
    },
  ];

  // --------------------------------------------------------------
  // Revenue Report chart scaling
  // --------------------------------------------------------------
  const maxMonthlyTotal = Math.max(...MONTHLY_REVENUE_REPORT.map((m) => m.total));
  const latestMonth = MONTHLY_REVENUE_REPORT[MONTHLY_REVENUE_REPORT.length - 1];

  // --------------------------------------------------------------
  // Renewal report mini stats
  // --------------------------------------------------------------
  const renewalsDueToday = RENEWAL_REPORT_ROWS.filter((r) => r.daysRemaining === 0).length;
  const renewalsDueThisWeek = RENEWAL_REPORT_ROWS.filter((r) => r.daysRemaining <= 7).length;
  const renewalsDueThisMonth = RENEWAL_REPORT_ROWS.filter((r) => r.daysRemaining <= 30).length;
  const successfullyRenewed = 84;
  const failedRenewals = 6;
  const renewalRate = ((successfullyRenewed / (successfullyRenewed + failedRenewals)) * 100).toFixed(1);

  // --------------------------------------------------------------
  // Cancellation report stats
  // --------------------------------------------------------------
  const totalCancellations = PLAN_WISE_REPORT.reduce((sum, p) => sum + p.cancelled, 0);
  const totalAllSubscribers = PLAN_WISE_REPORT.reduce((sum, p) => sum + p.totalSubscribers, 0);
  const cancellationRate = ((totalCancellations / totalAllSubscribers) * 100).toFixed(1);
  const mostCancelledPlan = [...PLAN_WISE_REPORT].sort((a, b) => b.cancelled - a.cancelled)[0];

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* -------------------------------------------------- */}
      {/* Page Header */}
      {/* -------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Subscription Reports
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            View detailed subscription, revenue, renewal, and plan performance
            reports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
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
          <div className="relative">
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
            value={draftFilters.paymentStatus}
            onChange={(e) => updateDraftFilter("paymentStatus", e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {PAYMENT_FILTER_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            value={draftFilters.institutionType}
            onChange={(e) => updateDraftFilter("institutionType", e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {INSTITUTION_TYPE_FILTER_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 md:col-span-2">
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
      {/* Main Report Table */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">
            Subscription Report
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
                    Subscription ID <SortIcon field="id" />
                  </span>
                </th>
                <th
                  onClick={() => handleSort("institution")}
                  className="px-5 py-3 font-semibold whitespace-nowrap cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1">
                    Institution <SortIcon field="institution" />
                  </span>
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Plan</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Billing Cycle
                </th>
                <th
                  onClick={() => handleSort("startDate")}
                  className="px-5 py-3 font-semibold whitespace-nowrap cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1">
                    Start Date <SortIcon field="startDate" />
                  </span>
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Renewal Date
                </th>
                <th
                  onClick={() => handleSort("totalAmount")}
                  className="px-5 py-3 font-semibold whitespace-nowrap cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1">
                    Amount <SortIcon field="totalAmount" />
                  </span>
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Payment Status
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-5 py-3 font-semibold whitespace-nowrap cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1">
                    Subscription Status <SortIcon field="status" />
                  </span>
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Assigned Plan
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedSubscriptions.length > 0 ? (
                paginatedSubscriptions.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-purple-50/40 transition-colors duration-150"
                  >
                    <td className="px-5 py-4 font-medium text-purple-600 whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">{row.institution}</p>
                      <p className="text-xs text-gray-400">{row.institutionId}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                        <span className={`w-2 h-2 rounded-full ${getPlanDotColor(row.plan)}`} />
                        {row.plan}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {row.billingCycle}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(row.startDate)}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(row.renewalDate)}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                      {formatCurrency(row.totalAmount)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPaymentStatusBadgeClasses(
                          row.paymentStatus
                        )}`}
                      >
                        {row.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getSubscriptionStatusBadgeClasses(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                        <span
                          className={`w-2 h-2 rounded-full ${getPlanDotColor(row.assignedPlan)}`}
                        />
                        {row.assignedPlan}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => setViewSubscription(row)}
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
                  <td colSpan={11} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="bg-purple-50 text-purple-400 p-4 rounded-full mb-3">
                        <FiInbox size={26} />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        No subscriptions found
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
        {sortedSubscriptions.length > 0 && (
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
                {Math.min(currentPage * rowsPerPage, sortedSubscriptions.length)} of{" "}
                {sortedSubscriptions.length}
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
      {/* Revenue Report */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <FiBarChart2 className="text-purple-600" size={18} />
              Revenue Report
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Monthly revenue breakdown over the last 6 months
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-400">Total Revenue</p>
              <p className="font-semibold text-gray-800">
                {formatCurrency(latestMonth.total)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Recurring</p>
              <p className="font-semibold text-gray-800">
                {formatCurrency(latestMonth.recurring)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Renewal</p>
              <p className="font-semibold text-gray-800">
                {formatCurrency(latestMonth.renewal)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">New Subscriptions</p>
              <p className="font-semibold text-gray-800">
                {formatCurrency(latestMonth.newSub)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Refunds</p>
              <p className="font-semibold text-red-500">
                -{formatCurrency(latestMonth.refunds)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Total Revenue
          </span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Recurring
          </span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Renewal
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 h-48">
          {MONTHLY_REVENUE_REPORT.map((item) => (
            <div
              key={item.month}
              className="flex-1 flex flex-col items-center justify-end h-full gap-1.5"
            >
              <div className="flex items-end gap-1 h-full w-full justify-center">
                <div
                  style={{ height: `${(item.total / maxMonthlyTotal) * 100}%` }}
                  className="w-2.5 sm:w-3 rounded-t-md bg-purple-600"
                  title={`Total: ${formatCurrency(item.total)}`}
                />
                <div
                  style={{ height: `${(item.recurring / maxMonthlyTotal) * 100}%` }}
                  className="w-2.5 sm:w-3 rounded-t-md bg-indigo-400"
                  title={`Recurring: ${formatCurrency(item.recurring)}`}
                />
                <div
                  style={{ height: `${(item.renewal / maxMonthlyTotal) * 100}%` }}
                  className="w-2.5 sm:w-3 rounded-t-md bg-green-500"
                  title={`Renewal: ${formatCurrency(item.renewal)}`}
                />
              </div>
              <p className="text-xs text-gray-400">{item.month}</p>
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* Plan-wise Report */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <FiLayers className="text-purple-600" size={18} />
            Plan-wise Report
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Plan</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Total Subscribers
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Active</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">New</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Renewed</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Cancelled
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Revenue</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Renewal Rate
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Churn Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PLAN_WISE_REPORT.map((plan) => (
                <tr
                  key={plan.plan}
                  className="hover:bg-purple-50/40 transition-colors duration-150"
                >
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                      <span className={`w-2.5 h-2.5 rounded-full ${getPlanDotColor(plan.plan)}`} />
                      {plan.plan}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {plan.totalSubscribers}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {plan.active}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {plan.newCount}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {plan.renewed}
                  </td>
                  <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                    {plan.cancelled}
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {formatCurrency(plan.revenue)}
                  </td>
                  <td className="px-5 py-4 text-green-600 font-medium whitespace-nowrap">
                    {plan.renewalRate}%
                  </td>
                  <td className="px-5 py-4 text-red-500 font-medium whitespace-nowrap">
                    {plan.churnRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* Renewal Report */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
          <FiClock className="text-purple-600" size={18} />
          Renewal Report
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-purple-50/60">
            <p className="text-xs text-gray-400">Due Today</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{renewalsDueToday}</p>
          </div>
          <div className="p-4 rounded-xl bg-blue-50/60">
            <p className="text-xs text-gray-400">Due This Week</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{renewalsDueThisWeek}</p>
          </div>
          <div className="p-4 rounded-xl bg-indigo-50/60">
            <p className="text-xs text-gray-400">Due This Month</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{renewalsDueThisMonth}</p>
          </div>
          <div className="p-4 rounded-xl bg-green-50/60">
            <p className="text-xs text-gray-400">Successfully Renewed</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{successfullyRenewed}</p>
          </div>
          <div className="p-4 rounded-xl bg-red-50/60">
            <p className="text-xs text-gray-400">Failed Renewals</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{failedRenewals}</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/60">
            <p className="text-xs text-gray-400">Renewal Rate</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{renewalRate}%</p>
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
                  Plan
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap">
                  Renewal Date
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap">
                  Amount
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap">
                  Days Remaining
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 sm:px-6 py-3 font-semibold whitespace-nowrap text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RENEWAL_REPORT_ROWS.map((row) => {
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
                        <span className={`w-2 h-2 rounded-full ${getPlanDotColor(row.plan)}`} />
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
                        className={`text-xs font-medium ${
                          row.daysRemaining <= 7 ? "text-amber-600" : "text-gray-500"
                        }`}
                      >
                        {getDaysRemainingLabel(row.daysRemaining)}
                      </span>
                    </td>
                    <td className="px-5 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getSubscriptionStatusBadgeClasses(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 sm:px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => toggleReminder(row.id)}
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 ${
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
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* Cancellation Report */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FiAlertTriangle className="text-red-500" size={18} />
            Cancellation Report
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Cancellations</span>
              <span className="text-sm font-semibold text-gray-800">
                {totalCancellations}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Cancellation Rate</span>
              <span className="text-sm font-semibold text-red-500">
                {cancellationRate}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Most Cancelled Plan</span>
              <span className="text-sm font-semibold text-gray-800">
                {mostCancelledPlan.plan}
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
          </div>
        </div>

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
                  <span className="text-gray-600 font-medium">{item.reason}</span>
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
      {/* Upgrade / Downgrade Report */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <FiArrowUpCircle className="text-purple-600" size={18} />
            Upgrade / Downgrade Report
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Institution
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Previous Plan
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  New Plan
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Change Type
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Date</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Revenue Impact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {UPGRADE_DOWNGRADE_ROWS.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-purple-50/40 transition-colors duration-150"
                >
                  <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {row.institution}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                      <span className={`w-2 h-2 rounded-full ${getPlanDotColor(row.previousPlan)}`} />
                      {row.previousPlan}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                      <span className={`w-2 h-2 rounded-full ${getPlanDotColor(row.newPlan)}`} />
                      {row.newPlan}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${getChangeTypeBadgeClasses(
                        row.changeType
                      )}`}
                    >
                      {row.changeType}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                    {formatDate(row.date)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium flex items-center gap-1 ${
                        row.revenueImpact >= 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {row.revenueImpact >= 0 ? (
                        <FiTrendingUp size={12} />
                      ) : (
                        <FiTrendingDown size={12} />
                      )}
                      {formatCurrency(row.revenueImpact)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* Top Institutions by Revenue */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <FiAward className="text-purple-600" size={18} />
            Top Institutions by Revenue
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
              {TOP_INSTITUTIONS_BY_REVENUE.map((inst) => (
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
                      <span className={`w-2 h-2 rounded-full ${getPlanDotColor(inst.plan)}`} />
                      {inst.plan}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                    {formatCurrency(inst.value)}
                  </td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                    {formatDate(inst.renewalDate)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${getSubscriptionStatusBadgeClasses(
                        inst.status
                      )}`}
                    >
                      {inst.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => setViewTopInstitution(inst)}
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
      {/* Report Insights + Recent Subscription Activity */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FiZap className="text-purple-600" size={18} />
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

        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FiActivity className="text-purple-600" size={18} />
            Recent Subscription Activity
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
      {/* Subscription Detail Modal */}
      {/* -------------------------------------------------- */}
      {viewSubscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {viewSubscription.institution}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{viewSubscription.id}</p>
              </div>
              <button
                onClick={() => setViewSubscription(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-6">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getSubscriptionStatusBadgeClasses(
                    viewSubscription.status
                  )}`}
                >
                  {viewSubscription.status}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPaymentStatusBadgeClasses(
                    viewSubscription.paymentStatus
                  )}`}
                >
                  {viewSubscription.paymentStatus}
                </span>
              </div>

              {/* Institution */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiHome className="text-purple-600" size={15} />
                  Institution
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Institution Name</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSubscription.institution}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiHash size={11} /> Institution ID
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSubscription.institutionId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiUser size={11} /> Contact Person
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSubscription.contactPerson}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiMail size={11} /> Email
                    </p>
                    <p className="text-sm font-medium text-gray-800 break-all">
                      {viewSubscription.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiPhone size={11} /> Phone
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSubscription.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiTag className="text-purple-600" size={15} />
                  Subscription
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Subscription ID</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSubscription.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Current Plan</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSubscription.plan}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Billing Cycle</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSubscription.billingCycle}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiCalendar size={11} /> Start Date
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewSubscription.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Renewal Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewSubscription.renewalDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiDollarSign className="text-purple-600" size={15} />
                  Financial
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Subscription Amount</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatCurrency(viewSubscription.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Tax</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatCurrency(viewSubscription.tax)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Discount</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSubscription.discount
                        ? `- ${formatCurrency(viewSubscription.discount)}`
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total Amount</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formatCurrency(viewSubscription.totalAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiCreditCard size={11} /> Payment Method
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSubscription.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiActivity className="text-purple-600" size={15} />
                  Activity
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Created Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewSubscription.createdDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Last Payment</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewSubscription.lastPayment)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Last Plan Change</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewSubscription.lastPlanChange)}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-2">Renewal History</p>
                <div className="space-y-2">
                  {viewSubscription.renewalHistory.map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm bg-gray-50 rounded-xl px-4 py-2.5"
                    >
                      <span className="text-gray-600">{formatDate(entry.date)}</span>
                      <span className="font-medium text-gray-800">
                        {formatCurrency(entry.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewSubscription(null)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* Top Institution View Modal */}
      {/* -------------------------------------------------- */}
      {viewTopInstitution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                {viewTopInstitution.institution}
              </h3>
              <button
                onClick={() => setViewTopInstitution(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getSubscriptionStatusBadgeClasses(
                    viewTopInstitution.status
                  )}`}
                >
                  {viewTopInstitution.status}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <span
                    className={`w-2 h-2 rounded-full ${getPlanDotColor(viewTopInstitution.plan)}`}
                  />
                  {viewTopInstitution.plan} Plan
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiAward size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Revenue Rank</p>
                    <p className="text-sm font-medium text-gray-800">
                      #{viewTopInstitution.rank}
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
                      {formatCurrency(viewTopInstitution.value)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiCalendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Renewal Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewTopInstitution.renewalDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewTopInstitution(null)}
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

export default SubscriptionReports;