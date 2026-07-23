import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
// Dashboard
import Dashboard from './pages/dashboard/Dashboard.jsx';
// Institutions
import AddInstitution from './pages/institutions/AddInstitution.jsx';
import ManageInstitutions from './pages/institutions/ManageInstitutions.jsx';
// Plans
import AddPlan from './pages/plans/AddPlan.jsx';
import ManagePlans from './pages/plans/ManagePlans.jsx';
import PlanAnalytics from './pages/plans/PlanAnalytics.jsx';
// Users
import AddUser from './pages/users/AddUser.jsx';
import ManageUsers from './pages/users/ManageUsers.jsx';
// Messages
import SupportTickets from './pages/messages/SupportTickets.jsx';
import Feedbacks from './pages/messages/Feedbacks.jsx';
import Announcements from './pages/messages/Announcements.jsx';
// Settings
import PaymentGateway from './pages/settings/PaymentGateway.jsx';
import RolePermissions from './pages/settings/RolePermissions.jsx';
import TermsAndConditions from './pages/settings/TermsAndConditions.jsx';
// LMS
import AddLead from './pages/lms/AddLead.jsx';
import ManageLeads from './pages/lms/ManageLeads.jsx';
import LeadAnalytics from './pages/lms/LeadAnalytics.jsx';
import LeadReports from './pages/lms/LeadReports.jsx';
// Subscriptions
import SubscriptionView from './pages/subscriptions/SubscriptionView.jsx';
import SubscriptionAnalytics from './pages/subscriptions/SubscriptionAnalytics.jsx';
import SubscriptionReports from './pages/subscriptions/SubscriptionReports.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import { useColorContext } from './context/context.jsx';
import Navbar from './components/Sidebar/TopBar.jsx';
import { useMediaQuery } from '@mui/material';
import Header from './components/common/Header.jsx';
import Loading from './components/Loading/Loading.jsx';
import ImagesConfig from './config/ImagesConfig.js';
import Register from './pages/auth/Register.jsx';
import Modules from './pages/settings/Modules/Modules.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ViewPlan from './pages/plans/ViewPlan.jsx';
import ViewInstitute from './pages/institutions/ViewInstitute.jsx';




function App() {
  return (
    
    <Router>
      <AppWrapper/>
    </Router>

  );
}

function ProtectedRoute({ children }) {
  const token = Cookies.get("authToken"); 
  // const token = sessionStorage.getItem('saas_logged_in');
  return token ? children : <Navigate to="/login" />;
}

function AppWrapper(){
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken"); 
    // const token = sessionStorage.getItem('saas_logged_in');
    setAuth(!!token);
  }, [auth]);

  return(
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={
        <ProtectedRoute>
             <Applayout />
        </ProtectedRoute>
      } />
      
    </Routes>
  )
}

function Applayout(){
  const { isCollapsed, setIsCollapsed, activeNavStyle, activeNavColor } = useColorContext();
  const navigate = useNavigate();
  const ismobile = useMediaQuery("( maxWidth: 1024 )");
  const location = useLocation();
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // For demo, check localStorage
    return Cookies.get("authToken")||false;
  });

  if (!isLoggedIn) {
    // Render login page, pass dummy login handler
    return <Login onLogin={handleLogin} />;
  }

  useEffect(() => {
    if (ismobile) {
      setIsCollapsed(true); // Auto-collapse navbar on mobile
    }
  }, [ismobile, setIsCollapsed]);

    // Image Preload Logic
    useEffect(() => {
      const loadImages = async () => {
        const imagePromises = Object.values(ImagesConfig).map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });
  
        try {
          await Promise.all(imagePromises);
          setIsImagesLoaded(true);
        } catch (error) {
          console.error("Image loading failed:", error);
          setIsImagesLoaded(true); // even if error, proceed to UI
        }
      };
  
      loadImages();
    }, []);
  
  
    if (!isImagesLoaded) {
      return <Loading />;
    }
  
  return(
    <>
    <div
      className="flex"
    >
      {(ismobile || (activeNavStyle !== "nav-top")) && <Sidebar activeNavStyle={activeNavStyle} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
      <div className={`flex-1 min-w-0 transition-all ${activeNavStyle !== "nav-top" ? isCollapsed ? "lg:ml-20" : "lg:ml-[288px]" : ""}`}>
        <Header setIsCollapsed={setIsCollapsed} activeNavColor={activeNavColor} activeNavStyle={activeNavStyle}/>
        {activeNavStyle === "nav-top" && <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
        <div className={`overflow-y-auto h-[90dvh] px-2 sm:px-5 py-2 md:py-[8px]  bg-gray-100 pb-10 ${isCollapsed ? (location?.pathname === "/")?"lg:px-10" : "lg:px-14 xl:px-32" : "lg:px-10"}`}>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Institutions */}
            <Route path="/institutions/add" element={<AddInstitution />} />
            <Route path="/institutions/manage" element={<ManageInstitutions />} />
            <Route path="/institutions/view/:id" element={<ViewInstitute />} />
            <Route path="/institutions/edit/:id" element={<AddInstitution />} />
            {/* Plans */}
            <Route path="/plans/add" element={<AddPlan />} />
            <Route path="/plans/edit/:id" element={<AddPlan />} />
            <Route path="/plans/view/:id" element={<ViewPlan />} />
            <Route path="/plans/manage" element={<ManagePlans />} />
            <Route path="/plans/analytics" element={<PlanAnalytics />} />
            {/* Users */}
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/manage" element={<ManageUsers />} />
            {/* Messages */}
            <Route path="/messages/support-tickets" element={<SupportTickets />} />
            <Route path="/messages/feedbacks" element={<Feedbacks />} />
            <Route path="/messages/announcements" element={<Announcements />} />
            {/* Settings */}
            <Route path='/settings/modules' element={<Modules/>}/>
            <Route path="/settings/payment-gateway" element={<PaymentGateway />} />
            <Route path="/settings/role-permissions" element={<RolePermissions />} />
            <Route path="/settings/terms-and-conditions" element={<TermsAndConditions />} />
            {/* LMS */}
            <Route path="/lms/add-lead" element={<AddLead />} />
            <Route path="/lms/manage-leads" element={<ManageLeads />} />
            <Route path="/lms/lead-analytics" element={<LeadAnalytics />} />
            <Route path="/lms/lead-reports" element={<LeadReports />} />
            {/* Subscriptions */}
            <Route path="/subscriptions/view" element={<SubscriptionView />} />
            <Route path="/subscriptions/analytics" element={<SubscriptionAnalytics />} />
            <Route path="/subscriptions/reports" element={<SubscriptionReports />} />
          </Routes>
        </div>
      </div>
    </div>
     <ReactQueryDevtools initialIsOpen={false} />
     </>
  )
}
export default App;
