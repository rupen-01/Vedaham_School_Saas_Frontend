import React, { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Card from "../../../components/common/Card";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";
import BackButton from "../../../components/common/BackButton";

const AssignSalary = () => {
  const [formData, setFormData] = useState({
    department: "",
    assignee: "",
    role: "",
    vehicle: "",
    salaryStructure: "",
    payHeads: [{ payHead: "", amount: "" }],
    grossSalary: "",
    effectiveFrom: "",
    status: "Active",
  });

  const departmentOptions = ["Maths", "Science", "Transport", "Admin"];
  const salaryStructureOptions = ["Basic Structure", "Senior Staff Structure"];
  const payHeadOptions = [
    "Basic Pay",
    "HRA",
    "Medical Allowance",
    "Transport Allowance",
    "Special Allowance",
    "Bonus",
    "Provident Fund",
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayHeadChange = (index, field, value) => {
    const updated = [...formData.payHeads];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, payHeads: updated }));
  };

  const addPayHead = () => {
    setFormData((prev) => ({
      ...prev,
      payHeads: [...prev.payHeads, { payHead: "", amount: "" }],
    }));
  };

  const removePayHead = (index) => {
    const updated = formData.payHeads.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, payHeads: updated }));
  };

  const handleSubmit = () => {
    console.log("Assign Salary Data:", formData);
    // API call here
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <HeadingHeader
          title="Assign Salary"
          items={[
            { label: "Payroll", path: "/" },
            { label: "Assign Salary", path: "/payroll/assign-salary" },
          ]}
        />
        <BackButton back="/payroll/manage-assign-salary" />
      </div>

      <Card>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
          <SlidingLabelSelect
            label="Select Department"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
          >
            <option value="">Select department</option>
            {departmentOptions.map((dept, i) => (
              <option key={i}>{dept}</option>
            ))}
          </SlidingLabelSelect>

          <SlidingLabelSelect
            label="Select Assignee"
            value={formData.assignee}
            onChange={(e) => handleChange("assignee", e.target.value)}
          >
            <option value="">Select Assignee</option>
            {/* Map employee list here */}
            <option>Ravi Sharma</option>
            <option>Jyoti Singh</option>
            <option>Rama Joshi</option>
          </SlidingLabelSelect>

          <SlidingLabelInput
            label="Role"
            placeholder="Auto fill"
            value={formData.role}
            readOnly
          />

          <SlidingLabelInput
            label="Assigned Vehicle"
            placeholder="Auto fill"
            value={formData.vehicle}
            readOnly
          />

          <SlidingLabelSelect
            label="Select Salary Structure"
            value={formData.salaryStructure}
            onChange={(e) => handleChange("salaryStructure", e.target.value)}
          >
            <option value="">Select Salary Structure</option>
            {salaryStructureOptions.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </SlidingLabelSelect>
        </div>

        {/* Pay Heads */}
        <BorderedFieldset legend="Pay Head" className="mt-4">
          {formData.payHeads.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end"
            >
              <SlidingLabelSelect
                label="Select Pay Head"
                value={item.payHead}
                onChange={(e) =>
                  handlePayHeadChange(index, "payHead", e.target.value)
                }
              >
                <option value="">Select Pay Head name</option>
                {payHeadOptions.map((ph, i) => (
                  <option key={i}>{ph}</option>
                ))}
              </SlidingLabelSelect>

              <div className="flex gap-2 items-center">
                <SlidingLabelInput
                  label="Amount"
                  type="number"
                  placeholder="Amount of Pay Head"
                  value={item.amount}
                  onChange={(e) =>
                    handlePayHeadChange(index, "amount", e.target.value)
                  }
                />
                <button
                  onClick={() => removePayHead(index)}
                    className="flex items-center justify-center w-10 h-9 rounded-full border border-red-500 bg-red-100 text-red-600 hover:border-red-600 cursor-pointer"
                    >
                      <span className="cursor-pointer text-sm font-bold w-6 h-6 flex items-center justify-center border-2 border-red-500 text-red-500 rounded-full hover:font-extrabold">
                        ✕
                      </span>
                    </button>
              </div>
            </div>
          ))}
        </BorderedFieldset>

        {/* Add Pay Head Button */}
        <div className="mt-4 text-right">
          <button
            onClick={addPayHead}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Pay Head
          </button>
        </div>

        {/* Gross Salary, Date, Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <SlidingLabelInput
            label="Gross Salary"
            placeholder="Auto calculate"
            value={formData.grossSalary}
            readOnly
          />
          <SlidingLabelInput
            label="Effective From"
            type="date"
            value={formData.effectiveFrom}
            onChange={(e) => handleChange("effectiveFrom", e.target.value)}
          />
  
                <BorderedFieldset legend="Status" className=" h-11  text-[12px] mt-0 flex items-center">
               <div className='mb-5'>
            <SlidingLabelRadio
              name="status"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              options={["Active", "Inactive"]}
            />
            </div>
          </BorderedFieldset>
        </div>

        {/* Submit */}
        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Assign Salary
          </button>
        </div>
      </Card>
    </>
  );
};

export default AssignSalary;
