import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "./component/ViewModal";
import Loader from "../../../components/common/Loader";
import CreateLeavePolicy from "./CreateLeave-policy";
import ApiConfig from "../../../config/ApiConfig";
import { toast } from "react-hot-toast";
import { useGetApi, useMutationApi } from "../../../config/UseApi";

const ManageLeavePolicy = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewLeavePolicy, setViewLeavePolicy] = useState(null);
  const [showAddPolicyModal, setShowAddPolicyModal] = useState(false);
  const [editPolicy, setEditPolicy] = useState(null);

  const queryClient = useQueryClient();

  const leavePolicyConfig = {
    table: {
      headers: [
        "Name",
        "Description",
        "Leave Type",
        "Department",
        "Max Days/Year",
        "Auto Approve",
        "Approval Required",
        "Actions",
      ],
      keys: [
        "name",
        "description",
        "leave_type_name",
        "department_name",
        "max_days_per_year",
        "auto_approve",
        "approval_required",
      ],
    },
  };


  // ---------------------------
  // Fetch leave policies, leave types, and departments
  // ---------------------------
  const { data: leavePoliciesRes, isLoading, isError, error } = useGetApi({
    key: "leave-policies",
    url: ApiConfig.LEAVE_POLICY_GET_ALL,
  });

  const { data: leaveTypesRes } = useGetApi({
    key: "leave-types",
    url: ApiConfig.LEAVE_TYPE_GET_ALL,
  });

  const { data: departmentsRes } = useGetApi({
    key: "departments",
    url: ApiConfig.DEPARTMENT_GET_ALL,
  });

  const leavePolicies = Array.isArray(leavePoliciesRes?.data)
    ? leavePoliciesRes.data
    : [];

  const leaveTypes = Array.isArray(leaveTypesRes?.data) ? leaveTypesRes.data : [];
  const departments = Array.isArray(departmentsRes?.data) ? departmentsRes.data : [];

  // ---------------------------
  // Map leave type, department, and booleans
  // ---------------------------
  const boolToYesNo = (value) => (value ? "Yes" : "No");

  const mappedPolicies = leavePolicies.map((policy) => ({
    ...policy,
    leave_type_name:
      leaveTypes.find((lt) => String(lt.id) === String(policy.leave_type_id))?.name ||
      "N/A",
    department_name:
      departments.find((dept) => String(dept.id) === String(policy.department_id))?.name ||
      "N/A",
    auto_approve: boolToYesNo(policy.auto_approve),
    approval_required: boolToYesNo(policy.approval_required),
  }));

// <-- Add this for departments debug
useEffect(() => {
  console.log("Departments API response:", departmentsRes);
  console.log("Departments array:", departments);
}, [departmentsRes, departments]);

  // ---------------------------
  // Delete leave policy
  // ---------------------------
// ---------------------------
// ✅ Delete Leave Policy
// ---------------------------
// ---------------------------
// ✅ Delete Leave Policy
// ---------------------------
const deleteLeavePolicy = useMutationApi({
  key: "leave-policies", // Same key as useGetApi for invalidation
  url: ApiConfig.LEAVE_POLICY_DELETE, // Base URL
  method: "DELETE",
  requireAuth: true,
  options: {
    onSuccess: () => {
      toast.success("Leave policy deleted successfully!");
      setDeleteData(null);
    },
    onError: (err) => {
      toast.error("Failed to delete leave policy. Please try again.");
      console.error("Delete Leave Policy Error:", err);
    },
  },
});

// ✅ Handle Delete Action
const handleDelete = (policy) => {
  deleteLeavePolicy.mutate({
    id: policy.id, // ✅ Pass policy ID
  });
};


  // ---------------------------
  // Open edit modal
  // ---------------------------
  const handleEdit = (policy) => {
    setEditPolicy(policy);
    setShowAddPolicyModal(true);
  };

  useEffect(() => {
    console.log("Mapped Leave Policies:", mappedPolicies);
  }, [mappedPolicies]);

  if (isLoading) return <Loader text="Loading leave policies..." />;
  if (isError)
    return (
      <p className="text-red-600">Failed to load leave policies: {error.message}</p>
    );

  return (
    <>
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <HeadingHeader
          title="Manage Leave Policies"
          items={[
            { label: "Leave Policies", path: "/hr/leave-policies" },
            { label: "Manage Leave Policies", path: "/hr/leave-policies/manage" },
          ]}
        />
        <div className="sm:text-right flex justify-start ml-3 mb-4">
          <button
            onClick={() => {
              setEditPolicy(null);
              setShowAddPolicyModal(true);
            }}
            className="sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer text-sm sm:text-base"
          >
            Add Leave Policy
          </button>
        </div>
      </div>

      {/* Leave Policies Table */}
      <Table
        Search={true}
        ImageContainerShow={false}
        Data={mappedPolicies} // <- use mapped data
        headers={leavePolicyConfig.table.headers}
        dataKeys={leavePolicyConfig.table.keys}
        onDelete={(data) => setDeleteData(data)}
        onEdit={handleEdit}
        onView={(p) => setViewLeavePolicy(p)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this leave policy?"
        onConfirm={() => handleDelete(deleteData)}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={!!viewLeavePolicy}
        onClose={() => setViewLeavePolicy(null)}
        title="View Leave Policy Details"
        data={viewLeavePolicy}
      />

      {/* Add/Edit Leave Policy Modal */}
      <CreateLeavePolicy
        isOpen={showAddPolicyModal}
        onClose={() => {
          setShowAddPolicyModal(false);
          setEditPolicy(null);
        }}
        editData={editPolicy}
        onSuccess={() => queryClient.invalidateQueries(["leave-policies"])}
      />
    </>
  );
};

export default ManageLeavePolicy;
