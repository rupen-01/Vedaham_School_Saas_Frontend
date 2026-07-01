
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout and UI
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Sidebar/TopBar';
import Header from './components/common/Header';
import { useColorContext } from './context/context';
import { useMediaQuery } from '@mui/material';
import ClassTeacherAllowcation from './pages/academics/Class Teacher Allocation/ClassTeacherAllowcation';
import ManageClassTeacherAllowcation from './pages/academics/Class Teacher Allocation/ManageClassAllowcation';

import ManageSubject from './pages/academics/Subjects/Subjects/ManageSubject';
import AddLessonPlan from './pages/academics/Lesson Planning/AddLessonPlan';
import ApproveLessonPlan from './pages/academics/Lesson Planning/ApproveLessonPlan';
import PlanSummary from './pages/academics/Lesson Planning/PlanSummary';
import AddEvent from './pages/academics/academic-calendar/AddEvent';
import ViewCalendar from './pages/academics/academic-calendar/ViewCalendar';
import ImportHolidays from './pages/academics/academic-calendar/ImportHolidays';
import CreateAssignment from './pages/academics/assignments-notes/CreateAssignment';
import ManageAssignment from './pages/academics/assignments-notes/ManageAssignment';
import UploadNotes from './pages/academics/assignments-notes/UploadNotes';
import CreateTimetable from './pages/academics/time-table/CreateTimetable';
import ManageTimetable from './pages/academics/time-table/ManageTimetable';
import TeacherTimetable from './pages/academics/time-table/TeacherTimetable';
import ViewTimeTable from './pages/academics/time-table/TimetableExport';
import SearchProxy from './pages/academics/time-table/SearchProxy';
import PromoteStudents from './pages/academics/promotion-alumni/PromoteStudents';
import PromotionHistory from './pages/academics/promotion-alumni/PromotionHistory';
import TransferStudents from './pages/academics/promotion-alumni/TransferStudents';
import AlumniDirectory from './pages/academics/promotion-alumni/AlumniDirectory';
import AlumniCommunication from './pages/academics/promotion-alumni/AlumniCommunication';
import PromotionRules from './pages/academics/promotion-alumni/PromotionRules';
import AssignSubjects from './pages/academics/Subjects/AssignSubjects/AssignSubject';
import AddSubject from './pages/academics/Subjects/Subjects/AddSubject';
//Students 
import NewAdmission from './pages/students/admission/NewAdmission';
import ParentDetail from './pages/students/admission/ParentDetail';
import AddressDetail from './pages/students/admission/AddressDetail';
import CategoryAndCaste from './pages/students/admission/CategoryAndCaste';
import AcademicInfo from './pages/students/admission/AcademicInfo';
import DocumentUpload from './pages/students/admission/DocumentUpload';
import TransportAndHostel from './pages/students/admission/TransportAndHostel';
import FeeMapping from './pages/students/admission/FeeMapping';
import PreviewAdmission from './pages/students/admission/PreviewAdmission';
import AllStudents from './pages/students/list/AllStudents';
import FilteredList from './pages/students/list/FilteredList';
import StudentProfile from './pages/students/list/StudentProfile';
import BulkActions from './pages/students/list/BulkActions';
import DailyAttendance from './pages/students/attendance/DailyAttendance';
import SubjectAttendance from './pages/students/attendance/SubjectAttendance';
import ViewAttendance from './pages/students/attendance/ViewAttendance';
import MonthlyReport from './pages/students/attendance/MonthlyReport';
import AttendanceSettings from './pages/students/attendance/AttendanceSettings';
import BiometricIntegration from './pages/students/attendance/BiometricIntegration';
import DesignTemplate from './pages/students/id/DesignTemplate';
import PrintIDCards from './pages/students/id/PrintIDCards';
import PrintHistory from './pages/students/id/PrintHistory';
import UploadDocuments from './pages/students/documents/UploadDocuments';
import ViewDocuments from './pages/students/documents/ViewDocuments';
import DocumentChecklist from './pages/students/documents/DocumentChecklist';
import AddGuardian from './pages/students/guardians/AddGuardian';
import ViewGuardians from './pages/students/guardians/ViewGuardians';
import GuardianLoginAccess from './pages/students/guardians/GuardianLoginAccess';
import MarkTransferred from './pages/students/transfer/MarkTransferred';
import TransferRecords from './pages/students/transfer/TransferRecords';
import TransferCertificate from './pages/students/transfer/TransferCertificate';
import PromoteStudentsStd from './pages/students/promotion/PromoteStudentsStd';
import PromotionHistoryStd from './pages/students/promotion/PromotionHistoryStd';
import RollNoConfig from './pages/students/promotion/RollNoConfig';
import PromotionRulesStd from './pages/students/promotion/PromotionRulesStd';
import AlumniDirectoryStd from './pages/students/alumni/AlumniDirectoryStd';
import AddAlumni from './pages/students/alumni/AddAlumni';
import AlumniEvents from './pages/students/alumni/AlumniEvents';
import AlumniCommunicationStd from './pages/students/alumni/AlumniCommunicationStd';
import AddHealthInfo from './pages/students/health/AddHealthInfo';
import HealthReport from './pages/students/health/HealthReport';
import HouseManagement from './pages/students/house/HouseManagement';
import ClubManagement from './pages/students/club/ClubManagement';
import AssignHouse from './pages/students/house/AssignHouse';
import AssignClub from './pages/students/club/AssignClub';
import StudentImport from './pages/students/bulk/StudentImport';
import LogicGames from './pages/students/skills/LogicGames';
import ProblemSolving from './pages/students/skills/ProblemSolving';
import QuizArena from './pages/students/skills/QuizArena';
import Leaderboard from './pages/students/skills/Leaderboard';
import ClubActivities from './pages/students/skills/ClubActivities';
import CurrentAffairs from './pages/students/skills/CurrentAffairs';
import WeeklyQuiz from './pages/students/skills/WeeklyQuiz';
import Articles from './pages/students/skills/Articles';
import ArchiveSearch from './pages/students/skills/ArchiveSearch';
import ManageAssignSubjects from './pages/academics/Subjects/AssignSubjects/ManageAssignSubject';
import AddAssignSubject from './pages/academics/Subjects/AssignSubjects/AssignSubject';
import ReviewPlanModal from './pages/academics/Lesson Planning/ReviewApproveLessonPlan';
import AddStaff from './pages/Staff/add/Add staff';
import ManageStaff from './pages/Staff/add/ManageStaff';
import ApplyLeave from './pages/Staff/leave-management/ApplyLeave';
import ApproveLeave from './pages/Staff/leave-management/ApproveLeave';
import LeaveSummary from './pages/Staff/leave-management/LeaveSummary';
import LeavePolicy from './pages/Staff/leave-management/LeavePolicy';
import AddAttendance from './pages/Staff/attendance/AddAttendance';
import ManageAttendance from './pages/Staff/attendance/ManageAttendance';

      {/* Payroll */}
import SalaryStructure from './pages/Payroll/SalaryStructure';
import EmployeeSalary from './pages/Payroll/EmployeeSalary';
import DriverSalary from './pages/Payroll/DriverSalary';
import PayslipManagement from './pages/Payroll/PayslipManagement';
import SalaryReports from './pages/Payroll/SalaryReports';
import LeaveRequest from './pages/Staff/leave-management/LeaveRequest';
import ViewLeaveRequest from './pages/Staff/leave-management/component/ViewLeaveRequest';
import ViewLeaveSummary from './pages/Staff/leave-management/component/ViewLeaveSummary';
import ViewStaff from './pages/Staff/add/component/Viewstaff';
import AddSalaryStructure from './pages/Payroll/component/AddSalaryStruture';
import ViewSalaryStructure from './pages/Payroll/component/Viewsalarystructure';
import ManageAssignSalary from './pages/Payroll/ManageAssignSalary';
import AssignSalary from './pages/Payroll/component/AddAssignSalary';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/auth/Login';
import ViewAssignSalary from './pages/Payroll/component/ViewAssignSalary';
import ManageBookCategories from './pages/library/categories/ManageCategory';
import AddBooks from './pages/library/books/AddBooks';
import ManageBooks from './pages/library/books/ManageBooks';
import IssueBook from './pages/library/issue-return/IssueBook';
import ReturnBook from './pages/library/issue-return/ReturnBook';
import IssueReturnHistory from './pages/library/issue-return/IssueReturnHistory';
import RequestBook from './pages/library/requests/RequestBook';
import ManageRequest from './pages/library/requests/ManageRequestBook';
import InventoryReport from './pages/library/reports/InventoryReport';
import IssuedBooksReport from './pages/library/reports/IssuedBooksReport';
import OverdueBooksReport from './pages/library/reports/OverdueBooksReport';
import ReturnHistoryReport from './pages/library/reports/ReturnHistoryReport';
import RequestsReport from './pages/library/reports/RequestsReport';
import FineCollectionReport from './pages/library/reports/FineCollectionReport';
import PopularBooksReport from './pages/library/reports/PopularBooksReport';
import UploadDigitalMaterial from './pages/library/digital/UploadDigitalMaterial';
import ManageDigitalMaterial from './pages/library/digital/ManageDigitalMaterial';
import OverviewSummary from './pages/hostel/dashboard/overview';
import HostelStatistics from './pages/hostel/dashboard/statistics';
import ExpiryAlerts from './pages/hostel/dashboard/expiry-alerts';
import PendingRequests from './pages/hostel/dashboard/requests';
import TodaysActivity from './pages/hostel/dashboard/activity';
import ManageHostels from './pages/hostel/details/manage';
import RoomSetup from './pages/hostel/details/room-setup';
import RoomAssignment from './pages/hostel/assignments/room';
import RoomTransfer from './pages/hostel/assignments/transfer';
import HostelRegister from './pages/hostel/attendance/register';
import VisitorLog from './pages/hostel/visitors/log';
import VisitorApprovals from './pages/hostel/visitors/approvals';
import HostelFeeSetup from './pages/hostel/fees/setup';
import CollectHostelFee from './pages/hostel/fees/collect';
import HostelFeeReports from './pages/hostel/fees/reports';
import RoomAvailabilityReport from './pages/hostel/reports/availability';
import VisitorLogReport from './pages/hostel/reports/visitor-log';
import FinanceOverview from './pages/finance/dashboard/FinanceOverview';
import FeeCollectionStats from './pages/finance/dashboard/FeeCollectionStats';
import PendingAlerts from './pages/finance/dashboard/PendingAlerts';
import QuickActions from './pages/finance/dashboard/QuickActions';
import FeeGroups from './pages/finance/fee-setup/FeeGroups';
import FeeBenefits from './pages/finance/fee-setup/FeeBenefits';
import AssignFees from './pages/finance/fee-setup/AssignFees';
import PaymentFrequency from './pages/finance/fee-setup/PaymentFrequency';
import LedgerSettings from './pages/finance/fee-setup/LedgerSettings';
import CollectFee from './pages/finance/fee-collection/CollectFee';
import CollectionHistory from './pages/finance/fee-collection/CollectionHistory';
import DueReport from './pages/finance/fee-due/DueReport';
import SendReminders from './pages/finance/fee-due/SendReminders';
import CollectionSummary from './pages/finance/fee-reports/CollectionSummary';
import HeadWiseReport from './pages/finance/fee-reports/HeadWiseReport';
import DefaultersReport from './pages/finance/fee-reports/DefaultersReport';
import InitiateRefund from './pages/finance/refunds/InitiateRefund';
import RefundHistory from './pages/finance/refunds/RefundHistory';
import GatewaySettings from './pages/finance/online-payments/GatewaySettings';
import PaymentLogs from './pages/finance/online-payments/PaymentLogs';
import CreateFine from './pages/finance/fine/CreateFine';
import ApplyFine from './pages/finance/fine/ApplyFine';
import FineCollection from './pages/finance/fine/FineCollection';
import FineReports from './pages/finance/fine/FineReports';
import TransportRoutes from './pages/finance/transport-fee/TransportRoutes';
import AssignTransportFee from './pages/finance/transport-fee/AssignTransportFee';
import CollectTransportFee from './pages/finance/transport-fee/CollectTransportFee';
import TransportFeeReports from './pages/finance/transport-fee/TransportFeeReports';
import HostelRooms from './pages/finance/hostel-fee/HostelRooms';
import AssignHostelFee from './pages/finance/hostel-fee/AssignHostelFee';
import Overview from './pages/hostel/dashboard/overview';
import AssignTransport from './pages/transport/assign/AssignTransport';
import CreateTransportTimetable from './pages/transport/timetable/CreateTransportTimetable';
import ManageTransportTimetable from './pages/transport/timetable/ManageTransportTimetable';
import DriverTimetable from './pages/transport/timetable/DriverTimetable';
import TransportReport from './pages/transport/reports/TransportReport';
import VehicleReport from './pages/transport/reports/VehicleReport';
import LicenseExpiry from './pages/transport/reports/LicenseExpiry';
import TransportFeeReport from './pages/transport/reports/TransportFeeReport';
import StopWiseReport from './pages/transport/reports/StopWiseReport';
import BusLateAlert from './pages/transport/alerts/BusLateAlert';
import DriverLicenseAlert from './pages/transport/alerts/DriverLicenseAlert';
import FeeReminder from './pages/transport/alerts/FeeReminder';
import MaintenanceAlert from './pages/transport/alerts/MaintenanceAlert';
import StudentTimetable from './pages/transport/timetable/StudentTimetable';
import AddCategory from './pages/inventory/categories/AddCategory';
import ManageCategories from './pages/inventory/categories/ManageCategories';
import AddVendor from './pages/inventory/vendors/AddVendor';
import ManageVendors from './pages/inventory/vendors/ManageVendors';
import AddItem from './pages/inventory/items/AddItem';
import ManageItems from './pages/inventory/items/ManageItems';
import StockIn from './pages/inventory/stock/StockIn';
import StockOut from './pages/inventory/stock/StockOut';
import StockRequest from './pages/inventory/stock/StockRequest';
import ReturnApprove from './pages/inventory/return/ReturnApprove';
import ReturnRequest from './pages/inventory/return/ReturnRequest';
import StockRegister from './pages/inventory/stock/StockRegister';
import InventoryReportPage from './pages/inventory/reports/InventoryReportPage';
import StockLedger from './pages/inventory/reports/StockLedger';
import PurchaseReport from './pages/inventory/reports/PurchaseReport';
import IssueReport from './pages/inventory/reports/IssueReport';
import LowStockReport from './pages/inventory/reports/LowStockReport';
import LowStockAlert from './pages/inventory/alerts/LowStockAlert';
import ReturnDueAlert from './pages/inventory/alerts/ReturnDueAlert';
import LogExpense from './pages/expense/LogExpense';
import ManageExpenses from './pages/expense/ManageExpenses';
import ExpenseApproval from './pages/expense/ExpenseApproval';
import ExpenseSummary from './pages/expense/reports/ExpenseSummary';
import VendorWiseReport from './pages/expense/reports/VendorWiseReport';
import PaymentMethodReport from './pages/expense/reports/PaymentMethodReport';
import AutomatedExpenses from './pages/expense/reports/AutomatedExpenses';
import PendingApprovalReport from './pages/expense/reports/PendingApprovalReport';
import LargeExpenseAlert from './pages/expense/notifications/LargeExpenseAlert';
import ApprovalRequestAlert from './pages/expense/notifications/ApprovalRequestAlert';
import ViewStafff from './pages/manage-users/staff/ViewStafff';
import EditStaff from './pages/manage-users/staff/EditStaff';
import DeactivateStaff from './pages/manage-users/staff/DeactivateStaff';
import ResetStaffPassword from './pages/manage-users/staff/ResetStaffPassword';
import ViewParents from './pages/manage-users/parents/ViewParents';
import EditParents from './pages/manage-users/parents/EditParents';
import DeactivateParents from './pages/manage-users/parents/DeactivateParents';
import ViewStudents from './pages/manage-users/students/ViewStudents';
import EditStudents from './pages/manage-users/students/EditStudents';
import DeactivateStudents from './pages/manage-users/students/DeactivateStudents';
import ResetStudentPassword from './pages/manage-users/students/ResetStudentPassword';
import InstitutionDetails from './pages/settings/InstitutionDetails';
import AcademicDetails from './pages/settings/AcademicDetails';
import ClassSectionSetup from './pages/settings/ClassSectionSetup';
import FeeSettings from './pages/settings/FeeSettings';
import RolePermission from './pages/settings/RolePermission';
import CertificateTC from './pages/settings/CertificateTC';
import ReportCardTemplate from './pages/settings/ReportCardTemplate';
import TimetableSetup from './pages/settings/TimetableSetup';
import LibrarySettings from './pages/settings/LibrarySettings';
import NotificationSettings from './pages/settings/NotificationSettings';
import TransportSettings from './pages/settings/TransportSettings';
import CasteReligion from './pages/settings/CasteReligion';
import PlanDetails from './pages/settings/PlanDetails';
import OtherConfigurations from './pages/settings/OtherConfigurations';
import StaffSettings from './pages/settings/StaffSettings';
import PayrollSettings from './pages/settings/PayrollSettings';
import ExpenseSettings from './pages/settings/ExpenseSettings';
import ReceiptSettings from './pages/settings/ReceiptSettings';
import FinanceSettings from './pages/settings/FinanceSettings';
import AddStudent from './pages/students/admission/AddStudent';
import ManageStudents from './pages/students/admission/ManageStudent';
import ViewStudentDetails from './pages/students/admission/VIewStudent';
import CreateDepartment from './pages/settings/staffSetting/department/CreateDepartment';
import ManageDepartment from './pages/settings/staffSetting/department/ManageDepartment';
import CreateLeaveType from './pages/settings/staffSetting/CreateLeave-type';
import ManageLeaveType from './pages/settings/staffSetting/ManageLeave-type';
import CreateLeavePolicy from './pages/settings/staffSetting/CreateLeave-policy';
import ManageLeavePolicy from './pages/settings/staffSetting/MangeLeave-policy';
import ManageVehicles from './pages/transport/vehicles/ManageVehicle';
import ManageDriverAttendants from './pages/transport/drivers/ManageDriver';
import AddDriverAttendant from './pages/transport/drivers/AddDriver';
import ManageRoutes from './pages/transport/routes/ManageRoutes';
import ManageAcademicYear from './pages/settings/ManageAcadmic-year';
import ManageClass from './pages/settings/masterSetting/class/ManageClasses';
import ManageSection from './pages/settings/masterSetting/section/ManageSection';
import ManageSubjects from './pages/settings/masterSetting/subjects/ManageSubjects';
import ManageHouses from './pages/settings/masterSetting/house/ManageHouses';
import ManageFeeCategory from './pages/settings/masterSetting/feeCategory/ManageFeeCategory';

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


function App() {
  const { isCollapsed, setIsCollapsed, activeNavStyle, activeNavColor } = useColorContext();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const location = useLocation();

  useEffect(() => {
    if (isMobile) setIsCollapsed(true);
  }, [isMobile, setIsCollapsed]);

  // ✅ Check if we are on login page
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    // Render login page without sidebar/header
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  }

  return (
    <>
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      {(isMobile || activeNavStyle !== "nav-top") && (
        <>
          {!isCollapsed && isMobile && (
            <div
              onClick={() => setIsCollapsed(true)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] lg:hidden"
            />
          )}

          <Sidebar
            activeNavStyle={activeNavStyle}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            className={`${isMobile ? "fixed top-0 left-0 h-full z-[999]" : ""}`}
          />
        </>
      )}

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 overflow-hidden ${
          !isMobile && activeNavStyle !== "nav-top"
            ? isCollapsed
              ? "lg:ml-20"
              : "lg:ml-[288px]"
            : ""
        }`}
      >
        <Header
          setIsCollapsed={setIsCollapsed}
          activeNavColor={activeNavColor}
          activeNavStyle={activeNavStyle}
        />

        {activeNavStyle === "nav-top" && (
          <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        )}

        {/* Page content */}
        <div
          className={`flex-1 overflow-y-auto px-2 sm:px-5 py-2 md:py-[8px] bg-gray-100 pb-10 transition-all duration-300 ${
            isCollapsed
              ? location?.pathname === "/"
                ? "lg:px-10"
                : "lg:px-14 xl:px-32 ml-20 xl:ml-0"
              : "lg:px-10"
          }`}
        >
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path="/" element={<ManageClassTeacherAllowcation/>} />
            {/* {generateRoutes(menuItems)} // Dynamic menu-based routes */}
            <Route path="/academics/class-teacher-allocation/AddClassTeacherAllowcation" element={< ClassTeacherAllowcation/>} /> 
             <Route path="/academics/class-teacher-allocation" element={< ManageClassTeacherAllowcation/>} /> 
     <Route path='/academics/subjects/manage/add' element={<AddSubject />} />
<Route path="/academics/subjects/manage" element={<ManageSubject />} />
  <Route path="/academics/subjects/manage-assign" element={<ManageAssignSubjects />} />
<Route path="/academics/subjects/manage-assign/add" element={<AddAssignSubject/>} />
        <Route path="/academics/lesson-planning/create" element={<AddLessonPlan/>} />
      <Route path="/academics/lesson-planning/approve" element={<ApproveLessonPlan />} />
      <Route path="/academics/lesson-planning/summary" element={<PlanSummary />} />
         <Route path="/academics/academic-calendar/add" element={<AddEvent />} />
      <Route path="/academics/academic-calendar/view" element={<ViewCalendar />} />
      <Route path="/academics/academic-calendar/import" element={<ImportHolidays />} />
    <Route path="/academics/assignments-notes/create" element={<CreateAssignment />} />
      <Route path="/academics/assignments-notes/manage" element={<ManageAssignment />} />
      <Route path="/academics/assignments-notes/upload-notes" element={<UploadNotes />} />
      <Route path="/academics/time-table/create" element={<CreateTimetable />} />
        <Route path="/academics/time-table/manage" element={<ManageTimetable/>} />
      <Route path="/academics/time-table/teachers" element={<TeacherTimetable />} />
      <Route path="/academics/time-table/export" element={<ViewTimeTable/>} />
      <Route path="/academics/time-table/search-proxy" element={<SearchProxy/>} />
      <Route path="/academics/promotion-alumni/promote" element={<PromoteStudents/>} />
      <Route path="/academics/promotion-alumni/history" element={<PromotionHistory />} />
      <Route path="/academics/promotion-alumni/transfer" element={<TransferStudents />} />
      <Route path="/academics/promotion-alumni/directory" element={<AlumniDirectory/>} />
      <Route path="/academics/promotion-alumni/communication" element={<AlumniCommunication />} />
      <Route path="/academics/promotion-alumni/rules" element={<PromotionRules />} /> 

      {/* Students */}
     <Route path="/students/admission/add" element={<AddStudent/>} />
          <Route path="/students/admission/manage" element={<ManageStudents/>} />
           <Route path="/students/admission/view" element={<ViewStudentDetails/>} />
      <Route path="/students/admission/parent-details" element={<ParentDetail/>} />
      <Route path="/students/admission/address-details" element={<AddressDetail/>} />
      <Route path="/students/admission/category-caste" element={<CategoryAndCaste />} />
    <Route path="/students/admission/academic-info" element={<AcademicInfo />} />
      <Route path="/students/admission/document-upload" element={<DocumentUpload />} />
      <Route path="/students/admission/transport-hostel" element={<TransportAndHostel/>} />
      <Route path="/students/admission/fee-mapping" element={<FeeMapping/>} />
      <Route path="/students/admission/preview" element={<PreviewAdmission />} />
      <Route path="/students/list/all" element={<AllStudents />} />
      <Route path="/students/list/filtered" element={<FilteredList />} />
      <Route path="/students/list/profile" element={<StudentProfile />} />
      <Route path="/students/list/bulk-actions" element={<BulkActions />} />
      <Route path="/students/attendance/daily" element={<DailyAttendance/>} />
      <Route path="/students/attendance/subject" element={<SubjectAttendance/>} />
      <Route path="/students/attendance/view" element={<ViewAttendance />} />
      <Route path="/students/attendance/monthly" element={<MonthlyReport />} />
      <Route path="/students/attendance/settings" element={<AttendanceSettings />} />
      <Route path="/students/attendance/biometric" element={<BiometricIntegration />} />
      <Route path="/students/id/design-template" element={<DesignTemplate />} />
      <Route path="/students/id/print" element={<PrintIDCards/>} />
      <Route path="/students/id/history" element={<PrintHistory/>} />
      <Route path="/students/documents/upload" element={<UploadDocuments/>} />
      <Route path="/students/documents/view" element={<ViewDocuments />} />
      <Route path="/students/documents/checklist" element={<DocumentChecklist />} />
      <Route path="/students/guardians/add" element={<AddGuardian/>} />
      <Route path="/students/guardians/view" element={<ViewGuardians/>} />
      <Route path="/students/guardians/login-access" element={<GuardianLoginAccess />} />
      <Route path="/students/transfer/mark" element={<MarkTransferred />} />
      <Route path="/students/transfer/records" element={<TransferRecords />} />
      <Route path="/students/transfer/tc" element={<TransferCertificate/>} />
      <Route path="/students/promotion/promote" element={<PromoteStudentsStd />} />
      <Route path="/students/promotion/history" element={<PromotionHistoryStd />} />
      <Route path="/students/promotion/roll-config" element={<RollNoConfig />} />
      <Route path="/students/promotion/rules" element={<PromotionRulesStd />} />
      <Route path="/students/alumni/directory" element={<AlumniDirectoryStd />} />
      <Route path="/students/alumni/add" element={<AddAlumni />} />
      <Route path="/students/alumni/events" element={<AlumniEvents />} />
      <Route path="/students/alumni/communication" element={<AlumniCommunicationStd />} />
      <Route path="/students/health/add" element={<AddHealthInfo />} />
      <Route path="/students/health/report" element={<HealthReport />} />
      <Route path="/students/house/management" element={<HouseManagement/>} />
      <Route path="/students/club/management" element={<ClubManagement />} />
      <Route path="/students/house/assign" element={<AssignHouse/>} />
      <Route path="/students/club/assign" element={<AssignClub />} />
      <Route path="/students/bulk/import" element={<StudentImport />} />
      <Route path="/students/skills/logic-games" element={<LogicGames/>} />
      <Route path="/students/skills/problem-solving" element={<ProblemSolving/>} />
      <Route path="/students/skills/quiz-arena" element={<QuizArena />} />
      <Route path="/students/skills/leaderboard" element={<Leaderboard />} />
      <Route path="/students/skills/clubs" element={<ClubActivities/>} />
      <Route path="/students/skills/current-affairs" element={<CurrentAffairs />} />
      <Route path="/students/skills/weekly-quiz" element={<WeeklyQuiz />} />
      <Route path="/students/skills/articles" element={<Articles/>} />
      <Route path="/students/skills/archive" element={<ArchiveSearch />} /> 

      {/* Staff */}
      <Route path="/staff/add/add-staff" element={<AddStaff />} />
      <Route path="/staff/manage-staff" element={<ManageStaff />} />
      <Route path="/staff/manage-staff/view}" element={<ViewStaff />} />
      <Route path="/staff/leave-management/apply" element={<ApplyLeave/>} />
         <Route path="/staff/leave-management/leave" element={<LeaveRequest/>} />
         <Route path="/staff/leave-management/view-leave-request" element={<ViewLeaveRequest/>} />
      <Route path="/staff/leave-management/approve" element={<ApproveLeave />} />
      <Route path="/staff/leave-management/summary" element={<LeaveSummary />} />
        <Route path="/staff/leave-management/summary-view" element={<ViewLeaveSummary />} />
      <Route path="/staff/leave-management/policy" element={<LeavePolicy />} />
      <Route path="/staff/attendance/add" element={<AddAttendance />} />
      <Route path="/staff/attendance/manage" element={<ManageAttendance />} />

      {/* Payroll */}
      <Route path="/payroll/salary-structure" element={<SalaryStructure />} />
      <Route path="/payroll/salary-structure/add" element={<AddSalaryStructure />} /> 
          <Route path="/payroll/salary-structure/view" element={<ViewSalaryStructure />} /> 
          <Route path="payroll/manage-assign-salary" element={<ManageAssignSalary/>} />  
          <Route path="payroll/manage-assign-salary/add" element={<AssignSalary/>} />  
                <Route path="payroll/manage-assign-salary/view" element={<ViewAssignSalary/>} />  
      <Route path="/payroll/employee-salary" element={<EmployeeSalary />} />
      <Route path="/payroll/driver-salary" element={<DriverSalary />} />
      <Route path="/payroll/payslip-management" element={<PayslipManagement />} />
      <Route path="/payroll/salary-reports" element={<SalaryReports />} />

      {/* Finance */}
      <Route path="/finance/dashboard/overview" element={<FinanceOverview />} />
      <Route path="/finance/dashboard/fee-collection" element={<FeeCollectionStats/>} />
      <Route path="/finance/dashboard/pending-alerts" element={<PendingAlerts />} />
      <Route path="/finance/dashboard/quick-actions" element={<QuickActions />} />
      <Route path="/finance/fee-setup/fee-groups" element={<FeeGroups />} />
      <Route path="/finance/fee-setup/fee-benefits" element={<FeeBenefits />} />
      <Route path="/finance/fee-setup/assign-fees" element={<AssignFees />} />
      <Route path="/finance/fee-setup/payment-frequency" element={<PaymentFrequency />} />
      <Route path="/finance/fee-setup/ledger-settings" element={<LedgerSettings />} />
      <Route path="/finance/fee-collection/collect" element={<CollectFee />} />
      <Route path="/finance/fee-collection/history" element={<CollectionHistory />} />
      <Route path="/finance/fee-due/report" element={<DueReport />} />
      <Route path="/finance/fee-due/reminders" element={<SendReminders />} />
      <Route path="/finance/fee-reports/collection-summary" element={<CollectionSummary />} />
      <Route path="/finance/fee-reports/head-wise" element={<HeadWiseReport />} />
      <Route path="/finance/fee-reports/defaulters" element={<DefaultersReport />} />
      <Route path="/finance/refunds/initiate" element={<InitiateRefund/>} />
      <Route path="/finance/refunds/history" element={<RefundHistory />} />
      <Route path="/finance/online-payments/gateway-settings" element={<GatewaySettings />} />
      <Route path="/finance/online-payments/logs" element={<PaymentLogs />} />
      <Route path="/finance/fine/create" element={<CreateFine />} />
      <Route path="/finance/fine/apply" element={<ApplyFine />} />
      <Route path="/finance/fine/collection" element={<FineCollection/>} />
      <Route path="/finance/fine/reports" element={<FineReports />} />
      <Route path="/finance/transport-fee/routes" element={<TransportRoutes />} />
      <Route path="/finance/transport-fee/assign" element={<AssignTransportFee />} />
      <Route path="/finance/transport-fee/collect" element={<CollectTransportFee/>} />
      <Route path="/finance/transport-fee/reports" element={<TransportFeeReports />} />
      <Route path="/finance/hostel-fee/rooms" element={<HostelRooms />} />
      <Route path="/finance/hostel-fee/assign" element={<AssignHostelFee/>} />
      <Route path="/finance/hostel-fee/collect" element={<CollectHostelFee />} />
      <Route path="/finance/hostel-fee/reports" element={<HostelFeeReports />} />

      {/* Library */}
      <Route path="/library/categories" element={<ManageBookCategories />} />
      <Route path="/library/books/add" element={<AddBooks/>} />
      <Route path="/library/books/manage" element={<ManageBooks />} />
      <Route path="/library/issue-return/issue" element={<IssueBook/>} />
      <Route path="/library/issue-return/return" element={<ReturnBook />} />
      <Route path="/library/issue-return/history" element={<IssueReturnHistory/>} />
      <Route path="/library/requests" element={<RequestBook/>} />
      <Route path="/library/manage-requests" element={<ManageRequest/>} />
      <Route path="/library/reports/inventory" element={<InventoryReport/>} />
      <Route path="/library/reports/issued-books" element={<IssuedBooksReport />} />
      <Route path="/library/reports/overdue" element={<OverdueBooksReport />} />
      <Route path="/library/reports/return-history" element={<ReturnHistoryReport />} />
      <Route path="/library/reports/requests" element={<RequestsReport />} />
      <Route path="/library/reports/fine-collection" element={<FineCollectionReport/>} />
      <Route path="/library/reports/popular-books" element={<PopularBooksReport />} />
      <Route path="/library/digital/upload" element={<UploadDigitalMaterial />} />
      <Route path="/library/digital/manage" element={<ManageDigitalMaterial />} />

      {/* Hostel */}
      <Route path="/hostel/dashboard/overview" element={<Overview/>} />
      <Route path="/hostel/dashboard/statistics" element={<HostelStatistics />} />
      <Route path="/hostel/dashboard/expiry-alerts" element={<ExpiryAlerts />} />
      <Route path="/hostel/dashboard/requests" element={<PendingRequests/>} />
      <Route path="/hostel/dashboard/activity" element={<TodaysActivity />} />
      <Route path="/hostel/details/manage" element={<ManageHostels />} />
      <Route path="/hostel/details/room-setup" element={<RoomSetup />} />
      <Route path="/hostel/assignments/room" element={<RoomAssignment/>} />
      <Route path="/hostel/assignments/transfer" element={<RoomTransfer />} />
      <Route path="/hostel/attendance/register" element={<HostelRegister />} />
      <Route path="/hostel/visitors/log" element={<VisitorLog />} />
      <Route path="/hostel/visitors/approvals" element={<VisitorApprovals/>} />
      <Route path="/hostel/fees/setup" element={<HostelFeeSetup />} />
      <Route path="/hostel/fees/collect" element={<CollectHostelFee />} />
      <Route path="/hostel/fees/reports" element={<HostelFeeReports/>} />
      <Route path="/hostel/reports/availability" element={<RoomAvailabilityReport />} />
      <Route path="/hostel/reports/visitor-log" element={<VisitorLogReport />} />

      {/* Transport */}
      {/* <Route path="/transport/vehicles/add" element={<AddVehicle />} /> */}
      <Route path="/transport/vehicles/manage" element={<ManageVehicles />} />
      <Route path="/transport/drivers/add" element={<AddDriverAttendant/>} />
      <Route path="/transport/drivers/manage" element={<ManageDriverAttendants />} />
       <Route path="/transport/routes/manage" element={<ManageRoutes />} />
      {/* <Route path="/transport/routes/add" element={<AddRoute />} />
      <Route path="/transport/routes/stops" element={<AddStops />} /> */}
      <Route path="/transport/assign" element={<AssignTransport />} />
      <Route path="/transport/timetable/create" element={<CreateTransportTimetable />} />
      <Route path="/transport/timetable/manage" element={<ManageTransportTimetable/>} />
      <Route path="/transport/timetable/driver" element={<DriverTimetable />} />
      <Route path="/transport/timetable/student" element={<StudentTimetable />} />
      <Route path="/transport/reports/transport" element={<TransportReport/>} />
      <Route path="/transport/reports/vehicle" element={<VehicleReport />} />
      <Route path="/transport/reports/license-expiry" element={<LicenseExpiry />} />
      <Route path="/transport/reports/fee" element={<TransportFeeReport />} />
      <Route path="/transport/reports/stop-wise" element={<StopWiseReport />} />
      <Route path="/transport/alerts/bus-late" element={<BusLateAlert />} />
      <Route path="/transport/alerts/license" element={<DriverLicenseAlert />} />
      <Route path="/transport/alerts/fee-reminder" element={<FeeReminder />} />
      <Route path="/transport/alerts/maintenance" element={<MaintenanceAlert />} />

      {/* Inventory */}
      <Route path="/inventory/categories/add" element={<AddCategory />} />
      <Route path="/inventory/categories/manage" element={<ManageCategories/>} />
      <Route path="/inventory/vendors/add" element={<AddVendor/>} />
      <Route path="/inventory/vendors/manage" element={<ManageVendors />} />
      <Route path="/inventory/items/add" element={<AddItem/>} />
      <Route path="/inventory/items/manage" element={<ManageItems />} />
      <Route path="/inventory/stock/in" element={<StockIn />} />
      <Route path="/inventory/stock/out" element={<StockOut />} />
      <Route path="/inventory/stock/request" element={<StockRequest/>} />
      <Route path="/inventory/return/approve" element={<ReturnApprove />} />
      <Route path="/inventory/return/request" element={<ReturnRequest />} />
      <Route path="/inventory/stock/register" element={<StockRegister />} />
      <Route path="/inventory/reports/inventory" element={<InventoryReportPage />} />
      <Route path="/inventory/reports/ledger" element={<StockLedger />} />
      <Route path="/inventory/reports/purchase" element={<PurchaseReport />} />
      <Route path="/inventory/reports/issue" element={<IssueReport/>} />
      <Route path="/inventory/reports/low-stock" element={<LowStockReport />} />
      <Route path="/inventory/alerts/low-stock" element={<LowStockAlert />} />
      <Route path="/inventory/alerts/return-due" element={<ReturnDueAlert />} />

      {/* Expense */}
      <Route path="/expense/add" element={<LogExpense />} />
      <Route path="/expense/manage" element={<ManageExpenses />} />
      <Route path="/expense/approval" element={<ExpenseApproval />} />
      <Route path="/expense/reports/summary" element={<ExpenseSummary />} />
      <Route path="/expense/reports/vendor-wise" element={<VendorWiseReport />} />
      <Route path="/expense/reports/payment-method" element={<PaymentMethodReport/>} />
      <Route path="/expense/reports/automated" element={<AutomatedExpenses/>} />
      <Route path="/expense/reports/pending-approval" element={<PendingApprovalReport />} />
      <Route path="/expense/notifications/large-expense" element={<LargeExpenseAlert/>} />
      <Route path="/expense/notifications/approval-request" element={<ApprovalRequestAlert />} />

      {/* Users */}
      <Route path="/manage-users/staff/view" element={<ViewStafff/>} />
      <Route path="/manage-users/staff/edit" element={<EditStaff/>} />
      <Route path="/manage-users/staff/deactivate" element={<DeactivateStaff/>} />
      <Route path="/manage-users/staff/reset-password" element={<ResetStaffPassword/>} />
      <Route path="/manage-users/parents/view" element={<ViewParents/>} />
      <Route path="/manage-users/parents/edit" element={<EditParents />} />
      <Route path="/manage-users/parents/deactivate" element={<DeactivateParents />} />
      <Route path="/manage-users/students/view" element={<ViewStudents/>} />
      <Route path="/manage-users/students/edit" element={<EditStudents/>} />
      <Route path="/manage-users/students/deactivate" element={<DeactivateStudents/>} />
      <Route path="/manage-users/students/reset-password" element={<ResetStudentPassword />} />
{/* Settings */}
 <Route path="/settings/institution-details" element={<InstitutionDetails />} />
<Route path="/settings/academic-year/manage" element={<ManageAcademicYear/>}/>
<Route path="/settings/class-section" element={<ClassSectionSetup/>} />
<Route path="/settings/fee-settings" element={<FeeSettings />} />
<Route path="/settings/role-permission" element={<RolePermission/>} />
<Route path="/settings/certificate-tc" element={<CertificateTC />} />
<Route path="/settings/report-card-template" element={<ReportCardTemplate />} />
<Route path="/settings/timetable" element={<TimetableSetup />} />
<Route path="/settings/library" element={<LibrarySettings />} />
<Route path="/settings/notifications" element={<NotificationSettings />} />
<Route path="/settings/transport" element={<TransportSettings />} />
<Route path="/settings/caste-religion" element={<CasteReligion />} />
<Route path="/settings/plan-details" element={<PlanDetails />} />
<Route path="/settings/other-configurations" element={<OtherConfigurations />} />
<Route path="/settings/staff" element={<StaffSettings />} />
<Route path="/settings/payroll" element={<PayrollSettings />} />
<Route path="/settings/expense" element={<ExpenseSettings />} />
<Route path="/settings/receipt" element={<ReceiptSettings />} />
<Route path="/settings/finance" element={<FinanceSettings />} /> 

      {/* Manual staff management */}
      {/* <Route path="/settings/staff/overview" element={<StaffOverview />} />
      <Route path="/settings/staff/add" element={<AddStaff />} />
      <Route path="/settings/staff/edit" element={<EditStaff />} />
      <Route path="/settings/staff/deactivate" element={<DeactivateStaff />} />
      <Route path="/settings/staff/reset-password" element={<ResetStaffPassword />} />
      <Route path="/settings/staff/role-assignment" element={<StaffRoleAssignment />} />
      <Route path="/settings/staff/reports" element={<StaffReports />} /> */}

      {/* Department management */}
      {/* <Route path="/settings/staff/departments" element={<DepartmentsList />} /> */}
      <Route path="/settings/master-data/departments/manage" element={<ManageDepartment />} />
      {/* <Route path="/settings/staff/departments/:id" element={<DepartmentDetails />} />
      <Route path="/settings/staff/departments/:id/edit" element={<DepartmentEdit />} />
      <Route path="/settings/staff/departments/:id/delete" element={<DepartmentDelete />} />
      <Route path="/settings/staff/departments/:id/restore" element={<DepartmentRestore />} /> */}

      {/* Leave Types management */}
      {/* <Route path="/settings/staff/leave-types/create" element={<CreateLeaveType />} /> */}
      <Route path="/settings/master-data/leave-types/manage" element={<ManageLeaveType />} />
       {/*<Route path="/settings/staff/leave-types/:id" element={<LeaveTypeDetails />} />
      <Route path="/settings/staff/leave-types/:id/edit" element={<LeaveTypeEdit />} />
      <Route path="/settings/staff/leave-types/:id/delete" element={<LeaveTypeDelete />} />
      <Route path="/settings/staff/leave-types/:id/restore" element={<LeaveTypeRestore />} /> */}

      {/* Leave Policies management */}
       {/* <Route path="/settings/staff/leave-policies" element={<LeavePoliciesList />} /> */}
       <Route path="/settings/master-data/leave-policies/manage" element={<ManageLeavePolicy />} /> 
 <Route path="/settings/master-data/classes/manage" element={<ManageClass />} />
 <Route path="/settings/master-data/section/manage" element={<ManageSection />} />
 <Route path="/settings/master-data/subjects/manage" element={<ManageSubjects />} />
 <Route path="/settings/master-data/houses/manage" element={<ManageHouses />} />
 <Route path="/settings/master-data/fee-category/manage" element={<ManageFeeCategory />} />
          </Routes>
        </div>
      </div>
    </div>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default App;
