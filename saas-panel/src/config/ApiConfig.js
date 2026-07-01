const BaseUrl = import.meta.env.VITE_API_URL;


const ApiConfig = {
    
    // SUPER ADMIN AUTH ROUTES
    
    REGISTER: `${BaseUrl}/admin/register`,                // Create a super admin
    LOGIN: `/admin/login`,                      // Login as a super admin
    LOGOUT: `${BaseUrl}/admin/logout`,                    // Logout user
        // =========================
    // MODULE ROUTES
    // =========================
    MODULE_GET_ALL: "/module",
    MODULE_CREATE: "/module",
    MODULE_UPDATE: (id)=>`/module/${id}`,       // ID handled in hook
    MODULE_DELETE: (id)=>`/module/${id}`,        // ID handled in hook

    // =========================
    // PLAN ROUTES
    // =========================
    PLAN_CREATE: `${BaseUrl}/plan`,
    PLAN_GET_ALL: "/plan",
    PLAN_GET_BY_ID: "/plan",        // ID handled in hook
    PLAN_UPDATE: "/plan",           // ID handled in hook
    PLAN_DELETE: "/plan",           // ID handled in hook

  // =========================
  // SCHOOL (INSTITUTE) ROUTES
  // =========================
  INSTITUTE_CREATE: `${BaseUrl}/school`,
  INSTITUTE_GET_ALL: `${BaseUrl}/school`,
  INSTITUTE_GET_BY_ID: (id) => `${BaseUrl}/school/${id}`,
  INSTITUTE_UPDATE: (id) => `${BaseUrl}/school/${id}`,
  INSTITUTE_DELETE: (id) => `${BaseUrl}/school/${id}`,

    // =========================
    // SCHOOL ROUTES
    // =========================
    SCHOOL_ADMIN_LOGIN: "/school/admin/login",
    SCHOOL_CREATE: "/school",
    SCHOOL_GET_ALL: "/school",
    SCHOOL_UPDATE_IMAGE: "/school/image", // ID handled in hook
    SCHOOL_UPDATE: "/school",             // ID handled in hook
    SCHOOL_DELETE: "/school",             // ID handled in hook
    SCHOOL_GET_BY_ID: "/school"           // ID handled in hook

};

export default ApiConfig;
