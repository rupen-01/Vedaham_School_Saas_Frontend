
import React, { useState, useMemo } from "react";
import {
  FiLayers,
  FiHome,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiRefreshCcw,
  FiAlertTriangle,
  FiSearch,
  FiBarChart2,
  FiPieChart,
  FiAward,
  FiClock,
  FiEye,
  FiMoreVertical,
  FiInbox,
  FiCalendar,
} from "react-icons/fi";
 
// ------------------------------------------------------------------
// Dummy Data
// ------------------------------------------------------------------
const PLAN_TYPES = ["Basic", "Standard", "Premium", "Enterprise"];
const BILLING_CYCLES = ["Monthly", "Yearly"];
const STATUSES = ["Active", "Expired", "Renewing Soon", "Cancelled"];
 
const INSTITUTION_ANALYTICS = [
  {
    id: 1,
    institution: "Green Valley Public School",
    plan: "Enterprise",
    students: 2450,
    amount: 45000,
    renewalDate: "2024-08-14",
    billingCycle: "Yearly",
    status: "Active",
    revenue: 540000,
  },
  {
    id: 2,
    institution: "Sunrise International School",
    plan: "Premium",
    students: 1680,
    amount: 28000,
    renewalDate: "2024-06-02",
    billingCycle: "Yearly",
    status: "Renewing Soon",
    revenue: 336000,
  },
  {
    id: 3,
    institution: "Blue Bells High School",
    plan: "Standard",
    students: 980,
    amount: 12000,
    renewalDate: "2024-05-28",
    billingCycle: "Monthly",
    status: "Active",
    revenue: 144000,
  },
  {
    id: 4,
    institution: "St. Xavier's Academy",
    plan: "Premium",
    students: 1520,
    amount: 27000,
    renewalDate: "2024-05-30",
    billingCycle: "Monthly",
    status: "Renewing Soon",
    revenue: 324000,
  },
  {
    id: 5,
    institution: "Silver Oak School",
    plan: "Basic",
    students: 410,
    amount: 6000,
    renewalDate: "2024-04-18",
    billingCycle: "Monthly",
    status: "Expired",
    revenue: 72000,
  },
  {
    id: 6,
    institution: "Maple Leaf Academy",
    plan: "Standard",
    students: 860,
    amount: 11500,
    renewalDate: "2024-09-10",
    billingCycle: "Yearly",
    status: "Active",
    revenue: 138000,
  },
  {
    id: 7,
    institution: "Horizon Global School",
    plan: "Enterprise",
    students: 3120,
    amount: 48000,
    renewalDate: "2024-07-22",
    billingCycle: "Yearly",
    status: "Active",
    revenue: 576000,
  },
  {
    id: 8,
    institution: "Crescent Public School",
    plan: "Basic",
    students: 320,
    amount: 5500,
    renewalDate: "2024-03-30",
    billingCycle: "Monthly",
    status: "Cancelled",
    revenue: 66000,
  },
  {
    id: 9,
    institution: "Riverside Convent School",
    plan: "Premium",
    students: 1440,
    amount: 26500,
    renewalDate: "2024-06-15",
    billingCycle: "Yearly",
    status: "Active",
    revenue: 318000,
  },
  {
    id: 10,
    institution: "Oakwood International",
    plan: "Standard",
    students: 940,
    amount: 12500,
    renewalDate: "2024-05-26",
    billingCycle: "Monthly",
    status: "Renewing Soon",
    revenue: 150000,
  },
  {
    id: 11,
    institution: "Pinewood High School",
    plan: "Basic",
    students: 380,
    amount: 5800,
    renewalDate: "2024-05-24",
    billingCycle: "Monthly",
    status: "Active",
    revenue: 69600,
  },
  {
    id: 12,
    institution: "Emerald Heights School",
    plan: "Enterprise",
    students: 2890,
    amount: 46500,
    renewalDate: "2024-04-05",
    billingCycle: "Yearly",
    status: "Expired",
    revenue: 558000,
  },
];
 
const MONTHLY_REVENUE_TREND = [
  { month: "Nov", revenue: 182000 },
  { month: "Dec", revenue: 195000 },
  { month: "Jan", revenue: 210000 },
  { month: "Feb", revenue: 204000 },
  { month: "Mar", revenue: 228000 },
  { month: "Apr", revenue: 236000 },
  { month: "May", revenue: 249000 },
];
 
const RECENT_RENEWALS = [
  {
    id: 1,
    institution: "Blue Bells High School",
    plan: "Standard",
    amount: 12000,
    renewalDate: "2024-05-15",
    status: "Active",
  },
  {
    id: 2,
    institution: "Green Valley Public School",
    plan: "Enterprise",
    amount: 45000,
    renewalDate: "2024-05-12",
    status: "Active",
  },
  {
    id: 3,
    institution: "Riverside Convent School",
    plan: "Premium",
    amount: 26500,
    renewalDate: "2024-05-09",
    status: "Active",
  },
  {
    id: 4,
    institution: "Maple Leaf Academy",
    plan: "Standard",
    amount: 11500,
    renewalDate: "2024-05-04",
    status: "Renewing Soon",
  },
  {
    id: 5,
    institution: "Pinewood High School",
    plan: "Basic",
    amount: 5800,
    renewalDate: "2024-04-28",
    status: "Active",
  },
];
 
const INSTITUTION_FILTER_OPTIONS = [
  "All Institutions",
  ...Array.from(new Set(INSTITUTION_ANALYTICS.map((i) => i.institution))),
];
const PLAN_FILTER_OPTIONS = ["All Plans", ...PLAN_TYPES];
const STATUS_FILTER_OPTIONS = ["All Status", ...STATUSES];
const BILLING_FILTER_OPTIONS = ["All Cycles", ...BILLING_CYCLES];
const DATE_RANGE_OPTIONS = [
  "All Time",
  "Last 30 Days",
  "Last 3 Months",
  "Last 6 Months",
  "This Year",
];
 
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
 
const getStatusBadgeClasses = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";
    case "Expired":
      return "bg-red-100 text-red-700";
    case "Renewing Soon":
      return "bg-amber-100 text-amber-700";
    case "Cancelled":
      return "bg-gray-200 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
 
const getPlanBarColor = (plan) => {
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
 
// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const PlanAnalytics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [billingFilter, setBillingFilter] = useState("All Cycles");
  const [dateRangeFilter, setDateRangeFilter] = useState("All Time");
 
  // --------------------------------------------------------------
  // Filtering
  // --------------------------------------------------------------
  const filteredInstitutions = useMemo(() => {
    return INSTITUTION_ANALYTICS.filter((item) => {
      const matchesSearch = item.institution
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPlan = planFilter === "All Plans" || item.plan === planFilter;
      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;
      const matchesBilling =
        billingFilter === "All Cycles" || item.billingCycle === billingFilter;
 
      return matchesSearch && matchesPlan && matchesStatus && matchesBilling;
    });
  }, [searchTerm, planFilter, statusFilter, billingFilter]);
 
  const resetFilters = () => {
    setSearchTerm("");
    setPlanFilter("All Plans");
    setStatusFilter("All Status");
    setBillingFilter("All Cycles");
    setDateRangeFilter("All Time");
  };
 
  // --------------------------------------------------------------
  // Analytics Calculations
  // --------------------------------------------------------------
  const totalActivePlans = INSTITUTION_ANALYTICS.filter(
    (i) => i.status === "Active"
  ).length;
  const totalInstitutions = INSTITUTION_ANALYTICS.length;
 
  const monthlyRevenue = MONTHLY_REVENUE_TREND[MONTHLY_REVENUE_TREND.length - 1]
    .revenue;
  const previousMonthRevenue =
    MONTHLY_REVENUE_TREND[MONTHLY_REVENUE_TREND.length - 2].revenue;
  const revenueGrowth = (
    ((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue) *
    100
  ).toFixed(1);
 
  const annualRevenue = INSTITUTION_ANALYTICS.reduce(
    (sum, i) => sum + i.revenue,
    0
  );
 
  const renewingCount = INSTITUTION_ANALYTICS.filter(
    (i) => i.status === "Renewing Soon"
  ).length;
  const cancelledOrExpiredCount = INSTITUTION_ANALYTICS.filter(
    (i) => i.status === "Cancelled" || i.status === "Expired"
  ).length;
  const renewalRate = (
    ((totalInstitutions - cancelledOrExpiredCount) / totalInstitutions) *
    100
  ).toFixed(0);
 
  const expiringPlansCount = renewingCount;
 
  const analyticsCards = [
    {
      label: "Total Active Plans",
      value: totalActivePlans,
      description: "Currently active subscriptions",
      icon: FiLayers,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "up",
      trendValue: "4.2%",
    },
    {
      label: "Total Institutions",
      value: totalInstitutions,
      description: "Onboarded on the platform",
      icon: FiHome,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "up",
      trendValue: "2.8%",
    },
    {
      label: "Monthly Revenue",
      value: formatCurrency(monthlyRevenue),
      description: "Revenue generated this month",
      icon: FiDollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trend: revenueGrowth >= 0 ? "up" : "down",
      trendValue: `${Math.abs(revenueGrowth)}%`,
    },
    {
      label: "Annual Revenue",
      value: formatCurrency(annualRevenue),
      description: "Projected revenue this year",
      icon: FiBarChart2,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      trend: "up",
      trendValue: "12.6%",
    },
    {
      label: "Renewal Rate",
      value: `${renewalRate}%`,
      description: "Institutions renewing on time",
      icon: FiRefreshCcw,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "up",
      trendValue: "3.1%",
    },
    {
      label: "Expiring Plans",
      value: expiringPlansCount,
      description: "Plans expiring within 30 days",
      icon: FiAlertTriangle,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      trend: "down",
      trendValue: "1.4%",
    },
  ];
 
  // --------------------------------------------------------------
  // Plan Distribution
  // --------------------------------------------------------------
  const planDistribution = useMemo(() => {
    return PLAN_TYPES.map((plan) => {
      const institutionsOnPlan = INSTITUTION_ANALYTICS.filter(
        (i) => i.plan === plan
      );
      const percentage = (
        (institutionsOnPlan.length / INSTITUTION_ANALYTICS.length) *
        100
      ).toFixed(0);
      return {
        plan,
        count: institutionsOnPlan.length,
        percentage: Number(percentage),
      };
    });
  }, []);
 
  // --------------------------------------------------------------
  // Top Performing Plans
  // --------------------------------------------------------------
  const topPerformingPlans = useMemo(() => {
    return PLAN_TYPES.map((plan) => {
      const institutionsOnPlan = INSTITUTION_ANALYTICS.filter(
        (i) => i.plan === plan
      );
      const totalPlanRevenue = institutionsOnPlan.reduce(
        (sum, i) => sum + i.revenue,
        0
      );
      const renewals = institutionsOnPlan.filter(
        (i) => i.status === "Active" || i.status === "Renewing Soon"
      ).length;
      return {
        plan,
        revenue: totalPlanRevenue,
        subscribers: institutionsOnPlan.length,
        renewals,
        growth: (Math.random() * 10 + 2).toFixed(1),
      };
    })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, []);
 
  // --------------------------------------------------------------
  // Revenue chart scaling
  // --------------------------------------------------------------
  const maxMonthlyRevenue = Math.max(
    ...MONTHLY_REVENUE_TREND.map((m) => m.revenue)
  );
 
  return (
    <div className="flex flex-col w-full min-w-0 p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* -------------------------------------------------- */}
      {/* Page Header */}
      {/* -------------------------------------------------- */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Plan Analytics
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Analyze subscription plans, revenue trends, and institution growth.
        </p>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Analytics Cards */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 w-full min-w-0">
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
      {/* Filters */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search institution..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
 
          {/* Plan Type */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {PLAN_FILTER_OPTIONS.map((p) => (
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
 
          {/* Billing Cycle */}
          <select
            value={billingFilter}
            onChange={(e) => setBillingFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {BILLING_FILTER_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
 
          {/* Date Range */}
          <select
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {DATE_RANGE_OPTIONS.map((d) => (
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
      {/* Revenue Analytics + Plan Distribution */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <FiBarChart2 className="text-purple-600" size={18} />
                Revenue Overview
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Monthly revenue trend across the last 7 months
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-400">Monthly</p>
                <p className="font-semibold text-gray-800">
                  {formatCurrency(monthlyRevenue)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Yearly</p>
                <p className="font-semibold text-gray-800">
                  {formatCurrency(annualRevenue)}
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
 
          {/* Simple bar chart built with Tailwind (no external chart library) */}
          <div className="flex items-end justify-between gap-3 h-48">
            {MONTHLY_REVENUE_TREND.map((item, index) => {
              const heightPercentage = (item.revenue / maxMonthlyRevenue) * 100;
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
 
        {/* Plan Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiPieChart className="text-purple-600" size={18} />
            Plan Distribution
          </h3>
          <p className="text-xs text-gray-400 mb-5">
            Institutions grouped by subscription plan
          </p>
 
          <div className="space-y-5">
            {planDistribution.map((item) => (
              <div key={item.plan}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${getPlanDotColor(
                        item.plan
                      )}`}
                    />
                    <span className="text-gray-700 font-medium">{item.plan}</span>
                  </div>
                  <span className="text-gray-500">
                    {item.count} schools ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className={`h-full rounded-full ${getPlanBarColor(item.plan)} transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Top Performing Plans + Recent Renewals */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
        {/* Top Performing Plans */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiAward className="text-purple-600" size={18} />
            Top Performing Plans
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Ranked by revenue, subscribers, and renewals
          </p>
 
          <div className="space-y-3">
            {topPerformingPlans.map((item, index) => (
              <div
                key={item.plan}
                className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100 hover:bg-purple-50/40 transition-colors duration-150"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-semibold">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.plan}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.subscribers} subscribers · {item.renewals} renewals
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {formatCurrency(item.revenue)}
                  </p>
                  <p className="text-xs text-green-600 flex items-center justify-end gap-1">
                    <FiTrendingUp size={12} />
                    {item.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Recent Renewals */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FiClock className="text-purple-600" size={18} />
            Recent Renewals
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Latest subscription renewals
          </p>
 
          <div className="space-y-4">
            {RECENT_RENEWALS.map((renewal) => (
              <div
                key={renewal.id}
                className="flex items-start justify-between gap-2 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {renewal.institution}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {renewal.plan} · {formatDate(renewal.renewalDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {formatCurrency(renewal.amount)}
                  </p>
                  <span
                    className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${getStatusBadgeClasses(
                      renewal.status
                    )}`}
                  >
                    {renewal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Institution Analytics Table */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full min-w-0 border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">
            Institution Analytics
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Detailed subscription and revenue breakdown per institution
          </p>
        </div>
 
        <div className="overflow-x-auto w-full min-w-0">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Institution
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Current Plan
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Students
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Subscription Amount
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Renewal Date
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Billing Cycle
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Revenue
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInstitutions.length > 0 ? (
                filteredInstitutions.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-purple-50/40 transition-colors duration-150"
                  >
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">
                        {item.institution}
                      </p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                        <span
                          className={`w-2 h-2 rounded-full ${getPlanDotColor(
                            item.plan
                          )}`}
                        />
                        {item.plan}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {item.students.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(item.renewalDate)}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {item.billingCycle}
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
                    <td className="px-5 py-4 font-medium text-gray-800 whitespace-nowrap">
                      {formatCurrency(item.revenue)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          title="View"
                          className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-200"
                        >
                          <FiEye size={14} />
                        </button>
                        <button
                          title="More options"
                          className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-600 hover:text-white transition-colors duration-200"
                        >
                          <FiMoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="bg-purple-50 text-purple-400 p-4 rounded-full mb-3">
                        <FiInbox size={26} />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        No analytics data found
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Try adjusting your filters to see institution results.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
 
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400 flex items-center gap-1.5">
          <FiCalendar size={12} />
          Showing {filteredInstitutions.length} of {INSTITUTION_ANALYTICS.length}{" "}
          institutions
        </div>
      </div>
    </div>
  );
};
 
export default PlanAnalytics;