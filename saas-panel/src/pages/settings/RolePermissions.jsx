import React, { useMemo, useState } from "react";
import {
  FiShield,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiCheck,
  FiX,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

const INITIAL_ROLES = [
  {
    id: "superadmin",
    name: "Super Admin",
    users: 3,
    description: "Full system access and platform control",
  },
  {
    id: "schooladmin",
    name: "School Admin",
    users: 142,
    description: "Full access to school-specific modules",
  },
  {
    id: "teacher",
    name: "Teacher",
    users: 854,
    description: "Access to academics, attendance, and LMS",
  },
  {
    id: "staff",
    name: "Staff",
    users: 320,
    description: "Access to operations and support",
  },
  {
    id: "student",
    name: "Student",
    users: 15420,
    description: "Access to own academics and LMS",
  },
  {
    id: "parent",
    name: "Parent",
    users: 14900,
    description: "Access to child academics and fees",
  },
];

const MODULES = [
  "Dashboard",
  "Institutions",
  "Users",
  "Students",
  "Teachers",
  "Attendance",
  "Fees",
  "Exams",
  "LMS",
  "Library",
  "Transport",
  "Reports",
  "Announcements",
  "Support Tickets",
  "Settings",
];

// 0 = No Access, 1 = View Only, 2 = Full Access
const INITIAL_PERMISSIONS = {
  Dashboard: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 2,
    staff: 2,
    student: 1,
    parent: 1,
  },
  Institutions: {
    superadmin: 2,
    schooladmin: 1,
    teacher: 0,
    staff: 0,
    student: 0,
    parent: 0,
  },
  Users: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 0,
    staff: 0,
    student: 0,
    parent: 0,
  },
  Students: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 1,
    staff: 1,
    student: 1,
    parent: 1,
  },
  Teachers: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 1,
    staff: 1,
    student: 0,
    parent: 0,
  },
  Attendance: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 2,
    staff: 0,
    student: 1,
    parent: 1,
  },
  Fees: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 0,
    staff: 2,
    student: 1,
    parent: 1,
  },
  Exams: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 2,
    staff: 0,
    student: 1,
    parent: 1,
  },
  LMS: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 2,
    staff: 0,
    student: 2,
    parent: 1,
  },
  Library: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 1,
    staff: 2,
    student: 2,
    parent: 0,
  },
  Transport: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 0,
    staff: 2,
    student: 1,
    parent: 1,
  },
  Reports: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 1,
    staff: 1,
    student: 0,
    parent: 0,
  },
  Announcements: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 2,
    staff: 1,
    student: 1,
    parent: 1,
  },
  "Support Tickets": {
    superadmin: 2,
    schooladmin: 2,
    teacher: 2,
    staff: 2,
    student: 2,
    parent: 2,
  },
  Settings: {
    superadmin: 2,
    schooladmin: 2,
    teacher: 0,
    staff: 0,
    student: 0,
    parent: 0,
  },
};

const PERMISSION_LABELS = {
  0: "No Access",
  1: "View Only",
  2: "Full Access",
};

const RolePermissions = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState("all");
  const [editRole, setEditRole] = useState(null);
  const [showAddRole, setShowAddRole] = useState(false);
  const [roleForm, setRoleForm] = useState({
    name: "",
    description: "",
  });

  const filteredModules = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return MODULES.filter((module) => {
      const matchesSearch = module.toLowerCase().includes(query);
      const matchesFilter =
        filterModule === "all" || module === filterModule;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterModule]);

  const togglePermission = (module, roleId) => {
    setPermissions((prev) => {
      const current = prev[module]?.[roleId] ?? 0;
      const next = current === 2 ? 0 : current + 1;

      return {
        ...prev,
        [module]: {
          ...prev[module],
          [roleId]: next,
        },
      };
    });
  };

  const getPermissionBadge = (level) => {
    if (level === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
          <FiCheck size={12} />
          Full
        </span>
      );
    }

    if (level === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
          <FiEye size={12} />
          View
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
        <FiX size={12} />
        None
      </span>
    );
  };

  const handleSave = () => {
    alert("Permissions saved successfully.");
  };

  const handleEditRole = (role) => {
    setRoleForm({
      name: role.name,
      description: role.description,
    });
    setEditRole(role);
  };

  const handleSaveRole = () => {
    if (!roleForm.name.trim()) {
      alert("Role name is required.");
      return;
    }

    setRoles((prev) =>
      prev.map((role) =>
        role.id === editRole.id
          ? {
              ...role,
              name: roleForm.name.trim(),
              description:
                roleForm.description.trim() || "Custom platform role",
            }
          : role
      )
    );

    setEditRole(null);
    alert("Role details updated successfully.");
  };

  const handleAddRole = () => {
    if (!roleForm.name.trim()) {
      alert("Please enter a role name.");
      return;
    }

    const roleId = roleForm.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    if (roles.some((role) => role.id === roleId)) {
      alert("A role with this name already exists.");
      return;
    }

    const newRole = {
      id: roleId,
      name: roleForm.name.trim(),
      users: 0,
      description:
        roleForm.description.trim() || "Custom platform role",
    };

    setRoles((prev) => [...prev, newRole]);

    setPermissions((prev) => {
      const updated = { ...prev };

      MODULES.forEach((module) => {
        updated[module] = {
          ...updated[module],
          [roleId]: 0,
        };
      });

      return updated;
    });

    setRoleForm({ name: "", description: "" });
    setShowAddRole(false);
    alert("Custom role created successfully.");
  };

  const handleDeleteRole = (role) => {
    if (role.id === "superadmin") {
      alert("Super Admin role cannot be deleted.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete the "${role.name}" role?`
    );

    if (!confirmed) return;

    setRoles((prev) => prev.filter((item) => item.id !== role.id));

    setPermissions((prev) => {
      const updated = {};

      Object.entries(prev).forEach(([module, modulePermissions]) => {
        const { [role.id]: removed, ...remaining } = modulePermissions;

        updated[module] = remaining;
      });

      return updated;
    });
  };

  return (
    <div className="w-full min-w-0 p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FiShield className="text-purple-600" />
            Role Permissions
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage access controls and permissions for all platform roles.
          </p>
        </div>

        <button
          onClick={() => {
            setRoleForm({ name: "", description: "" });
            setShowAddRole(true);
          }}
          className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm"
        >
          <FiPlus size={16} />
          Add Custom Role
        </button>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start gap-3 mb-2">
              <h3 className="font-semibold text-gray-800 text-lg">
                {role.name}
              </h3>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEditRole(role)}
                  className="p-2 text-gray-400 hover:text-purple-600 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Edit role"
                >
                  <FiEdit2 size={14} />
                </button>

                {role.id !== "superadmin" && (
                  <button
                    onClick={() => handleDeleteRole(role)}
                    className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete role"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              {role.description}
            </p>

            <div className="text-xs font-medium text-purple-600 bg-purple-50 inline-block px-3 py-1 rounded-full">
              {role.users.toLocaleString()} Active Users
            </div>
          </div>
        ))}
      </div>

      {/* Permission Matrix */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Permission Matrix
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Click a permission to cycle between No Access, View Only and
              Full Access.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-64"
              />
            </div>

            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            >
              <option value="all">All Modules</option>

              {MODULES.map((module) => (
                <option key={module} value={module}>
                  {module}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto w-full pb-2">
          <table className="w-full text-sm text-left whitespace-nowrap min-w-[900px]">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  Permission / Module
                </th>

                {roles.map((role) => (
                  <th
                    key={role.id}
                    className="px-5 py-4 font-semibold text-center"
                  >
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredModules.map((module) => (
                <tr
                  key={module}
                  className="hover:bg-purple-50/30 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {module}
                  </td>

                  {roles.map((role) => {
                    const level = permissions[module]?.[role.id] ?? 0;

                    return (
                      <td
                        key={role.id}
                        className="px-5 py-4 text-center cursor-pointer"
                        onClick={() => togglePermission(module, role.id)}
                        title={`Current access: ${PERMISSION_LABELS[level]}`}
                      >
                        {getPermissionBadge(level)}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {filteredModules.length === 0 && (
                <tr>
                  <td
                    colSpan={roles.length + 1}
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    No modules found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="font-medium text-gray-700">Permission levels:</span>
            {getPermissionBadge(2)}
            {getPermissionBadge(1)}
            {getPermissionBadge(0)}
          </div>

          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Add Role Modal */}
      {showAddRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Add Custom Role
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Create a new platform role.
                </p>
              </div>

              <button
                onClick={() => setShowAddRole(false)}
                className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name *
                </label>

                <input
                  value={roleForm.name}
                  onChange={(e) =>
                    setRoleForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="e.g. Accountant"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>

                <textarea
                  value={roleForm.description}
                  onChange={(e) =>
                    setRoleForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Describe this role..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setShowAddRole(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleAddRole}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 shadow-sm"
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {editRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Edit Role
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update role information.
                </p>
              </div>

              <button
                onClick={() => setEditRole(null)}
                className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name
                </label>

                <input
                  value={roleForm.name}
                  onChange={(e) =>
                    setRoleForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>

                <textarea
                  value={roleForm.description}
                  onChange={(e) =>
                    setRoleForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
              </div>

              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex items-start gap-3">
                <FiShield className="mt-0.5 shrink-0" />

                <p>
                  To change module-level permissions, use the Permission
                  Matrix on the main page.
                </p>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setEditRole(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveRole}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 shadow-sm"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermissions;