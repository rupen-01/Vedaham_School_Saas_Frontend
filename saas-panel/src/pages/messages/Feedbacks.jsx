import React, { useState, useMemo } from "react";
import {
  FiMessageSquare,
  FiClock,
  FiCheckCircle,
  FiStar,
  FiSearch,
  FiX,
  FiEye,
  FiRefreshCcw,
  FiUser,
  FiHome,
  FiTag,
  FiCalendar,
} from "react-icons/fi";
 
// ------------------------------------------------------------------
// Dummy Data
// ------------------------------------------------------------------
const FEEDBACK_DATA = [
  {
    id: 1,
    user: "Aarav Sharma",
    role: "Student",
    institution: "Green Valley Public School",
    category: "Academics",
    subject: "Great improvement in Math curriculum",
    rating: 5,
    message:
      "The new math curriculum has really helped me understand concepts better. Teachers are more interactive and use real-life examples.",
    date: "2024-05-02",
    status: "Reviewed",
  },
  {
    id: 2,
    user: "Neha Verma",
    role: "Parent",
    institution: "Sunrise International School",
    category: "Administration",
    subject: "Fee payment portal issues",
    rating: 2,
    message:
      "The online fee payment portal keeps timing out. I had to try four times before the payment finally went through.",
    date: "2024-05-10",
    status: "Pending",
  },
  {
    id: 3,
    user: "Ritika Nair",
    role: "Teacher",
    institution: "Blue Bells High School",
    category: "Infrastructure",
    subject: "Need more projectors in classrooms",
    rating: 3,
    message:
      "Only 2 out of 8 classrooms have working projectors. This makes it difficult to conduct interactive lessons regularly.",
    date: "2024-04-28",
    status: "Reviewed",
  },
  {
    id: 4,
    user: "Karan Mehta",
    role: "Student",
    institution: "Green Valley Public School",
    category: "Transport",
    subject: "Bus arrives late every day",
    rating: 2,
    message:
      "The school bus on Route 4 is late by 15-20 minutes almost every day, causing us to miss the first period.",
    date: "2024-05-15",
    status: "Pending",
  },
  {
    id: 5,
    user: "Simran Kaur",
    role: "Parent",
    institution: "St. Xavier's Academy",
    category: "Academics",
    subject: "Excellent parent-teacher meeting",
    rating: 5,
    message:
      "The recent PTM was well organized and teachers gave detailed feedback on my child's progress. Very satisfied.",
    date: "2024-05-01",
    status: "Reviewed",
  },
  {
    id: 6,
    user: "Devansh Gupta",
    role: "Student",
    institution: "Sunrise International School",
    category: "Sports",
    subject: "Request for more sports equipment",
    rating: 3,
    message:
      "We only have 2 footballs for the entire junior section. It would be great if the school could provide more equipment.",
    date: "2024-04-20",
    status: "Rejected",
  },
  {
    id: 7,
    user: "Ananya Iyer",
    role: "Teacher",
    institution: "St. Xavier's Academy",
    category: "Administration",
    subject: "Staff room needs better ventilation",
    rating: 3,
    message:
      "The staff room gets very stuffy during summer afternoons. An additional exhaust fan or AC would help a lot.",
    date: "2024-05-08",
    status: "Pending",
  },
  {
    id: 8,
    user: "Mohit Rao",
    role: "Parent",
    institution: "Blue Bells High School",
    category: "Academics",
    subject: "Homework load is too high",
    rating: 2,
    message:
      "My child is in grade 3 and receives nearly 2 hours of homework daily. This seems excessive for this age group.",
    date: "2024-05-12",
    status: "Reviewed",
  },
  {
    id: 9,
    user: "Priya Desai",
    role: "Student",
    institution: "St. Xavier's Academy",
    category: "Infrastructure",
    subject: "Library needs updated books",
    rating: 4,
    message:
      "The library collection is great but could use more recent editions of reference books for senior classes.",
    date: "2024-04-25",
    status: "Reviewed",
  },
  {
    id: 10,
    user: "Yash Malhotra",
    role: "Parent",
    institution: "Green Valley Public School",
    category: "Transport",
    subject: "Appreciate the new GPS tracking",
    rating: 5,
    message:
      "The new bus GPS tracking feature in the app gives great peace of mind. Thank you for this update.",
    date: "2024-05-16",
    status: "Reviewed",
  },
  {
    id: 11,
    user: "Ishaan Kapoor",
    role: "Teacher",
    institution: "Sunrise International School",
    category: "Academics",
    subject: "Request for smart board training",
    rating: 4,
    message:
      "Many teachers, including myself, would benefit from a short training session on using the newly installed smart boards.",
    date: "2024-05-05",
    status: "Pending",
  },
  {
    id: 12,
    user: "Tanvi Joshi",
    role: "Student",
    institution: "Blue Bells High School",
    category: "Sports",
    subject: "Annual sports day was fantastic",
    rating: 5,
    message:
      "This year's sports day was extremely well organized with great events and enthusiasm from everyone. Loved it!",
    date: "2024-04-30",
    status: "Reviewed",
  },
];
 
const INSTITUTIONS = [
  "All Institutions",
  ...Array.from(new Set(FEEDBACK_DATA.map((f) => f.institution))),
];
const CATEGORIES = [
  "All Categories",
  ...Array.from(new Set(FEEDBACK_DATA.map((f) => f.category))),
];
const RATINGS = ["All Ratings", "5", "4", "3", "2", "1"];
const STATUSES = ["All Status", "Pending", "Reviewed", "Rejected"];
 
// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------
const getStatusBadgeClasses = (status) => {
  switch (status) {
    case "Reviewed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
 
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
 
const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          size={14}
          className={
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
};
 
// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const Feedbacks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [institutionFilter, setInstitutionFilter] = useState("All Institutions");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
 
  // Filtering logic
  const filteredFeedbacks = useMemo(() => {
    return FEEDBACK_DATA.filter((item) => {
      const matchesSearch =
        item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.institution.toLowerCase().includes(searchTerm.toLowerCase());
 
      const matchesInstitution =
        institutionFilter === "All Institutions" ||
        item.institution === institutionFilter;
 
      const matchesCategory =
        categoryFilter === "All Categories" || item.category === categoryFilter;
 
      const matchesRating =
        ratingFilter === "All Ratings" || item.rating === Number(ratingFilter);
 
      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;
 
      return (
        matchesSearch &&
        matchesInstitution &&
        matchesCategory &&
        matchesRating &&
        matchesStatus
      );
    });
  }, [searchTerm, institutionFilter, categoryFilter, ratingFilter, statusFilter]);
 
  // Statistics
  const totalFeedback = FEEDBACK_DATA.length;
  const pendingCount = FEEDBACK_DATA.filter((f) => f.status === "Pending").length;
  const reviewedCount = FEEDBACK_DATA.filter((f) => f.status === "Reviewed").length;
  const averageRating = (
    FEEDBACK_DATA.reduce((sum, f) => sum + f.rating, 0) / FEEDBACK_DATA.length
  ).toFixed(1);
 
  const resetFilters = () => {
    setSearchTerm("");
    setInstitutionFilter("All Institutions");
    setCategoryFilter("All Categories");
    setRatingFilter("All Ratings");
    setStatusFilter("All Status");
  };
 
  const statCards = [
    {
      label: "Total Feedback",
      value: totalFeedback,
      description: "All time submissions",
      icon: FiMessageSquare,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Pending",
      value: pendingCount,
      description: "Awaiting review",
      icon: FiClock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      label: "Reviewed",
      value: reviewedCount,
      description: "Successfully addressed",
      icon: FiCheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Average Rating",
      value: `${averageRating} / 5`,
      description: "Overall satisfaction",
      icon: FiStar,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
  ];
 
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* -------------------------------------------------- */}
      {/* Page Header */}
      {/* -------------------------------------------------- */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Feedback Management
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Monitor and manage feedback submitted by institutions.
        </p>
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
      {/* Search & Filters */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
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
              placeholder="Search by user, subject or institution..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
 
          {/* Institution Filter */}
          <select
            value={institutionFilter}
            onChange={(e) => setInstitutionFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {INSTITUTIONS.map((inst) => (
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
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
 
          {/* Rating Filter */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {RATINGS.map((r) => (
              <option key={r} value={r}>
                {r === "All Ratings" ? r : `${r} Star`}
              </option>
            ))}
          </select>
 
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2.5 px-3 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {STATUSES.map((s) => (
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
      {/* Feedback Table */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">User</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Institution
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Category
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Rating</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Date</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">Status</th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-purple-50/40 transition-colors duration-150"
                  >
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">{item.user}</p>
                      <p className="text-xs text-gray-400">{item.role}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {item.institution}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <RatingStars rating={item.rating} />
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(item.date)}
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
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => setSelectedFeedback(item)}
                        className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
                      >
                        <FiEye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-400">
                    No feedback records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
 
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {filteredFeedbacks.length} of {FEEDBACK_DATA.length} feedback
          records
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* View Feedback Modal */}
      {/* -------------------------------------------------- */}
      {selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                Feedback Details
              </h3>
              <button
                onClick={() => setSelectedFeedback(null)}
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
                    selectedFeedback.status
                  )}`}
                >
                  {selectedFeedback.status}
                </span>
                <RatingStars rating={selectedFeedback.rating} />
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiUser size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">User Name</p>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedFeedback.user}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiTag size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Role</p>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedFeedback.role}
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
                      {selectedFeedback.institution}
                    </p>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <FiCalendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Submitted Date</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(selectedFeedback.date)}
                    </p>
                  </div>
                </div>
              </div>
 
              <div>
                <p className="text-xs text-gray-400 mb-1">Category</p>
                <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {selectedFeedback.category}
                </span>
              </div>
 
              <div>
                <p className="text-xs text-gray-400 mb-1">Subject</p>
                <p className="text-sm font-semibold text-gray-800">
                  {selectedFeedback.subject}
                </p>
              </div>
 
              <div>
                <p className="text-xs text-gray-400 mb-1">Feedback Message</p>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
                  {selectedFeedback.message}
                </p>
              </div>
            </div>
 
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedFeedback(null)}
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
 
export default Feedbacks;
 