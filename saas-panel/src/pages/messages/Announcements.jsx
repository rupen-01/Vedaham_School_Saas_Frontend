import React, { useState, useMemo } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiFileText,
  FiSearch,
  FiPlus,
  FiX,
  FiEye,
  FiTrash2,
  FiPaperclip,
  FiCalendar,
  FiUsers,
  FiHome,
  FiTag,
  FiInbox,
} from "react-icons/fi";
 
// ------------------------------------------------------------------
// Dummy Data
// ------------------------------------------------------------------
const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Winter Holiday Notice",
    institution: "Green Valley Public School",
    category: "Holiday",
    priority: "Medium",
    audience: "All",
    publishDate: "2024-12-20",
    expiryDate: "2025-01-05",
    status: "Scheduled",
    description:
      "The school will remain closed from 20th December to 5th January on account of winter holidays. Classes will resume on 6th January 2025.",
  },
  {
    id: 2,
    title: "Mid-Term Examination Schedule",
    institution: "Sunrise International School",
    category: "Academics",
    priority: "High",
    audience: "Students",
    publishDate: "2024-05-10",
    expiryDate: "2024-05-25",
    status: "Published",
    description:
      "The mid-term examinations for grades 6 to 12 will be conducted between 20th May and 24th May. Detailed timetable has been shared with class teachers.",
  },
  {
    id: 3,
    title: "Fee Payment Reminder",
    institution: "Blue Bells High School",
    category: "Finance",
    priority: "High",
    audience: "Parents",
    publishDate: "2024-05-08",
    expiryDate: "2024-05-31",
    status: "Published",
    description:
      "This is a reminder that the second installment of tuition fees is due by 31st May. Late payments will attract a penalty as per school policy.",
  },
  {
    id: 4,
    title: "Parent Teacher Meeting",
    institution: "St. Xavier's Academy",
    category: "Event",
    priority: "Medium",
    audience: "Parents",
    publishDate: "2024-05-18",
    expiryDate: "2024-05-19",
    status: "Scheduled",
    description:
      "A Parent Teacher Meeting is scheduled for 18th May from 9 AM to 1 PM. Parents are requested to book their preferred time slot through the app.",
  },
  {
    id: 5,
    title: "Annual Sports Day",
    institution: "Green Valley Public School",
    category: "Event",
    priority: "Medium",
    audience: "All",
    publishDate: "2024-04-15",
    expiryDate: "2024-04-16",
    status: "Expired",
    description:
      "The Annual Sports Day was held on the school grounds with enthusiastic participation from students across all grades.",
  },
  {
    id: 6,
    title: "Annual Function Celebration",
    institution: "Sunrise International School",
    category: "Event",
    priority: "Low",
    audience: "All",
    publishDate: "2024-12-10",
    expiryDate: "2024-12-11",
    status: "Draft",
    description:
      "Details regarding the venue, timing and performance schedule for the Annual Function will be shared soon. This announcement is currently in draft.",
  },
  {
    id: 7,
    title: "Bus Route Update - Route 4 & 7",
    institution: "Blue Bells High School",
    category: "Transport",
    priority: "High",
    audience: "Parents",
    publishDate: "2024-05-06",
    expiryDate: "2024-06-06",
    status: "Published",
    description:
      "Bus routes 4 and 7 have been revised to reduce travel time. Please check the updated stop timings shared on the transport section of the app.",
  },
  {
    id: 8,
    title: "New Admission Notice 2024-25",
    institution: "St. Xavier's Academy",
    category: "Admission",
    priority: "High",
    audience: "All",
    publishDate: "2024-03-01",
    expiryDate: "2024-04-30",
    status: "Expired",
    description:
      "Admissions for the academic year 2024-25 are now closed. Waitlisted candidates will be notified individually via email.",
  },
  {
    id: 9,
    title: "Scheduled System Maintenance",
    institution: "Sunrise International School",
    category: "System",
    priority: "Low",
    audience: "All",
    publishDate: "2024-05-25",
    expiryDate: "2024-05-25",
    status: "Scheduled",
    description:
      "The parent-teacher portal will be under maintenance on 25th May from 1 AM to 4 AM. Some services may be temporarily unavailable during this window.",
  },
  {
    id: 10,
    title: "Merit Scholarship Announcement",
    institution: "Green Valley Public School",
    category: "Academics",
    priority: "Medium",
    audience: "Students",
    publishDate: "2024-05-14",
    expiryDate: "2024-06-14",
    status: "Published",
    description:
      "Students securing above 90% in the annual examination are eligible for the merit scholarship. Application forms are available at the front office.",
  },
  {
    id: 11,
    title: "Uniform Guidelines Update",
    institution: "Blue Bells High School",
    category: "General",
    priority: "Low",
    audience: "Parents",
    publishDate: "2024-06-01",
    expiryDate: "2024-06-30",
    status: "Draft",
    description:
      "Minor updates have been made to the summer uniform guidelines. The final circular is being reviewed before publishing to all parents.",
  },
  {
    id: 12,
    title: "Library Book Return Reminder",
    institution: "St. Xavier's Academy",
    category: "General",
    priority: "Low",
    audience: "Students",
    publishDate: "2024-05-11",
    expiryDate: "2024-05-20",
    status: "Published",
    description:
      "Students are requested to return all borrowed library books before the summer break begins to avoid late fine charges.",
  },
];
 
const INSTITUTIONS = [
  "Green Valley Public School",
  "Sunrise International School",
  "Blue Bells High School",
  "St. Xavier's Academy",
];
 
const CATEGORIES = [
  "Holiday",
  "Academics",
  "Finance",
  "Event",
  "Transport",
  "Admission",
  "System",
  "General",
];
 
const PRIORITIES = ["High", "Medium", "Low"];
const AUDIENCES = ["All", "Students", "Teachers", "Parents"];
const STATUSES = ["Draft", "Scheduled", "Published", "Expired"];
 
const INSTITUTION_FILTER_OPTIONS = ["All Institutions", ...INSTITUTIONS];
const CATEGORY_FILTER_OPTIONS = ["All Categories", ...CATEGORIES];
const STATUS_FILTER_OPTIONS = ["All Status", ...STATUSES];
 
const EMPTY_FORM = {
  title: "",
  institution: INSTITUTIONS[0],
  category: CATEGORIES[0],
  priority: "Medium",
  audience: "All",
  publishDate: "",
  expiryDate: "",
  description: "",
  attachment: "",
};
 
// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------
const getStatusBadgeClasses = (status) => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-700";
    case "Scheduled":
      return "bg-blue-100 text-blue-700";
    case "Draft":
      return "bg-gray-100 text-gray-600";
    case "Expired":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
 
const getPriorityBadgeClasses = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-600 border border-red-200";
    case "Medium":
      return "bg-amber-50 text-amber-600 border border-amber-200";
    case "Low":
      return "bg-emerald-50 text-emerald-600 border border-emerald-200";
    default:
      return "bg-gray-50 text-gray-600 border border-gray-200";
  }
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
 
let nextId = INITIAL_ANNOUNCEMENTS.length + 1;
 
// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const Announcements = () => {
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
 
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [institutionFilter, setInstitutionFilter] = useState("All Institutions");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
 
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewAnnouncement, setViewAnnouncement] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
 
  // Form
  const [form, setForm] = useState(EMPTY_FORM);
 
  // --------------------------------------------------------------
  // Derived Data
  // --------------------------------------------------------------
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.institution.toLowerCase().includes(searchTerm.toLowerCase());
 
      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;
 
      const matchesInstitution =
        institutionFilter === "All Institutions" ||
        item.institution === institutionFilter;
 
      const matchesCategory =
        categoryFilter === "All Categories" || item.category === categoryFilter;
 
      return (
        matchesSearch && matchesStatus && matchesInstitution && matchesCategory
      );
    });
  }, [announcements, searchTerm, statusFilter, institutionFilter, categoryFilter]);
 
  const totalAnnouncements = announcements.length;
  const publishedCount = announcements.filter(
    (a) => a.status === "Published"
  ).length;
  const scheduledCount = announcements.filter(
    (a) => a.status === "Scheduled"
  ).length;
  const draftCount = announcements.filter((a) => a.status === "Draft").length;
 
  const statCards = [
    {
      label: "Total Announcements",
      value: totalAnnouncements,
      description: "All announcements created",
      icon: FiBell,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Published",
      value: publishedCount,
      description: "Currently live for institutions",
      icon: FiCheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Scheduled",
      value: scheduledCount,
      description: "Set to publish later",
      icon: FiClock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Drafts",
      value: draftCount,
      description: "Not yet published",
      icon: FiFileText,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];
 
  // --------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All Status");
    setInstitutionFilter("All Institutions");
    setCategoryFilter("All Categories");
  };
 
  const openCreateModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowCreateModal(true);
  };
 
  const openEditModal = (announcement) => {
    setEditingId(announcement.id);
    setForm({
      title: announcement.title,
      institution: announcement.institution,
      category: announcement.category,
      priority: announcement.priority,
      audience: announcement.audience,
      publishDate: announcement.publishDate,
      expiryDate: announcement.expiryDate,
      description: announcement.description,
      attachment: announcement.attachment || "",
    });
    setShowCreateModal(true);
  };
 
  const closeCreateModal = () => {
    setShowCreateModal(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };
 
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
 
  const handleSave = (status) => {
    if (!form.title.trim()) return;
 
    if (editingId) {
      setAnnouncements((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...form, status } : item
        )
      );
    } else {
      const newAnnouncement = {
        id: nextId++,
        ...form,
        status,
      };
      setAnnouncements((prev) => [newAnnouncement, ...prev]);
    }
 
    closeCreateModal();
  };
 
  const confirmDelete = () => {
    if (!deleteTarget) return;
    setAnnouncements((prev) => prev.filter((item) => item.id !== deleteTarget.id));
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
            Announcements
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Create, publish and manage announcements for all institutions.
          </p>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Statistics Cards */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-5 flex items-start justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <h2 className="text-2xl font-bold text-gray-800 mt-1">
                  {card.value}
                </h2>
                <p className="text-xs text-gray-400 mt-1">{card.description}</p>
              </div>
              <div
                className={`${card.iconBg} ${card.iconColor} p-3 rounded-xl flex items-center justify-center`}
              >
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Action Bar */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or institution..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
 
          {/* Status Filter */}
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
 
          {/* Institution Filter */}
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
 
          {/* Category Filter */}
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
        </div>
 
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          <button
            onClick={resetFilters}
            className="text-sm font-medium text-purple-600 hover:text-white border border-purple-200 hover:bg-purple-600 px-4 py-2 rounded-xl transition-colors duration-200 w-full sm:w-auto"
          >
            Reset Filters
          </button>
 
          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200 w-full sm:w-auto"
          >
            <FiPlus size={16} />
            Create Announcement
          </button>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Announcement Table */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Title</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Institution
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Category
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Publish Date
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Status</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Priority
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-purple-50/40 transition-colors duration-150"
                  >
                    <td className="px-5 py-4 max-w-xs">
                      <p className="font-medium text-gray-800 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400">{item.audience}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {item.institution}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(item.publishDate)}
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
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityBadgeClasses(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setViewAnnouncement(item)}
                          title="View"
                          className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-200"
                        >
                          <FiEye size={14} />
                        </button>
                        <button
                          onClick={() => openEditModal(item)}
                          title="Edit"
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                        >
                          <FiEdit3 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          title="Delete"
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
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
                        No announcements found
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Try adjusting your filters or create a new announcement.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
 
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {filteredAnnouncements.length} of {announcements.length}{" "}
          announcements
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Create / Edit Announcement Modal */}
      {/* -------------------------------------------------- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingId ? "Edit Announcement" : "Create Announcement"}
              </h3>
              <button
                onClick={closeCreateModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>
 
            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4">
              {/* Title */}
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Announcement Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  placeholder="Enter announcement title"
                  className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Institution */}
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Institution
                  </label>
                  <select
                    value={form.institution}
                    onChange={(e) =>
                      handleFormChange("institution", e.target.value)
                    }
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {INSTITUTIONS.map((inst) => (
                      <option key={inst} value={inst}>
                        {inst}
                      </option>
                    ))}
                  </select>
                </div>
 
                {/* Category */}
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => handleFormChange("category", e.target.value)}
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
 
                {/* Priority */}
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={(e) => handleFormChange("priority", e.target.value)}
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
 
                {/* Audience */}
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Audience
                  </label>
                  <select
                    value={form.audience}
                    onChange={(e) => handleFormChange("audience", e.target.value)}
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {AUDIENCES.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
 
                {/* Publish Date */}
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={form.publishDate}
                    onChange={(e) =>
                      handleFormChange("publishDate", e.target.value)
                    }
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
 
                {/* Expiry Date */}
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) =>
                      handleFormChange("expiryDate", e.target.value)
                    }
                    className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
 
              {/* Description */}
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  rows={4}
                  placeholder="Write the announcement details..."
                  className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
              </div>
 
              {/* Attachment (Dummy) */}
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Attachment
                </label>
                <div className="mt-1.5 flex items-center gap-3 border border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-400">
                  <FiPaperclip size={16} />
                  <span>
                    {form.attachment
                      ? form.attachment
                      : "No file selected (attachment upload disabled in demo)"}
                  </span>
                </div>
              </div>
            </div>
 
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={closeCreateModal}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave("Draft")}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-purple-600 border border-purple-200 hover:bg-purple-50 transition-colors duration-200"
              >
                Save as Draft
              </button>
              <button
                onClick={() => handleSave("Published")}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* -------------------------------------------------- */}
      {/* View Announcement Modal */}
      {/* -------------------------------------------------- */}
      {viewAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                Announcement Details
              </h3>
              <button
                onClick={() => setViewAnnouncement(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>
 
            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadgeClasses(
                    viewAnnouncement.status
                  )}`}
                >
                  {viewAnnouncement.status}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityBadgeClasses(
                    viewAnnouncement.priority
                  )}`}
                >
                  {viewAnnouncement.priority} Priority
                </span>
              </div>
 
              <div>
                <p className="text-xs text-gray-400 mb-1">Title</p>
                <p className="text-sm font-semibold text-gray-800">
                  {viewAnnouncement.title}
                </p>
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiHome size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Institution</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewAnnouncement.institution}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiUsers size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Audience</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewAnnouncement.audience}
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
                      {viewAnnouncement.category}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiCalendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Publish Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewAnnouncement.publishDate)}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiCalendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Expiry Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewAnnouncement.expiryDate)}
                    </p>
                  </div>
                </div>
              </div>
 
              <div>
                <p className="text-xs text-gray-400 mb-1">Description</p>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
                  {viewAnnouncement.description}
                </p>
              </div>
            </div>
 
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewAnnouncement(null)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors duration-200"
              >
                Close
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
            <h3 className="text-lg font-semibold text-gray-800">
              Delete Announcement
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700">
                "{deleteTarget.title}"
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
 
export default Announcements;
 