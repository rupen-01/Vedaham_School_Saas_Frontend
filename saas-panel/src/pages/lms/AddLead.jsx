
import React, { useState, useMemo } from "react";
import {
  FiUserPlus,
  FiUsers,
  FiSun,
  FiCheckCircle,
  FiClock,
  FiUpload,
  FiDownload,
  FiHome,
  FiUser,
  FiMapPin,
  FiTag,
  FiX,
  FiEye,
  FiEdit3,
  FiTrash2,
  FiInbox,
  FiPhone,
  FiMail,
  FiGlobe,
  FiCalendar,
  FiFileText,
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
  "Other",
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
const PRIORITIES = ["Low", "Medium", "High"];
const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Proposal Sent"];
const SALES_EXECUTIVES = [
  "Rohit Sinha",
  "Anjali Mehra",
  "Vikram Chauhan",
  "Sneha Patil",
];
const COUNTRIES = ["India"];
const STATES = [
  "Haryana",
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Punjab",
  "Uttar Pradesh",
];
 
const EMPTY_FORM = {
  schoolName: "",
  schoolType: SCHOOL_TYPES[0],
  board: BOARDS[0],
  numberOfStudents: "",
  numberOfBranches: "",
  website: "",
  contactPerson: "",
  designation: "",
  email: "",
  phone: "",
  country: COUNTRIES[0],
  state: STATES[0],
  city: "",
  pincode: "",
  address: "",
  leadSource: LEAD_SOURCES[0],
  interestedModules: [],
  priority: "Medium",
  status: "New",
  assignedTo: SALES_EXECUTIVES[0],
  closingDate: "",
  notes: "",
};
 
// ------------------------------------------------------------------
// Dummy Data
// ------------------------------------------------------------------
const today = new Date();
const daysAgo = (n) => {
  const date = new Date(today);
  date.setDate(date.getDate() - n);
  return date.toISOString().split("T")[0];
};
 
const INITIAL_LEADS = [
  {
    id: 1,
    schoolName: "Horizon Global School",
    schoolType: "International",
    board: "IB",
    numberOfStudents: "1200",
    numberOfBranches: "2",
    website: "www.horizonglobal.edu",
    contactPerson: "Rajesh Kumar",
    designation: "Principal",
    email: "rajesh.kumar@horizonglobal.edu",
    phone: "+91 98765 43210",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    pincode: "110001",
    address: "Sector 12, Dwarka, New Delhi",
    leadSource: "Website",
    interestedModules: ["Student Management", "Fees", "Exams"],
    priority: "High",
    status: "Qualified",
    assignedTo: "Rohit Sinha",
    closingDate: daysAgo(-10),
    notes: "Very interested, requested a live demo next week.",
    dateAdded: daysAgo(1),
  },
  {
    id: 2,
    schoolName: "Crescent Public School",
    schoolType: "Private",
    board: "CBSE",
    numberOfStudents: "650",
    numberOfBranches: "1",
    website: "www.crescentschool.edu",
    contactPerson: "Meena Iyer",
    designation: "Administrator",
    email: "meena.iyer@crescentschool.edu",
    phone: "+91 91234 56780",
    country: "India",
    state: "Karnataka",
    city: "Bengaluru",
    pincode: "560001",
    address: "MG Road, Bengaluru",
    leadSource: "Referral",
    interestedModules: ["Attendance", "Fees"],
    priority: "Medium",
    status: "Contacted",
    assignedTo: "Anjali Mehra",
    closingDate: daysAgo(-20),
    notes: "Referred by Green Valley Public School. Awaiting budget approval.",
    dateAdded: daysAgo(3),
  },
  {
    id: 3,
    schoolName: "Silver Oak School",
    schoolType: "Private",
    board: "ICSE",
    numberOfStudents: "480",
    numberOfBranches: "1",
    website: "www.silveroak.edu",
    contactPerson: "Vikas Rathore",
    designation: "Director",
    email: "vikas.rathore@silveroak.edu",
    phone: "+91 99887 76655",
    country: "India",
    state: "Punjab",
    city: "Ludhiana",
    pincode: "141001",
    address: "Model Town, Ludhiana",
    leadSource: "Advertisement",
    interestedModules: ["Student Management", "HRMS", "Transport"],
    priority: "Low",
    status: "New",
    assignedTo: "Vikram Chauhan",
    closingDate: daysAgo(-30),
    notes: "Saw our newspaper ad, requested a callback.",
    dateAdded: daysAgo(0),
  },
  {
    id: 4,
    schoolName: "Maple Leaf Academy",
    schoolType: "International",
    board: "IB",
    numberOfStudents: "980",
    numberOfBranches: "3",
    website: "www.mapleleafacademy.edu",
    contactPerson: "Sarah Thomas",
    designation: "Vice Principal",
    email: "sarah.thomas@mapleleafacademy.edu",
    phone: "+91 90123 45678",
    country: "India",
    state: "Maharashtra",
    city: "Pune",
    pincode: "411001",
    address: "Koregaon Park, Pune",
    leadSource: "Event",
    interestedModules: ["LMS", "Exams", "Library"],
    priority: "High",
    status: "Proposal Sent",
    assignedTo: "Sneha Patil",
    closingDate: daysAgo(-5),
    notes: "Met at EduTech Summit. Proposal sent, awaiting board decision.",
    dateAdded: daysAgo(6),
  },
  {
    id: 5,
    schoolName: "Emerald Heights School",
    schoolType: "Private",
    board: "CBSE",
    numberOfStudents: "1450",
    numberOfBranches: "2",
    website: "www.emeraldheights.edu",
    contactPerson: "Anil Bhardwaj",
    designation: "Principal",
    email: "anil.bhardwaj@emeraldheights.edu",
    phone: "+91 98765 12340",
    country: "India",
    state: "Uttar Pradesh",
    city: "Noida",
    pincode: "201301",
    address: "Sector 62, Noida",
    leadSource: "Cold Call",
    interestedModules: ["Fees", "Transport"],
    priority: "Medium",
    status: "Contacted",
    assignedTo: "Rohit Sinha",
    closingDate: daysAgo(-15),
    notes: "Currently comparing with two other ERP vendors.",
    dateAdded: daysAgo(4),
  },
  {
    id: 6,
    schoolName: "Riverside Convent School",
    schoolType: "Private",
    board: "ICSE",
    numberOfStudents: "720",
    numberOfBranches: "1",
    website: "www.riversideconvent.edu",
    contactPerson: "Farida Sheikh",
    designation: "Administrator",
    email: "farida.sheikh@riversideconvent.edu",
    phone: "+91 97654 32109",
    country: "India",
    state: "Haryana",
    city: "Gurugram",
    pincode: "122001",
    address: "Sector 45, Gurugram",
    leadSource: "Social Media",
    interestedModules: ["Student Management", "Attendance", "LMS"],
    priority: "High",
    status: "Qualified",
    assignedTo: "Anjali Mehra",
    closingDate: daysAgo(-8),
    notes: "Responded to our LinkedIn campaign, very engaged.",
    dateAdded: daysAgo(2),
  },
  {
    id: 7,
    schoolName: "Oakwood International",
    schoolType: "International",
    board: "IB",
    numberOfStudents: "1100",
    numberOfBranches: "1",
    website: "www.oakwoodintl.edu",
    contactPerson: "Daniel Fernandes",
    designation: "Director",
    email: "daniel.fernandes@oakwoodintl.edu",
    phone: "+91 96543 21098",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    pincode: "400001",
    address: "Bandra West, Mumbai",
    leadSource: "Website",
    interestedModules: ["HRMS", "Fees", "Exams"],
    priority: "Medium",
    status: "New",
    assignedTo: "Vikram Chauhan",
    closingDate: daysAgo(-25),
    notes: "Submitted an inquiry via the contact us form.",
    dateAdded: daysAgo(0),
  },
  {
    id: 8,
    schoolName: "Pinewood High School",
    schoolType: "Private",
    board: "State Board",
    numberOfStudents: "390",
    numberOfBranches: "1",
    website: "www.pinewoodhigh.edu",
    contactPerson: "Geeta Nair",
    designation: "Principal",
    email: "geeta.nair@pinewoodhigh.edu",
    phone: "+91 95432 10987",
    country: "India",
    state: "Karnataka",
    city: "Mysuru",
    pincode: "570001",
    address: "Vijayanagar, Mysuru",
    leadSource: "Referral",
    interestedModules: ["Attendance", "Library"],
    priority: "Low",
    status: "Contacted",
    assignedTo: "Sneha Patil",
    closingDate: daysAgo(-40),
    notes: "Small budget, exploring the Basic plan.",
    dateAdded: daysAgo(5),
  },
];
 
let nextId = INITIAL_LEADS.length + 1;
 
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
      return "bg-green-100 text-green-700";
    case "Proposal Sent":
      return "bg-gray-200 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
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
 
const RequiredMark = () => <span className="text-red-500 ml-0.5">*</span>;
 
// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const AddLeads = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
 
  const [viewLead, setViewLead] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
 
  // --------------------------------------------------------------
  // Summary Stats
  // --------------------------------------------------------------
  const totalLeads = leads.length;
  const newLeadsToday = leads.filter(
    (l) => l.dateAdded === today.toISOString().split("T")[0]
  ).length;
  const qualifiedLeads = leads.filter((l) => l.status === "Qualified").length;
  const pendingFollowUps = leads.filter(
    (l) => l.status === "New" || l.status === "Contacted"
  ).length;
 
  const summaryCards = [
    {
      label: "Total Leads",
      value: totalLeads,
      description: "All leads captured so far",
      icon: FiUsers,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "New Leads Today",
      value: newLeadsToday,
      description: "Added within the last 24 hours",
      icon: FiSun,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Qualified Leads",
      value: qualifiedLeads,
      description: "Ready to move to proposal stage",
      icon: FiCheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Pending Follow-ups",
      value: pendingFollowUps,
      description: "Leads awaiting next contact",
      icon: FiClock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];
 
  // --------------------------------------------------------------
  // Form Handlers
  // --------------------------------------------------------------
  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };
 
  const toggleModule = (module) => {
    setForm((prev) => {
      const alreadySelected = prev.interestedModules.includes(module);
      return {
        ...prev,
        interestedModules: alreadySelected
          ? prev.interestedModules.filter((m) => m !== module)
          : [...prev.interestedModules, module],
      };
    });
  };
 
  const validateForm = () => {
    const newErrors = {};
    if (!form.schoolName.trim()) newErrors.schoolName = true;
    if (!form.contactPerson.trim()) newErrors.contactPerson = true;
    if (!form.phone.trim()) newErrors.phone = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingId(null);
  };
 
  const handleSaveLead = () => {
    if (!validateForm()) return;
 
    if (editingId) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === editingId ? { ...lead, ...form } : lead
        )
      );
    } else {
      const newLead = {
        id: nextId++,
        ...form,
        dateAdded: today.toISOString().split("T")[0],
      };
      setLeads((prev) => [newLead, ...prev]);
    }
 
    resetForm();
  };
 
  const handleEditLead = (lead) => {
    setEditingId(lead.id);
    setForm({
      schoolName: lead.schoolName,
      schoolType: lead.schoolType,
      board: lead.board,
      numberOfStudents: lead.numberOfStudents,
      numberOfBranches: lead.numberOfBranches,
      website: lead.website,
      contactPerson: lead.contactPerson,
      designation: lead.designation,
      email: lead.email,
      phone: lead.phone,
      country: lead.country,
      state: lead.state,
      city: lead.city,
      pincode: lead.pincode,
      address: lead.address,
      leadSource: lead.leadSource,
      interestedModules: lead.interestedModules,
      priority: lead.priority,
      status: lead.status,
      assignedTo: lead.assignedTo,
      closingDate: lead.closingDate,
      notes: lead.notes,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
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
            Add Leads
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Create and manage potential school leads.
          </p>
        </div>
 
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200"
          >
            <FiUpload size={15} />
            Import Leads
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200"
          >
            <FiDownload size={15} />
            Export Template
          </button>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Lead Summary Cards */}
      {/* -------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {summaryCards.map((card, index) => {
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
      {/* Lead Information Form */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-gray-800">
            {editingId ? "Edit Lead" : "Lead Information"}
          </h3>
          {editingId && (
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              Editing existing lead
            </span>
          )}
        </div>
 
        {/* School Information */}
        <div className="mb-8">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
            <FiHome className="text-purple-600" size={16} />
            School Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 flex items-center">
                School Name
                <RequiredMark />
              </label>
              <input
                type="text"
                value={form.schoolName}
                onChange={(e) => handleFieldChange("schoolName", e.target.value)}
                placeholder="Enter school name"
                className={`w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  errors.schoolName ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.schoolName && (
                <p className="text-xs text-red-500 mt-1">School name is required.</p>
              )}
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">
                School Type
              </label>
              <select
                value={form.schoolType}
                onChange={(e) => handleFieldChange("schoolType", e.target.value)}
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {SCHOOL_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">Board</label>
              <select
                value={form.board}
                onChange={(e) => handleFieldChange("board", e.target.value)}
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {BOARDS.map((board) => (
                  <option key={board} value={board}>
                    {board}
                  </option>
                ))}
              </select>
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">
                Number of Students
              </label>
              <input
                type="number"
                value={form.numberOfStudents}
                onChange={(e) =>
                  handleFieldChange("numberOfStudents", e.target.value)
                }
                placeholder="e.g. 800"
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">
                Number of Branches
              </label>
              <input
                type="number"
                value={form.numberOfBranches}
                onChange={(e) =>
                  handleFieldChange("numberOfBranches", e.target.value)
                }
                placeholder="e.g. 1"
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">Website</label>
              <input
                type="text"
                value={form.website}
                onChange={(e) => handleFieldChange("website", e.target.value)}
                placeholder="www.schoolname.edu"
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>
 
        {/* Contact Person */}
        <div className="mb-8">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
            <FiUser className="text-purple-600" size={16} />
            Contact Person
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 flex items-center">
                Contact Person Name
                <RequiredMark />
              </label>
              <input
                type="text"
                value={form.contactPerson}
                onChange={(e) =>
                  handleFieldChange("contactPerson", e.target.value)
                }
                placeholder="Full name"
                className={`w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  errors.contactPerson ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.contactPerson && (
                <p className="text-xs text-red-500 mt-1">
                  Contact person is required.
                </p>
              )}
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">
                Designation
              </label>
              <input
                type="text"
                value={form.designation}
                onChange={(e) => handleFieldChange("designation", e.target.value)}
                placeholder="e.g. Principal"
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                placeholder="name@school.edu"
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500 flex items-center">
                Phone Number
                <RequiredMark />
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                placeholder="+91 00000 00000"
                className={`w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  errors.phone ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  Phone number is required.
                </p>
              )}
            </div>
          </div>
        </div>
 
        {/* Address */}
        <div className="mb-8">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
            <FiMapPin className="text-purple-600" size={16} />
            Address
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">
                Country
              </label>
              <select
                value={form.country}
                onChange={(e) => handleFieldChange("country", e.target.value)}
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">State</label>
              <select
                value={form.state}
                onChange={(e) => handleFieldChange("state", e.target.value)}
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => handleFieldChange("city", e.target.value)}
                placeholder="Enter city"
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">
                Pincode
              </label>
              <input
                type="text"
                value={form.pincode}
                onChange={(e) => handleFieldChange("pincode", e.target.value)}
                placeholder="e.g. 110001"
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
 
            <div className="sm:col-span-2 lg:col-span-4">
              <label className="text-xs font-medium text-gray-500">
                Full Address
              </label>
              <textarea
                value={form.address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                rows={2}
                placeholder="Street, area, landmark..."
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              />
            </div>
          </div>
        </div>
 
        {/* Lead Details */}
        <div className="mb-2">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
            <FiTag className="text-purple-600" size={16} />
            Lead Details
          </h4>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div>
              <label className="text-xs font-medium text-gray-500">
                Lead Source
              </label>
              <select
                value={form.leadSource}
                onChange={(e) => handleFieldChange("leadSource", e.target.value)}
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {LEAD_SOURCES.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
 
            <div>
              <label className="text-xs font-medium text-gray-500">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => handleFieldChange("priority", e.target.value)}
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
                Lead Status
              </label>
              <select
                value={form.status}
                onChange={(e) => handleFieldChange("status", e.target.value)}
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
                Assigned Sales Executive
              </label>
              <select
                value={form.assignedTo}
                onChange={(e) => handleFieldChange("assignedTo", e.target.value)}
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
 
          {/* Interested Modules */}
          <div className="mb-5">
            <label className="text-xs font-medium text-gray-500 mb-2 block">
              Interested Modules
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {INTERESTED_MODULES.map((module) => (
                <label
                  key={module}
                  className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 hover:bg-purple-50 border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer transition-colors duration-150"
                >
                  <input
                    type="checkbox"
                    checked={form.interestedModules.includes(module)}
                    onChange={() => toggleModule(module)}
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  {module}
                </label>
              ))}
            </div>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-xs font-medium text-gray-500">
                Expected Closing Date
              </label>
              <input
                type="date"
                value={form.closingDate}
                onChange={(e) => handleFieldChange("closingDate", e.target.value)}
                className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
 
          <div>
            <label className="text-xs font-medium text-gray-500">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => handleFieldChange("notes", e.target.value)}
              rows={4}
              placeholder="Add any additional notes about this lead..."
              className="w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>
        </div>
 
        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={resetForm}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveLead}
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
          >
            {editingId ? "Update Lead" : "Save Lead"}
          </button>
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* Recent Leads Table */}
      {/* -------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">
            Recent Leads
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            All leads captured for the sales team to follow up on
          </p>
        </div>
 
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  School
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Contact Person
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Phone
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Source
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Priority
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-3 font-semibold whitespace-nowrap">
                  Assigned To
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
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-purple-50/40 transition-colors duration-150"
                  >
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
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {lead.leadSource}
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
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadgeClasses(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {lead.assignedTo}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(lead.dateAdded)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setViewLead(lead)}
                          title="View"
                          className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-200"
                        >
                          <FiEye size={14} />
                        </button>
                        <button
                          onClick={() => handleEditLead(lead)}
                          title="Edit"
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                        >
                          <FiEdit3 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(lead)}
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
                  <td colSpan={9} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="bg-purple-50 text-purple-400 p-4 rounded-full mb-3">
                        <FiInbox size={26} />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        No leads added yet
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Use the form above to add your first school lead.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
 
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {leads.length} lead{leads.length !== 1 ? "s" : ""}
        </div>
      </div>
 
      {/* -------------------------------------------------- */}
      {/* View Lead Modal */}
      {/* -------------------------------------------------- */}
      {viewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {viewLead.schoolName}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Lead added on {formatDate(viewLead.dateAdded)}
                </p>
              </div>
              <button
                onClick={() => setViewLead(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors duration-200"
              >
                <FiX size={18} />
              </button>
            </div>
 
            {/* Modal Body */}
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
 
              {/* School Details */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiHome className="text-purple-600" size={15} />
                  School Details
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
                    <p className="text-xs text-gray-400">Number of Students</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.numberOfStudents || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Number of Branches</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.numberOfBranches || "—"}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiGlobe size={11} /> Website
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.website || "—"}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiMapPin size={11} /> Address
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.address || "—"}, {viewLead.city}, {viewLead.state}{" "}
                      {viewLead.pincode}, {viewLead.country}
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
                      {viewLead.designation || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiMail size={11} /> Email
                    </p>
                    <p className="text-sm font-medium text-gray-800 break-all">
                      {viewLead.email || "—"}
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
 
              {/* Interested Modules */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiTag className="text-purple-600" size={15} />
                  Interested Modules
                </h4>
                {viewLead.interestedModules.length > 0 ? (
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
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    No modules selected.
                  </p>
                )}
              </div>
 
              {/* Lead Info */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FiUsers className="text-purple-600" size={15} />
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
                    <p className="text-xs text-gray-400">
                      Assigned Sales Executive
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewLead.assignedTo}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FiCalendar size={11} /> Expected Closing Date
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewLead.closingDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Date Added</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(viewLead.dateAdded)}
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Notes */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FiFileText className="text-purple-600" size={15} />
                  Notes
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
                  {viewLead.notes || "No notes added for this lead."}
                </p>
              </div>
            </div>
 
            {/* Modal Footer */}
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
 
export default AddLeads;