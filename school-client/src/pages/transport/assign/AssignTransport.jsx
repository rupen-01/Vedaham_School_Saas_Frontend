import React, { useState } from "react";
import Card from "../../../components/common/Card";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import HeadingHeader from "../../../components/common/HeadingHeader";

const AssignTransport = () => {
  const [transport, setTransport] = useState({
    studentStaff: "",
    department: "",
    staff: "",
    route: "",
    stop: "",
    vehicle: "",
    availableSeats: "",
    transportFee: "",
    startDate: "",
  });

  const data = {
    studentsStaff: ["Student 1", "Student 2", "Staff 1", "Staff 2"],
    departments: ["Class 12", "Class 11", "Class 10"],
    staffList: ["Staff A", "Staff B", "Staff C"],
    routes: ["Route 1", "Route 2", "Route 3"],
    stops: ["Stop 1", "Stop 2", "Stop 3"],
    vehicles: ["Bus 1", "Bus 2", "Bus 3"],
  };

  const handleChange = (field, value) => {
    setTransport((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <HeadingHeader
        title="Assign Transport"
        items={[
          { label: "Transport", path: "/transport" },
          { label: "Assign Transport", path: "/transport/assign" },
        ]}
      />

      <div className="flex flex-col gap-4 w-full px-4 md:px-6 lg:px-8">
        <Card>
          <BorderedFieldset legend="Assign Transport Details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SlidingLabelSelect
                label="Select Student"
                name="studentStaff"
                value={transport.studentStaff}
                onChangeProp={(e) =>
                  handleChange("studentStaff", e.target.value)
                }
                options={data.studentsStaff.map((s) => ({
                  label: s,
                  value: s,
                }))}
              />

              <SlidingLabelSelect
                label="Select Department"
                name="department"
                value={transport.department}
                onChangeProp={(e) => handleChange("department", e.target.value)}
                options={data.departments.map((d) => ({
                  label: d,
                  value: d,
                }))}
              />

              <SlidingLabelSelect
                label="Select Staff"
                name="staff"
                value={transport.staff}
                onChangeProp={(e) => handleChange("staff", e.target.value)}
                options={data.staffList.map((st) => ({
                  label: st,
                  value: st,
                }))}
              />

              <SlidingLabelSelect
                label="Select Route"
                name="route"
                value={transport.route}
                onChangeProp={(e) => handleChange("route", e.target.value)}
                options={data.routes.map((r) => ({
                  label: r,
                  value: r,
                }))}
              />

              <SlidingLabelSelect
                label="Select Stop"
                name="stop"
                value={transport.stop}
                onChangeProp={(e) => handleChange("stop", e.target.value)}
                options={data.stops.map((st) => ({
                  label: st,
                  value: st,
                }))}
              />

              <SlidingLabelSelect
                label="Select Vehicle"
                name="vehicle"
                value={transport.vehicle}
                onChangeProp={(e) => handleChange("vehicle", e.target.value)}
                options={data.vehicles.map((v) => ({
                  label: v,
                  value: v,
                }))}
              />

              <SlidingLabelInput
                label="Available Seats"
                value={transport.availableSeats}
                placeholder="Show available seat count"
                onChange={(e) =>
                  handleChange("availableSeats", e.target.value)
                }
              />

              <SlidingLabelInput
                label="Transport Fee"
                value={transport.transportFee}
                placeholder="Auto calculated by stop and route"
                onChange={(e) =>
                  handleChange("transportFee", e.target.value)
                }
              />

              <SlidingLabelInput
                type="date"
                label="Start Date"
                value={transport.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>
          </BorderedFieldset>

          {/* Submit */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => console.log(transport)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Assign Transport
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AssignTransport;
