import React, { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Card from "../../../components/common/Card";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";
import BackButton from "../../../components/common/BackButton";

const AddSalaryStructure = () => {
  const [salaryData, setSalaryData] = useState({
    name: "",
    status: "",
    payHeads: [{ payHead: "", amount: "" }],
  });

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
    setSalaryData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayHeadChange = (index, field, value) => {
    const updated = [...salaryData.payHeads];
    updated[index][field] = value;
    setSalaryData((prev) => ({ ...prev, payHeads: updated }));
  };

  const addPayHead = () => {
    setSalaryData((prev) => ({
      ...prev,
      payHeads: [...prev.payHeads, { payHead: "", amount: "" }],
    }));
  };

  const removePayHead = (index) => {
    const updated = salaryData.payHeads.filter((_, i) => i !== index);
    setSalaryData((prev) => ({ ...prev, payHeads: updated }));
  };

  const handleSubmit = () => {
    console.log("Salary Structure Data:", salaryData);
    // API call can be placed here
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <HeadingHeader
          title="Add Salary Structure"
          items={[
            { label: "Payroll", path: "/" },
            { label: "Salary Structure", path: "/payroll/salary-structure" },
            { label: "Add Salary Structure", path: "/payroll/salary-structure/add" },
          ]}
        />
        <BackButton back="/payroll/salary-structure" />
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          {/* Salary Structure Form */}
          <BorderedFieldset legend="Salary Structure Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SlidingLabelInput
                label="Name"
                placeholder="Ex Clerk Structure"
                value={salaryData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
          
              <BorderedFieldset legend="Status" className=" h-11  text-[12px] mt-0 flex items-center">
                          <div className='mb-5'>
                          <SlidingLabelRadio
                            name="status"
                               value={salaryData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                            options={["Active", "Inactive"]}
                          />
                          </div>
                          </BorderedFieldset>
            </div>
          </BorderedFieldset>

          {/* Pay Heads */}
          <BorderedFieldset legend="Pay Head">
            {salaryData.payHeads.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end">
                <SlidingLabelSelect
                  label="Select Pay Head"
                  value={item.payHead}
                  onChange={(e) => handlePayHeadChange(index, "payHead", e.target.value)}
                >
                  <option value="">Select Pay Head name</option>
                  {payHeadOptions.map((ph, i) => (
                    <option key={i}>{ph}</option>
                  ))}
                </SlidingLabelSelect>

                <div className="flex gap-2 items-center">
                  <SlidingLabelInput
                    label="Amount"
                    placeholder="Amount of Pay Head"
                    type="number"
                    value={item.amount}
                    onChange={(e) => handlePayHeadChange(index, "amount", e.target.value)}
                  />
                  {salaryData.payHeads.length > 0 && (
                    <button
                      onClick={() => removePayHead(index)}
                      className="flex items-center justify-center w-10 h-9 rounded-full border border-red-500 bg-red-100 text-red-600 hover:border-red-600 cursor-pointer"
                    >
                      <span className="cursor-pointer text-sm font-bold w-6 h-6 flex items-center justify-center border-2 border-red-500 text-red-500 rounded-full hover:font-extrabold">
                        ✕
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </BorderedFieldset>

          {/* Add Pay Head Button */}
          <div className="mt-4 mb-4 text-right">
            <button
              onClick={addPayHead}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Add Pay Head
            </button>
          </div>
        </Card>

        {/* Final Submit */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Create Salary Structure
          </button>
        </div>
      </div>
    </>
  );
};

export default AddSalaryStructure;
