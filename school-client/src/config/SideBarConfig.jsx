import React from "react";

// Core React Icons (FontAwesome)
import { 
  FaBook, FaCalendarAlt, FaRegCalendarCheck, FaClipboard, FaRegClock, FaSchool, 
  FaUserTie, FaClipboardList, FaCalendarCheck, FaIdCard, FaFileAlt, FaChild, 
  FaArrowUp, FaUserClock, FaHeartbeat, FaHome, FaDatabase, 
  FaLightbulb, FaUserGraduate, FaUserPlus, FaRupeeSign, FaWallet, FaBus, 
  FaFileInvoiceDollar, FaChartBar, FaUniversity, FaTachometerAlt, FaCog, 
  FaCashRegister, FaUndo, FaExclamationCircle, FaPlusSquare, FaCloudUploadAlt, 
  FaBookReader, FaBuilding, FaBed, FaClipboardCheck, FaUsers, FaCreditCard, 
  FaMapMarkedAlt, FaBell, FaExchangeAlt,FaWarehouse,FaShapes ,FaArrowDown,FaCheckCircle,FaEye ,FaListUl,FaUserLock, FaFileSignature,FaSlidersH,FaMoneyBill,FaMoneyCheckAlt, FaReceipt,FaChartLine // ✅ ADD THIS HERE
} from "react-icons/fa";
import { 
  MdOutlineSubject, MdOutlineCalendarMonth, MdOutlineCalendarToday, 
  MdFormatListBulleted, MdEditDocument, MdOutlineLibraryBooks, 
  MdDashboard, MdOutlineAssignment, MdOutlineEventNote 
} from "react-icons/md";
import { TbNotes, TbCalendarClock } from "react-icons/tb";
import { RiUserReceived2Line, RiBook2Line, RiBookOpenLine, RiBook3Line } from "react-icons/ri";
1
const MenuItem = [
  // {
  //     name: "Dashboard",
  //     path: "/",
  //     icon: <Icon icon="solar:widget-4-bold-duotone" />,
  //   },
{
  name: "Academics",
  path: "/",
  icon: <FaSchool />,
  subItems: [
    {
      name: "Class Teacher Allocation",
      path: "/academics/class-teacher-allocation",
      icon: <FaUserTie />,
    },
    {
      name: "Subjects",
      path: "/academics/subjects",
      icon: <MdOutlineSubject />,
      subItems: [
        { name: "Manage Subjects", path: "/academics/subjects/manage" },
        { name: "Manage Assign Subjects", path: "/academics/subjects/manage-assign" },
      ],
    },
    {
      name: "Lesson Planning",
      path: "/academics/lesson-planning",
      icon: <FaClipboardList />,
      subItems: [
        { name: "Add Lesson Plan", path: "/academics/lesson-planning/create" },
        { name: "Approve Lesson Plan", path: "/academics/lesson-planning/approve" },
        { name: "Plan Summary", path: "/academics/lesson-planning/summary" },
      ],
    },
    {
      name: "Academic Calendar",
      path: "/academics/academic-calendar",
      icon: <MdOutlineCalendarMonth />,
      subItems: [
        { name: "Add Event", path: "/academics/academic-calendar/add" },
        { name: "View Calendar", path: "/academics/academic-calendar/view" },
        { name: "Import Holidays", path: "/academics/academic-calendar/import" },
      ],
    },
    {
      name: "Assignments & Notes",
      path: "/academics/assignments-notes",
      icon: <TbNotes />,
      subItems: [
        { name: "Create Assignment", path: "/academics/assignments-notes/create" },
        { name: "Manage Assignment", path: "/academics/assignments-notes/manage" },
        { name: "Upload Study Notes", path: "/academics/assignments-notes/upload-notes" },
      ],
    },
    {
      name: "Time Table",
      path: "/academics/time-table",
      icon: <TbCalendarClock />,
      subItems: [
        { name: "Create Timetable", path: "/academics/time-table/create" },
        { name: "Manage Timetable", path: "/academics/time-table/manage" },
        { name: "View Teacher Timetable", path: "/academics/time-table/teachers" },
        { name: "Timetable Export", path: "/academics/time-table/export" },
      ],
    },
  ],
},


 {
  name: "Students",
 icon: <FaUserGraduate />,
  subItems: [
    {
      name: "Student Admission",
      icon: <FaUserTie />,
      subItems: [
        { name: "New Admission", path: "/students/admission/add" },
          { name:"Manage Student", path: "/students/admission/manage" },
        // { name: "Parent Details", path: "/students/admission/parent-details" },
        // { name: "Address Details", path: "/students/admission/address-details" },
        // { name: "Category & Caste", path: "/students/admission/category-caste" },
        // { name: "Academic Info", path: "/students/admission/academic-info" },
        // { name: "Document Upload", path: "/students/admission/document-upload" },
        // { name: "Transport & Hostel", path: "/students/admission/transport-hostel" },
        // { name: "Fee Mapping", path: "/students/admission/fee-mapping" },
        // { name: "Preview & Confirm", path: "/students/admission/preview" },
      ],
    },
    {
      name: "Student List",
      icon: <MdFormatListBulleted />,
      subItems: [
        { name: "All Students", path: "/students/list/all" },
        { name: "Filtered List", path: "/students/list/filtered" },
        { name: "Student Profile", path: "/students/list/profile" },
        { name: "Bulk Actions", path: "/students/list/bulk-actions" },
      ],
    },
    {
      name: "Attendance",
      icon: <FaCalendarCheck />,
      subItems: [
        { name: "Daily Attendance", path: "/students/attendance/daily" },
        { name: "Subject-wise", path: "/students/attendance/subject" },
        { name: "View Attendance", path: "/students/attendance/view" },
        { name: "Monthly Report", path: "/students/attendance/monthly" },
        { name: "Attendance Settings", path: "/students/attendance/settings" },
        { name: "Biometric Integration", path: "/students/attendance/biometric" },
      ],
    },
    {
      name: "ID Card Generation",
      icon: <FaIdCard />,
      subItems: [
        { name: "Design Template", path: "/students/id/design-template" },
        { name: "Print ID Cards", path: "/students/id/print" },
        { name: "Print History", path: "/students/id/history" },
      ],
    },
    {
      name: "Document Management",
      icon: <FaFileAlt />,
      subItems: [
        { name: "Upload Documents", path: "/students/documents/upload" },
        { name: "View Documents", path: "/students/documents/view" },
        { name: "Document Checklist", path: "/students/documents/checklist" },
      ],
    },
    {
      name: "Guardian Information",
      icon: <FaChild />,
      subItems: [
        { name: "Add Guardian", path: "/students/guardians/add" },
        { name: "View Guardians", path: "/students/guardians/view" },
        { name: "Guardian Login Access", path: "/students/guardians/login-access" },
      ],
    },
    {
      name: "Student Transfer",
      icon: <FaExchangeAlt />,
      subItems: [
        { name: "Mark as Transferred", path: "/students/transfer/mark" },
        { name: "Transfer Records", path: "/students/transfer/records" },
        { name: "Transfer Certificate", path: "/students/transfer/tc" },
      ],
    },
    {
      name: "Promotion",
      icon: <FaArrowUp />,
      subItems: [
        { name: "Promote Students", path: "/students/promotion/promote" },
        { name: "Promotion History", path: "/students/promotion/history" },
        { name: "Roll No. Configuration", path: "/students/promotion/roll-config" },
        { name: "Promotion Rules", path: "/students/promotion/rules" },
      ],
    },
    {
      name: "Alumni View",
      icon: <FaUserClock />,
      subItems: [
        { name: "Alumni Directory", path: "/students/alumni/directory" },
        { name: "Add to Alumni", path: "/students/alumni/add" },
        { name: "Alumni Events", path: "/students/alumni/events" },
        { name: "Communication", path: "/students/alumni/communication" },
      ],
    },
    {
      name: "Health Record",
      icon: <FaHeartbeat />,
      subItems: [
        { name: "Add Health Info", path: "/students/health/add" },
        { name: "Health Report", path: "/students/health/report" },
      ],
    },
    {
      name: "House/Club Allocation",
      icon: <FaHome />,
      subItems: [
        { name: "House Management", path: "/students/house/management" },
        { name: "Club Management", path: "/students/club/management" },
        { name: "Assign House", path: "/students/house/assign" },
        { name: "Assign Club", path: "/students/club/assign" },
        { name: "House/Club Reports", path: "/students/house-club/reports" },
      ],
    },
    {
      name: "Bulk Import/Export",
      icon: <FaDatabase />,
      subItems: [
        { name: "Student Import", path: "/students/bulk/import" },
      ],
    },
    {
      name: "Skill Development",
      icon: <FaLightbulb />,
      subItems: [
        { name: "Logic Games", path: "/students/skills/logic-games" },
        { name: "Problem Solving Hub", path: "/students/skills/problem-solving" },
        { name: "Quiz Arena", path: "/students/skills/quiz-arena" },
        { name: "Leaderboard", path: "/students/skills/leaderboard" },
        { name: "Club Activities", path: "/students/skills/clubs" },
        { name: "Current Affairs", path: "/students/skills/current-affairs" },
        { name: "Weekly Quiz", path: "/students/skills/weekly-quiz" },
        { name: "Articles/Submissions", path: "/students/skills/articles" },
        { name: "Archive & Search", path: "/students/skills/archive" },
      ],
    },
  ]
}
,
{
  name: "Staff",
  icon: <FaUserTie />, 
  path: "/staff",
  subItems: [
    {
      name: "Add Staff",
      icon: <FaUserPlus />,
      path: "/staff/add",
      subItems: [
        { name: "Add Staff", path: "/staff/add/add-staff" },
        { name: "Manage Staff",  path: "/staff/manage-staff" },
        // { name: "Leaves",  path: "/staff/add/leaves" },
        // { name: "Bank Details", path: "/staff/add/bank-details" },
        // { name: "Documents",  path: "/staff/add/documents" },
        // { name: "App Access",  path: "/staff/add/app-access" }
      ]
    },
    // {
    //   name: "Manage User",
    //   icon: <MdOutlineSettings />,
    //   path: "/staff/manage-user",
    //   // subItems: [
    //   //   { name: "Staff",  path: "/staff/manage-user/staff" }
    //   // ]
    // },
    {
      name: "Leave Management",
      icon: <FaClipboardList />,
      path: "/staff/leave-management",
      subItems: [
        { name: "Apply Leave", path: "/staff/leave-management/apply" },
        { name: "LeaveRequest", path: "/staff/leave-management/leave" },
        { name: "Leave Approve",  path: "/staff/leave-management/approve" },
        { name: "Leave Summary", path: "/staff/leave-management/summary" },
        { name: "Leave Policy", path: "/staff/leave-management/policy" }
      ]
    },
    {
      name: "Attendance",
      icon: <FaCalendarCheck />,
      path: "/staff/attendance",
      subItems: [
        { name: "Add Attendance", path: "/staff/attendance/add" },
        { name: "Manage Attendance", path: "/staff/attendance/manage" }
      ]
    }
  ]
},{
  name: "Payroll",
  icon: <FaRupeeSign />,
  subItems: [
    {
      name: "Salary Structure",
      path: "/payroll/salary-structure",
      icon: <MdEditDocument />,
    },
    {
      name: "Manage Assign Salary",
      path: "/payroll/manage-assign-salary",
      icon: <FaWallet />,
    },
    {
      name: "Employee Salary",
      path: "/payroll/employee-salary",
      icon: <RiUserReceived2Line />,
    },
    {
      name: "Driver & Attendants Salary",
      path: "/payroll/driver-salary",
      icon: <FaBus />,
    },
    {
      name: "Payslip Management",
      path: "/payroll/payslip-management",
      icon: <FaFileInvoiceDollar />,
    },
    {
      name: "Salary Reports",
      path: "/payroll/salary-reports",
      icon: <FaChartBar />,
    },
  ],
},


{
  name: "Finance",
  icon: <FaUniversity />,
  subItems: [
    {
      name: "Finance Dashboard",
      icon: <FaTachometerAlt />,
      subItems: [
        { name: "Overview", path: "/finance/dashboard/overview" },
        { name: "Fee Collection Stats", path: "/finance/dashboard/fee-collection" },
        { name: "Pending Alerts", path: "/finance/dashboard/pending-alerts" },
        { name: "Quick Actions", path: "/finance/dashboard/quick-actions" },
      ]
    },
    {
      name: "Fee Setup",
      icon: <FaCog />,
      subItems: [
        { name: "Fee Groups", path: "/finance/fee-setup/fee-groups" },
        { name: "Fee Benefits", path: "/finance/fee-setup/fee-benefits" },
        { name: "Assign Fees to Classes", path: "/finance/fee-setup/assign-fees" },
        { name: "Payment Frequency", path: "/finance/fee-setup/payment-frequency" },
        { name: "Fee Ledger Settings", path: "/finance/fee-setup/ledger-settings" },
      ]
    },
    {
      name: "Fee Collection",
      icon: <FaCashRegister />,
      subItems: [
        { name: "Collect Fee", path: "/finance/fee-collection/collect" },
        { name: "Collection History", path: "/finance/fee-collection/history" },
      ]
    },
    {
      name: "Fee Due Management",
      icon: <FaCalendarAlt />,
      subItems: [
        { name: "Due Report", path: "/finance/fee-due/report" },
        { name: "Send Reminders", path: "/finance/fee-due/reminders" },
      ]
    },
    {
      name: "Fee Reports",
      icon: <FaChartBar />,
      subItems: [
        { name: "Collection Summary", path: "/finance/fee-reports/collection-summary" },
        { name: "Head-wise Report", path: "/finance/fee-reports/head-wise" },
        { name: "Defaulters Report", path: "/finance/fee-reports/defaulters" },
      ]
    },
    {
      name: "Refunds",
      icon: <FaUndo />,
      subItems: [
        { name: "Initiate Refund", path: "/finance/refunds/initiate" },
        { name: "Refund History", path: "/finance/refunds/history" },
      ]
    },
    {
      name: "Online Payments",
      icon: <FaCreditCard />,
      subItems: [
        { name: "Payment Gateway Settings", path: "/finance/online-payments/gateway-settings" },
        { name: "Online Payment Logs", path: "/finance/online-payments/logs" },
      ]
    },
    {
      name: "Fine & Penalty",
      icon: <FaExclamationCircle />,
      subItems: [
        { name: "Create Fine Type", path: "/finance/fine/create" },
        { name: "Apply Fine", path: "/finance/fine/apply" },
        { name: "Fine Collection", path: "/finance/fine/collection" },
        { name: "Fine Reports", path: "/finance/fine/reports" },
      ]
    },
    {
      name: "Transport Fee",
      icon: <FaBus />,
      subItems: [
        { name: "Route Setup", path: "/finance/transport-fee/routes" },
        { name: "Assign Transport Fee", path: "/finance/transport-fee/assign" },
        { name: "Collect Transport Fee", path: "/finance/transport-fee/collect" },
        { name: "Transport Fee Report", path: "/finance/transport-fee/reports" },
      ]
    },
    {
      name: "Hostel Fee",
      icon: <FaHome />,
      subItems: [
        { name: "Room Setup", path: "/finance/hostel-fee/rooms" },
        { name: "Assign Hostel Fee", path: "/finance/hostel-fee/assign" },
        { name: "Collect Hostel Fee", path: "/finance/hostel-fee/collect" },
        { name: "Hostel Fee Report", path: "/finance/hostel-fee/reports" },
      ]
    }
  ]
},

 {
  name: "Library",
  icon: <MdOutlineLibraryBooks />, 
  subItems: [
    { 
      name: "Add Categories", 
      path: "/library/categories", 
      icon: <FaPlusSquare /> 
    },
    {
      name: "Books",
      icon: <FaBook />,
      subItems: [
        { name: "Add Books", path: "/library/books/add", icon: <FaBook /> },
        { name: "Manage Books", path: "/library/books/manage", icon: <RiBook2Line /> },
      ]
    },
    {
      name: "Issue & Return",
      icon: <RiBookOpenLine />,
      subItems: [
        { name: "Issue Book", path: "/library/issue-return/issue", icon: <FaBook /> },
        { name: "Return Book", path: "/library/issue-return/return", icon: <RiBook3Line /> },
        { name: "History", path: "/library/issue-return/history", icon: <FaBookReader /> },
      ]
    },
    {
      name: "Requests",
      icon: <RiBook2Line />,
      subItems: [
        { name: "Request Book", path: "/library/requests", icon: <FaBookReader /> },
    {
  name: "Manage Request Book",
  path: "/library/manage-requests",
  icon: <FaBookReader />,
}

      ]
    },
    // {
    //   name: "Reports",
    //   icon: <FaChartBar />,
    //   subItems: [
    //     { name: "Inventory Report", path: "/library/reports/inventory", icon: <FaBook /> },
    //     { name: "Issued Books Report", path: "/library/reports/issued-books", icon: <RiBookOpenLine /> },
    //     { name: "Overdue Books Report", path: "/library/reports/overdue", icon: <RiBook3Line /> },
    //     { name: "Return History Report", path: "/library/reports/return-history", icon: <FaBookReader /> },
    //     { name: "Requests Report", path: "/library/reports/requests", icon: <RiBook2Line /> },
    //     { name: "Fine Collection Report", path: "/library/reports/fine-collection", icon: <FaChartBar /> },
    //     { name: "Popular Books Report", path: "/library/reports/popular-books", icon: <FaBook /> },
    //   ]
    // },
    {
      name: "Digital Library",
      icon: <FaCloudUploadAlt />,
      subItems: [
        { name: "Upload Digital Material", path: "/library/digital/upload", icon: <FaCloudUploadAlt /> },
        { name: "Manage Digital Material", path: "/library/digital/manage", icon: <FaBookReader /> },
      ]
    }
  ]
}
,
  {
    name: "Hostel",
    icon: <FaBuilding />,   // Replaced with hostel-like building
    subItems: [
      {
        name: "Hostel Dashboard",
        icon: <MdDashboard />,
        subItems: [
          { name: "Overview Summary", path: "/hostel/dashboard/overview" },
          { name: "Hostel Statistics", path: "/hostel/dashboard/statistics"},
          { name: "Upcoming Expiry Alerts", path: "/hostel/dashboard/expiry-alerts" },
          { name: "Pending Requests", path: "/hostel/dashboard/requests"},
          { name: "Today’s Activity", path: "/hostel/dashboard/activity" },
        ]
      },
      {
        name: "Hostel Details & Rooms",
        icon: <FaBed />,   // Bed for rooms
        subItems: [
          { name: "Add / Manage Hostels", path: "/hostel/details/manage" },
          { name: "Room Setup", path: "/hostel/details/room-setup" },
        ]
      },
      {
        name: "Assignments & Transfers",
        icon: <FaExchangeAlt />,  
        subItems: [
          { name: "Room Assignment", path: "/hostel/assignments/room"},
          { name: "Room Transfer / Vacate", path: "/hostel/assignments/transfer"},
        ]
      },
      {
        name: "Attendance & Audit",
        icon: <FaClipboardCheck />,  
        subItems: [
          { name: "Hostel Register", path: "/hostel/attendance/register" }
        ]
      },
      {
        name: "Visitor Management",
        icon: <FaUsers />, 
        subItems: [
          { name: "Visitor Log", path: "/hostel/visitors/log" },
          { name: "Visitor Approvals", path: "/hostel/visitors/approvals"}
        ]
      },
      {
        name: "Fee Management",
        icon: <FaCreditCard />,  
        subItems: [
          { name: "Hostel Fee Setup", path: "/hostel/fees/setup" },
          { name: "Collect Hostel Fee", path: "/hostel/fees/collect"},
          { name: "Hostel Fee Reports", path: "/hostel/fees/reports"},
        ]
      },
      {
        name: "Reports & Logs",
        icon: <FaChartBar />,  
        subItems: [
          { name: "Room Availability Report", path: "/hostel/reports/availability" },
          { name: "Visitor Log Report", path: "/hostel/reports/visitor-log"}
        ]
      }
    ]
  },

 {
  name: "Transport",
  icon: <FaBus />,
  subItems: [
    {
      name: "Vehicles",
      icon: <FaBus />,
      subItems: [
        // { name: "Add Vehicle", path: "/transport/vehicles/add" },
        { name: "Manage Vehicle", path: "/transport/vehicles/manage" }
      ]
    },
    {
      name: "Drivers & Attendants",
      icon: <FaUserTie />,
      subItems: [
        { name: "Add Driver", path: "/transport/drivers/add" },
        { name: "Manage Driver", path: "/transport/drivers/manage" }
      ]
    },
    {
      name: "Routes & Stops",
      icon: <FaMapMarkedAlt />,
      subItems: [
        { name: "Manage Route", path: "/transport/routes/manage" },
        // { name: "Add Stops", path: "/transport/routes/stops" }
      ]
    },
    {
      name: "Assign Transport",
      icon: <FaUserPlus />,
      subItems: [
        { name: "Assign Students/Staff", path: "/transport/assign" }
      ]
    },
    {
      name: "Transport Timetable",
      icon: <TbCalendarClock />,
      subItems: [
        { name: "Create Timetable", path: "/transport/timetable/create" },
        { name: "Manage Timetable", path: "/transport/timetable/manage" },
        // { name: "Driver Timetable", path: "/transport/timetable/driver" },
        // { name: "Student Timetable", path: "/transport/timetable/student" }
      ]
    },
    {
      name: "Reports",
      icon: <MdOutlineAssignment />, // replaced with suitable report icon
      subItems: [
        { name: "Transport Report", path: "/transport/reports/transport" },
        { name: "Vehicle-Wise Report", path: "/transport/reports/vehicle" },
        { name: "Driver License Expiry", path: "/transport/reports/license-expiry" },
        { name: "Fee Collection Report", path: "/transport/reports/fee" },
        { name: "Stop-wise Student Count", path: "/transport/reports/stop-wise" }
      ]
    },
    {
      name: "Notifications & Alerts",
      icon: <FaBell />,
      subItems: [
        { name: "Bus Late Alert", path: "/transport/alerts/bus-late" },
        { name: "Driver License Expiry", path: "/transport/alerts/license" },
        { name: "Fee Due Reminder", path: "/transport/alerts/fee-reminder" },
        { name: "Vehicle Maintenance Due", path: "/transport/alerts/maintenance" }
      ]
    }
  ]
},
{
  name: "Asset & Inventory",
  icon: <FaWarehouse />, // mapped from mdi:warehouse
  subItems: [
    {
      name: "Item Categories",
      icon: <FaShapes />, // mapped from mdi:shape-outline
      subItems: [
        { name: "Add Category", path: "/inventory/categories/add" },
        { name: "Manage Categories", path: "/inventory/categories/manage" }
      ]
    },
    {
      name: "Vendors",
      icon: <FaUserTie />, // mapped from mdi:account-tie-outline
      subItems: [
        { name: "Add Vendor", path: "/inventory/vendors/add" },
        { name: "Manage Vendor", path: "/inventory/vendors/manage" }
      ]
    },
    {
      name: "Inventory Item",
      icon: <FaClipboardList />, // mapped from mdi:clipboard-list-outline
      subItems: [
        { name: "Add Item", path: "/inventory/items/add" },
        { name: "Manage Item", path: "/inventory/items/manage" }
      ]
    },
    {
      name: "Stock",
      icon: <FaWarehouse />,
      subItems: [
        { name: "Stock In / Purchase Entry", path: "/inventory/stock/in", icon: <FaArrowDown /> },
        { name: "Stock Out / Issue Entry", path: "/inventory/stock/out", icon: <FaArrowUp /> },
        { name: "Stock Request", path: "/inventory/stock/request", icon: <FaClipboard /> }
      ]
    },
    {
      name: "Return / Damage",
      icon: <FaUndo />,
      subItems: [
        { name: "Return Approve", path: "/inventory/return/approve", icon: <FaCheckCircle /> },
        { name: "Return Request", path: "/inventory/return/request", icon: <FaClipboardList /> }
      ]
    },
    {
      name: "Stock Register",
      icon: <FaBook />,
      subItems: [
        { name: "View Stock Register", path: "/inventory/stock/register", icon: <FaEye /> }
      ]
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      subItems: [
        { name: "Inventory Report", path: "/inventory/reports/inventory" },
        { name: "Stock Ledger", path: "/inventory/reports/ledger" },
        { name: "Purchase Report", path: "/inventory/reports/purchase" },
        { name: "Issue Report", path: "/inventory/reports/issue" },
        { name: "Low Stock Report", path: "/inventory/reports/low-stock" }
      ]
    },
    {
      name: "Notifications & Alerts",
      icon: <FaBell />,
      subItems: [
        { name: "Low Stock Alert", path: "/inventory/alerts/low-stock" },
        { name: "Return Due Reminder", path: "/inventory/alerts/return-due" }
      ]
    }
  ]
},
{
  name: "Expense",
  icon: <FaCashRegister />, // mapped from mdi:cash-multiple
  subItems: [
    {
      name: "Add Expense",
      icon: <FaPlusSquare />,
      subItems: [
        { name: "Log Expense", path: "/expense/add" }
      ]
    },
    {
      name: "Manage Expenses",
      icon: <FaClipboardList />,
      subItems: [
        { name: "View Expenses", path: "/expense/manage" }
      ]
    },
    {
      name: "Approval",
      icon: <FaClipboardCheck />,
      subItems: [
        { name: "Expense Approval", path: "/expense/approval" }
      ]
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      subItems: [
        { name: "Expense Summary", path: "/expense/reports/summary" },
        { name: "Vendor-wise Report", path: "/expense/reports/vendor-wise" },
        { name: "Payment Method Report", path: "/expense/reports/payment-method" },
        { name: "Automated Expenses", path: "/expense/reports/automated" },
        { name: "Pending Approval Report", path: "/expense/reports/pending-approval" }
      ]
    },
    {
      name: "Notifications",
      icon: <FaBell />,
      subItems: [
        { name: "Large Expense Alert", path: "/expense/notifications/large-expense" },
        { name: "Approval Request Alert", path: "/expense/notifications/approval-request" }
      ]
    }
  ]
},
{
  name: "Users",
  icon: <FaUsers />,
  subItems: [
    {
      name: "Staff",
      icon: <FaUserTie />,
      subItems: [
        { name: "View Staff", path: "/manage-users/staff/view" },
        { name: "Edit Staff", path: "/manage-users/staff/edit" },
        { name: "Deactivate Staff", path: "/manage-users/staff/deactivate" },
        { name: "Reset Password", path: "/manage-users/staff/reset-password" }
      ]
    },
    {
      name: "Parents",
      icon: <FaChild />,
      subItems: [
        { name: "View Parents", path: "/manage-users/parents/view" },
        { name: "Edit Parents", path: "/manage-users/parents/edit" },
        { name: "Deactivate Parents", path: "/manage-users/parents/deactivate" }
      ]
    },
    {
      name: "Students",
      icon: <FaUserGraduate />,
      subItems: [
        { name: "View Students", path: "/manage-users/students/view" },
        { name: "Edit Students", path: "/manage-users/students/edit" },
        { name: "Deactivate Students", path: "/manage-users/students/deactivate" },
        { name: "Reset Password", path: "/manage-users/students/reset-password" }
      ]
    }
  ]
}
,
{
  name: "Settings",
  icon: <FaCog />, // Replaced with react-icons cog
  subItems: [
    
//  {
//   name: "Staff Settings",
//   icon: <FaUserTie />,
 
// },
{
  name: "Master Data",
  icon: <FaDatabase />, // Replaced with react-icons cog
  subItems: [ // Department Management
    { name: "Manage Department", path: "/settings/master-data/departments/manage" },
    // { name: "View All Departments", path: "/settings/staff/departments" },
    // { name: "Get Department by ID", path: "/settings/staff/departments/:id" },
    // { name: "Update Department", path: "/settings/staff/departments/:id/edit" },
    // { name: "Delete Department", path: "/settings/staff/departments/:id/delete" },
    // { name: "Restore Deleted Department", path: "/settings/staff/departments/:id/restore" },

    // Leave Types Management
    { name: "Manage Leave Type", path: "/settings/master-data/leave-types/manage" },
    // { name: "Create Leave Type", path: "/settings/staff/leave-types/create" },
    // { name: "View All Leave Types", path: "/settings/staff/leave-types" },
    // { name: "Get Leave Type by ID", path: "/settings/staff/leave-types/:id" },
    // { name: "Update Leave Type", path: "/settings/staff/leave-types/:id/edit" },
    // { name: "Delete Leave Type", path: "/settings/staff/leave-types/:id/delete" },
    // { name: "Restore Deleted Leave Type", path: "/settings/staff/leave-types/:id/restore" },

    // Leave Policies Management
    { name: "Manage Leave Policy", path: "/settings/master-data/leave-policies/manage" },
    // { name: "View All Leave Policies", path: "/settings/staff/leave-policies" },
   { name: "Manage Classes", path: "/settings/master-data/classes/manage" },
      { name: "Manage Sections", path: "/settings/master-data/section/manage" },
       { name: "Manage Subjects", path: "/settings/master-data/subjects/manage" },
    { name: "Manage Houses", path: "/settings/master-data/houses/manage" },
    { name: "Manage Fee Category", path: "/settings/master-data/fee-category/manage" },
  
    // Existing manual staff management items
    // { name: "Add New Staff", path: "/settings/staff/add" },
    // { name: "Edit Staff Details", path: "/settings/staff/edit" },
    // { name: "Deactivate Staff", path: "/settings/staff/deactivate" },
    // { name: "Reset Staff Password", path: "/settings/staff/reset-password" },
    // { name: "Staff Role Assignment", path: "/settings/staff/role-assignment" },
    // { name: "Staff Reports", path: "/settings/staff/reports" },

    // New subtitles based on the API reference
    // { name: "Overview", path: "/settings/staff/overview" },

   
  ]},
    {
      name: "Academic Year ",
      path: "/settings/academic-year/manage",
      icon: <FaSchool />
    },
    {
      name: "Institution Details",
      path: "/settings/institution-details",
      icon: <FaUniversity />
    },
    {
      name: "Class & Section Setup",
      path: "/settings/class-section",
      icon: <FaListUl />
    },
    {
      name: "Fee Settings",
      path: "/settings/fee-settings",
      icon: <FaCreditCard />
    },
    {
      name: "Role & Permission Management",
      path: "/settings/role-permission",
      icon: <FaUserLock />
    },
    {
      name: "Certificate & TC Format Setup",
      path: "/settings/certificate-tc",
      icon: <FaFileSignature />
    },
    {
      name: "Report Card Template Setup",
      path: "/settings/report-card-template",
      icon: <FaFileAlt />
    },
    {
      name: "Timetable & Period Setup",
      path: "/settings/timetable",
      icon: <FaCalendarAlt />
    },
    {
      name: "Library Settings",
      path: "/settings/library",
      icon: <FaBook />
    },
    {
      name: "Notifications Settings",
      path: "/settings/notifications",
      icon: <FaBell />
    },
    {
      name: "Transport Settings",
      path: "/settings/transport",
      icon: <FaBus />
    },
    {
      name: "Caste & Religion",
      path: "/settings/caste-religion",
      icon: <FaUsers />
    },
    {
      name: "Plan Details",
      path: "/settings/plan-details",
      icon: <FaClipboardList />
    },
    {
      name: "Other Configurations",
      path: "/settings/other-configurations",
      icon: <FaSlidersH />
    },


    {
      name: "Payroll Settings",
      path: "/settings/payroll",
      icon: <FaMoneyBill />
    },
    {
      name: "Expense Settings",
      path: "/settings/expense",
      icon: <FaMoneyCheckAlt />
    },
    {
      name: "Receipt Settings",
      path: "/settings/receipt",
      icon: <FaReceipt />
    },
    {
      name: "Finance Settings",
      path: "/settings/finance",
      icon: <FaChartLine />
    }
  ]
}



];

export default MenuItem;


