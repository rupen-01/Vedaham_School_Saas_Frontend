import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Card from "../../../components/common/Card";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../components/common/SlidingLabelTextarea";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import ToggleSwitch from "../../../components/common/ToggleSwitch";
import Pop from "../../../components/common/pop";
import Cookies from "js-cookie";
import axios from "axios";
import ApiConfig from "../../../config/ApiConfig";
import { useMutationApi } from "../../../config/UseApi";

const CreateLeavePolicy = ({ isOpen = true, onClose = () => {}, editData = null }) => {
  const [policyData, setPolicyData] = useState({
    name: "",
    description: "",
    leave_type_id: "",
    department_id: "",
    max_days_per_year: "",
    auto_approve: false,
    approval_required: false,
    status: true,
  });

  const [departments, setDepartments] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [deptLoading, setDeptLoading] = useState(false);
  const [leaveTypeLoading, setLeaveTypeLoading] = useState(false);

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setPolicyData({
        name: editData.name || "",
        description: editData.description || "",
        leave_type_id: editData.leave_type_id ? String(editData.leave_type_id) : "",
        department_id: editData.department_id ? String(editData.department_id) : "",
        max_days_per_year: editData.max_days_per_year || "",
        auto_approve: editData.auto_approve ?? false,
        approval_required: editData.approval_required ?? false,
        status: editData.status ?? true,
      });
    } else {
      setPolicyData({
        name: "",
        description: "",
        leave_type_id: "",
        department_id: "",
        max_days_per_year: "",
        auto_approve: false,
        approval_required: false,
        status: true,
      });
    }
  }, [editData]);

  // Fetch Departments & Leave Types
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) return Pop("error", "Not authorized. Please login again.");

    const fetchDepartments = async () => {
      setDeptLoading(true);
      try {
        const { data } = await axios.get(ApiConfig.DEPARTMENT_GET_ALL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const deptArray = (data?.departments ?? data?.data ?? []).map((d) => ({
          id: String(d.id ?? d._id ?? ""),
          name: d.name ?? d.department_name ?? "Unnamed",
        }));
        setDepartments(deptArray);
      } catch (err) {
        console.error(err);
        Pop("error", "Failed to load departments.");
      } finally {
        setDeptLoading(false);
      }
    };

    const fetchLeaveTypes = async () => {
      setLeaveTypeLoading(true);
      try {
        const { data } = await axios.get(ApiConfig.LEAVE_TYPE_GET_ALL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const leaveArray = (data?.leaveTypes ?? data?.data ?? []).map((lt) => ({
          id: String(lt.id ?? lt._id ?? ""),
          name: lt.name ?? lt.leave_type_name ?? "Unnamed",
        }));
        setLeaveTypes(leaveArray);
      } catch (err) {
        console.error(err);
        Pop("error", "Failed to load leave types.");
      } finally {
        setLeaveTypeLoading(false);
      }
    };

    fetchDepartments();
    fetchLeaveTypes();
  }, []);
// ---------------------------
// API Mutation (Leave Policy)
// ---------------------------
const mutation = useMutationApi({
  key: "leave-policies",
  url: editData
    ? ApiConfig.LEAVE_POLICY_UPDATE(editData.id)
    : ApiConfig.LEAVE_POLICY_CREATE,
  method: editData ? "PUT" : "POST",
  requireAuth: true,
  options: {
    onSuccess: () => {
      Pop(
        "success",
        editData ? "Leave Policy updated successfully!" : "Leave Policy created successfully!"
      );
      onClose();
      setPolicyData({
        name: "",
        description: "",
        leave_type_id: "",
        department_id: "",
        max_days_per_year: "",
        auto_approve: false,
        approval_required: false,
        status: true,
      });
    },
    onError: (err) => {
      console.error("Failed:", err);
      Pop("error", err?.response?.data?.message || "Something went wrong.");
    },
  },
});

if (!isOpen) return null;

const handleChange = (field, value) => {
  setPolicyData((prev) => ({ ...prev, [field]: value }));
};

  const handleSubmit = () => {
    const dataToSend = {
      ...policyData,
      max_days_per_year: Number(policyData.max_days_per_year),
    };
    console.log("Creating/Updating Leave Policy:", dataToSend);
    mutation.mutate({ payload: dataToSend });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-4xl mx-auto my-6">
        <Card className="p-4 sm:p-6 mt-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {editData ? "Edit Leave Policy" : "Add Leave Policy"}
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-700 bg-red-100 w-8 h-8 flex items-center justify-center rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">
            <SlidingLabelInput
              type="text"
              label="Policy Name"
              placeholder="Standard Medical Policy"
              value={policyData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <SlidingLabelTextarea
              label="Description"
              placeholder="Standard medical leave policy"
              value={policyData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SlidingLabelSelect
                label="Leave Type"
                name="leave_type_id"
                value={policyData.leave_type_id ?? ""}
                onChangeProp={(e) => handleChange("leave_type_id", e.target.value)}
                options={[{ label: "Select Leave Type", value: "" }, ...leaveTypes.map((lt) => ({ label: lt.name, value: String(lt.id) }))]}
              />

              <SlidingLabelSelect
                label="Department"
                name="department_id"
                value={policyData.department_id ?? ""}
                onChangeProp={(e) => handleChange("department_id", e.target.value)}
                options={[{ label: "Select Department", value: "" }, ...departments.map((dept) => ({ label: dept.name, value: String(dept.id) }))]}
              />

              <SlidingLabelInput
                type="number"
                label="Max Days Per Year"
                placeholder="15"
                value={policyData.max_days_per_year}
                onChange={(e) => handleChange("max_days_per_year", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ToggleSwitch
                label="Auto Approve"
                name="auto_approve"
                checked={policyData.auto_approve}
                onChange={(value) => handleChange("auto_approve", value)}
              />

              <ToggleSwitch
                label="Approval Required"
                name="approval_required"
                checked={policyData.approval_required}
                onChange={(value) => handleChange("approval_required", value)}
              />

              <ToggleSwitch
                label="Status"
                name="status"
                checked={policyData.status}
                onChange={(value) => handleChange("status", value)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              disabled={mutation.isLoading}
              className={`px-5 sm:px-6 py-2 rounded-lg text-white cursor-pointer ${
                mutation.isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {mutation.isLoading ? (editData ? "Updating..." : "Creating...") : editData ? "Update Policy" : "Create Policy"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateLeavePolicy;
