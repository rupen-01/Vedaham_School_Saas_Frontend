// src/pages/plans/PlanAnalytics.jsx
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
} from "react-icons/fi";

import ApiConfig from "../../config/ApiConfig";
import { useGetApi } from "../../utils/useApi";

// --------------------------------------------------
// Static filter data (kept for dropdown options)
// --------------------------------------------------
const PLAN_TYPES = ["Basic", "Standard", "Premium", "Enterprise"];
const BILLING_CYCLES = ["Monthly", "Yearly"];
const STATUSES = ["Active", "Expired", "Renewing Soon", "Cancelled"];

const INSTITUTION_FILTER_OPTIONS = [
  "All Institutions",
  // will be filled dynamically from data
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

// Helper formatting functions (unchanged)
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

// --------------------------------------------------
// Main Component
// --------------------------------------------------
const PlanAnalytics = () => {
  // ------------------------------------------------------------------
  // Data fetching
  // ------------------------------------------------------------------
  const { data, isLoading, isError, refetch } = useGetApi({
    key: "planAnalytics",
    url: ApiConfig.PLAN_ANALYTICS,
    requireAuth: false,
  });

  // ------------------------------------------------------------------
  // Derived data
  // ------------------------------------------------------------------
  const institutionAnalytics = data?.institutionAnalytics ?? [];

  // Populate dynamic institution filter options once data is loaded
  const dynamicInstitutionOptions = useMemo(() => {
    const uniq = Array.from(new Set(institutionAnalytics.map((i) => i.institution)));
    return ["All Institutions", ...uniq];
  }, [institutionAnalytics]);

  // ------------------------------------------------------------------
  // UI state for filters
  // ------------------------------------------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [billingFilter, setBillingFilter] = useState("All Cycles");
  const [dateRangeFilter, setDateRangeFilter] = useState("All Time");

  // ------------------------------------------------------------------
  // Filtering logic (client‑side)
  // ------------------------------------------------------------------
  const filteredInstitutions = useMemo(() => {
    return institutionAnalytics.filter((item) => {
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
  }, [institutionAnalytics, searchTerm, planFilter, statusFilter, billingFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setPlanFilter("All Plans");
    setStatusFilter("All Status");
    setBillingFilter("All Cycles");
    setDateRangeFilter("All Time");
  };

  // ------------------------------------------------------------------
  // Analytics calculations based on API response
  // ------------------------------------------------------------------
  const cards = data?.cards || {};
  const analyticsCards = [
    {
      label: "Total Active Plans",
      value: cards.totalActivePlans ?? "-",
      description: "Currently active subscriptions",
      icon: FiLayers,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "up",
      trendValue: "—",
    },
    {
      label: "Total Institutions",
      value: cards.totalInstitutions ?? "-",
      description: "Onboarded on the platform",
      icon: FiHome,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "up",
      trendValue: "—",
    },
    {
      label: "Monthly Revenue",
      value: cards.monthlyRevenue ? formatCurrency(cards.monthlyRevenue) : "-",
      description: "Revenue generated this month",
      icon: FiDollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trend: "up",
      trendValue: "—",
    },
    {
      label: "Annual Revenue",
      value: cards.annualRevenue ? formatCurrency(cards.annualRevenue) : "-",
      description: "Projected revenue this year",
      icon: FiBarChart2,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      trend: "up",
      trendValue: "—",
    },
    {
      label: "Renewal Rate",
      value: cards.renewalRate ? `${cards.renewalRate}%` : "-",
      description: "Institutions renewing on time",
      icon: FiRefreshCcw,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "up",
      trendValue: "—",
    },
    {
      label: "Expiring Plans",
      value: cards.expiringPlans ?? "-",
      description: "Plans expiring within 30 days",
      icon: FiAlertTriangle,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      trend: "down",
      trendValue: "—",
    },
  ];

  const planDistribution = (data?.planDistribution || []).map((p) => {
    const total = cards.totalInstitutions || 0;
    const count = p.count ?? 0;
    const percentage = total ? Math.round((count / total) * 100) : 0;
    return {
      plan: p.planName || p.plan,
      count,
      percentage,
    };
  });

  const topPerformingPlans = (data?.topPerformingPlans || []).map((p) => {
    return {
      plan: p.planName || p.plan,
      revenue: p.revenue,
      subscribers: p.subscribers,
      renewals: p.renewals,
      growth: "—",
    };
  });

  const recentRenewals = useMemo(() => {
    if (!institutionAnalytics.length) return [];
    const sorted = [...institutionAnalytics].sort(
      (a, b) => new Date(b.renewalDate) - new Date(a.renewalDate)
    );
    return sorted.slice(0, 5);
  }, [institutionAnalytics]);

  // ------------------------------------------------------------------
  // Loading / Error UI
  // ------------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-600 text-lg">Loading analytics…</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Failed to load analytics
          </h2>
          <p className="text-gray-600 mb-4">
            An error occurred while fetching plan analytics data.
          </p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // Main UI (unchanged structure, values now dynamic)
  // ------------------------------------------------------------------
  return (
    <div className="flex flex-col w-full min-w-0 p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Plan Analytics
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Analyze subscription plans, revenue trends, and institution growth.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 w-full min-w-0">
        {analyticsCards.map((card, index) => {
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

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-5 w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
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

      {/* Revenue Analytics + Plan Distribution */}
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
                  {cards.monthlyRevenue ? formatCurrency(cards.monthlyRevenue) : "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Yearly</p>
                <p className="font-semibold text-gray-800">
                  {cards.annualRevenue ? formatCurrency(cards.annualRevenue) : "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Simple bar chart – placeholder */}
          <div className="flex items-end justify-between gap-3 h-48">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
                <p className="text-xs font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150">–</p>
                <div className="w-full max-w-[36px] rounded-t-lg bg-purple-200 group-hover:bg-purple-400" />
                <p className="text-xs text-gray-400">Month {i + 1}</p>
              </div>
            ))}
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
                    ></span>
                    <span className="text-gray-700 font-medium">{item.plan}</span>
                  </div>
                  <span className="text-gray-500">
                    {item.count} schools ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className={`h-full rounded-full ${getPlanBarColor(
                      item.plan
                    )} transition-all duration-500`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Plans + Recent Renewals */}
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
                    <p className="text-sm font-medium text-gray-800">{item.plan}</p>
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
                    {item.growth}
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
            {recentRenewals.map((renewal) => (
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanAnalytics;