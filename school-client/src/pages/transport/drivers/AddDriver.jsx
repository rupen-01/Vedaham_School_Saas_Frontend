import React, { useState } from "react";
import Card from "../../../components/common/Card";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import HeadingHeader from "../../../components/common/HeadingHeader";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";

const AddDriverAttendant = ({ editData, onSuccess }) => {
  const [form, setForm] = useState(
    editData || {
      fullName: "",
      contactNumber: "",
      aadharNumber: "",
      role: "",
      department: "By Default Transport Department",
      licenseNumber: "",
      licenseExpiryDate: "",
      assignedVehicle: "",
      profileImage: null,
      licenseFile: null,
      status: "Active",
    }
  );

  const roleOptions = [
    { label: "Driver", value: "Driver" },
    { label: "Attendant", value: "Attendant" },
  ];

  const vehicleOptions = [
    { label: "Blue Bus", value: "Blue Bus" },
    { label: "White Van", value: "White Van" },
    { label: "Route 5 Auto", value: "Route 5 Auto" },
  ];

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleFileChange = (field, file) =>
    setForm((prev) => ({ ...prev, [field]: file }));

  const handleSubmit = () => {
    if (!form.fullName || !form.contactNumber || !form.role) {
      alert("Please fill required fields");
      return;
    }
    if (onSuccess) onSuccess(form);
    alert("Driver/Attendant saved successfully ✅");
  };

  return (
    <div className="w-full">
      {/* Header */}
      <HeadingHeader
        title={editData ? "Edit Driver & Attendant" : "Add Driver & Attendant"}
        items={[
          { label: "Transport", path: "/transport" },
          { label: "Driver & Attendants", path: "/transport/driver-attendants" },
          {
            label: editData ? "Edit Driver & Attendant" : "Add Driver & Attendant",
            path: "#",
          },
        ]}
      />

      {/* Form Fields */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SlidingLabelInput
            label="Full Name"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
          <SlidingLabelSelect
            label="Select Role"
            value={form.role}
            onChangeProp={(e) => handleChange("role", e.target.value)}
            options={roleOptions}
          />
          <SlidingLabelInput
            label="Contact Number"
            value={form.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
          />
          <SlidingLabelInput
            label="Department"
            value={form.department}
            readOnly
          />
          <SlidingLabelInput
            label="Aadhar Number"
            value={form.aadharNumber}
            onChange={(e) => handleChange("aadharNumber", e.target.value)}
          />
          <SlidingLabelInput
            label="License Number"
            value={form.licenseNumber}
            onChange={(e) => handleChange("licenseNumber", e.target.value)}
          />
          <SlidingLabelInput
            type="file"
            label="Upload Profile Image"
            onChange={(e) =>
              handleFileChange("profileImage", e.target.files[0])
            }
          />
          <SlidingLabelInput
            type="date"
            label="License Expiry Date"
            value={form.licenseExpiryDate}
            onChange={(e) =>
              handleChange("licenseExpiryDate", e.target.value)
            }
          />
          <SlidingLabelSelect
            label="Assign Vehicle"
            value={form.assignedVehicle}
            onChangeProp={(e) =>
              handleChange("assignedVehicle", e.target.value)
            }
            options={vehicleOptions}
          />
          <SlidingLabelInput
            type="file"
            label="Upload License"
            onChange={(e) =>
              handleFileChange("licenseFile", e.target.files[0])
            }
          />
               {/* Status Radio */}
                    <BorderedFieldset legend="Status" className="mt-0 h-12 text-[12px] flex  items-center ">
                      <div className="flex items-center mb-4"> 
                      <SlidingLabelRadio
                        name="status"
                    
                        value={form.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                        options={["Active", "Inactive"]}
                      />
                      </div>
                    </BorderedFieldset>
        </div>

    

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {editData ? "Update Driver & Attendant" : "Add Driver & Attendant"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AddDriverAttendant;
