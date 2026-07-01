const BaseUrl = import.meta.env.VITE_API_URL;


const ApiConfig = {
    
    // SUPER ADMIN AUTH ROUTES
    
    REGISTER: `${BaseUrl}/admin/register`,                // Create a super admin
    LOGIN: `${BaseUrl}/school/admin/login`,                      // Login as a super admin
    LOGOUT: `${BaseUrl}/admin/logout`,                    // Logout user
        // =========================
    // MODULE ROUTES
    // =========================
    MODULE_GET_ALL: "/module",
    MODULE_CREATE: "/module",
    MODULE_UPDATE: "/module",       // ID handled in hook
    MODULE_DELETE: "/module",       // ID handled in hook

    // =========================
    // PLAN ROUTES
    // =========================
    PLAN_CREATE: "/plan",
    PLAN_GET_ALL: "/plan",
    PLAN_UPDATE: "/plan",           // ID handled in hook
    PLAN_DELETE: "/plan",           // ID handled in hook

    // =========================
    // SCHOOL ROUTES
    // =========================
    SCHOOL_ADMIN_LOGIN: "/school/login",
    SCHOOL_CREATE: "/school",
    SCHOOL_GET_ALL: "/school",
    SCHOOL_UPDATE_IMAGE: "/school/image", // ID handled in hook
    SCHOOL_UPDATE: "/school",             // ID handled in hook
    SCHOOL_DELETE: "/school",             // ID handled in hook
    SCHOOL_GET_BY_ID: "/school",       // ID handled in hook

  // =========================    
  // DEPARTMENT ROUTES
  // =========================

  DEPARTMENT_CREATE: `/settings/masterdata/departments`,
  DEPARTMENT_GET_ALL: `${BaseUrl}/settings/masterdata/departments`,
  DEPARTMENT_UPDATE: (id)=>`${BaseUrl}/settings/masterdata/departments/${id}`,     // ID handled in hook
  DEPARTMENT_DELETE:`${BaseUrl}/settings/masterdata/departments`,     // ID handled in hook
  DEPARTMENT_GET_BY_ID:(id)=> `${BaseUrl}/settings/masterdata/departments/${id}`,  // ID handled in hook
  

  // =========================
  // LEAVE TYPE ROUTES
  // =========================

  LEAVE_TYPE_CREATE: `/settings/masterdata/leave-types`,
  LEAVE_TYPE_GET_ALL: `${BaseUrl}/settings/masterdata/leave-types`,
  LEAVE_TYPE_UPDATE: (id) => `${BaseUrl}/settings/masterdata/leave-types/${id}`,
  LEAVE_TYPE_DELETE:`${BaseUrl}/settings/masterdata/leave-types`,
  LEAVE_TYPE_GET_BY_ID: `${BaseUrl}/settings/masterdata/leave-types`, // ID handled in hook

  // =========================
  // LEAVE POLICY ROUTES
  // =========================

LEAVE_POLICY_CREATE: `/settings/masterdata/leave-policies`,
LEAVE_POLICY_GET_ALL: `${BaseUrl}/settings/masterdata/leave-policies`,
LEAVE_POLICY_UPDATE: (id) => `${BaseUrl}/settings/masterdata/leave-policies/${id}`,
LEAVE_POLICY_DELETE:`${BaseUrl}/settings/masterdata/leave-policies`,


  // =========================
  // ACADEMIC YEAR ROUTES
  // =========================

  ACADEMIC_YEAR_CREATE: `/settings/academic-year`,
  ACADEMIC_YEAR_GET_ALL: `${BaseUrl}/settings/academic-year`,
  ACADEMIC_YEAR_UPDATE: (id) => `${BaseUrl}/settings/academic-year/${id}`,
  ACADEMIC_YEAR_DELETE: (id) => `${BaseUrl}/settings/academic-year/${id}`,
   

   // =========================
  // CLASS ROUTES
  // =========================
  CLASS_CREATE: `/settings/masterdata/classes`,
  CLASS_GET_ALL: `${BaseUrl}/settings/masterdata/classes`,
  CLASS_UPDATE: (id) => `${BaseUrl}/settings/masterdata/classes/${id}`,
 CLASS_DELETE:`${BaseUrl}/settings/masterdata/classes`,
  CLASS_GET_BY_ID: (id) => `${BaseUrl}/settings/masterdata/classes/${id}`,

    // =========================
  // SECTION ROUTES
  // =========================
  SECTION_CREATE: `/settings/masterdata/sections`,
  SECTION_GET_ALL: `${BaseUrl}/settings/masterdata/sections`,
  SECTION_UPDATE: (id) => `/settings/masterdata/sections/${id}`,
  SECTION_DELETE:`${BaseUrl}/settings/masterdata/sections`,
  SECTION_GET_BY_ID: (id) => `${BaseUrl}/settings/masterdata/sections/${id}`,
// =========================
// SUBJECT ROUTES
// =========================
SUBJECT_CREATE: `/settings/masterdata/subjects`,
SUBJECT_GET_ALL: `${BaseUrl}/settings/masterdata/subjects`,
SUBJECT_UPDATE: (id) =>`/settings/masterdata/subjects/${id}`,
SUBJECT_DELETE: `${BaseUrl}/settings/masterdata/subjects`,
SUBJECT_GET_BY_ID: (id) => `${BaseUrl}/settings/masterdata/subjects/${id}`,

// =========================
// HOUSE ROUTES
// =========================
HOUSE_CREATE: `/settings/masterdata/houses`,
HOUSE_GET_ALL: `${BaseUrl}/settings/masterdata/houses`,
HOUSE_UPDATE: (id) => `${BaseUrl}/settings/masterdata/houses/${id}`,
HOUSE_DELETE: `${BaseUrl}/settings/masterdata/houses`,
HOUSE_GET_BY_ID: (id) => `${BaseUrl}/settings/masterdata/houses/${id}`,


// ---------------------------
// ✅ Fee Categories
// ---------------------------
FEE_CATEGORY_CREATE: `${BaseUrl}/settings/masterdata/fee-categories`,
FEE_CATEGORY_GET_ALL: `${BaseUrl}/settings/masterdata/fee-categories`,
FEE_CATEGORY_UPDATE: (id) => `${BaseUrl}/settings/masterdata/fee-categories/${id}`,
FEE_CATEGORY_DELETE: `${BaseUrl}/settings/masterdata/fee-categories`,
};

export default ApiConfig;
  