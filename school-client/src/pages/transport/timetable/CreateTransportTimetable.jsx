import React, { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Card from "../../../components/common/Card";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";

const CreateTimetable = () => {
  const [timetable, setTimetable] = useState({
    route: "",
    vehicle: "",
    days: [],
    stops: [
      { name: "Stop1", distance: "3km", pickup: "", drop: "" },
      { name: "Stop2", distance: "4km", pickup: "", drop: "" },
      { name: "Stop3", distance: "6km", pickup: "", drop: "" },
    ],
  });

  const data = {
    routes: ["Route 1", "Route 2", "Route 3"],
    vehicles: ["Bus 1", "Bus 2", "Bus 3"],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  };

  const handleChange = (field, value) => {
    setTimetable((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDayToggle = (day) => {
    setTimetable((prev) => {
      const updatedDays = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days: updatedDays };
    });
  };

  const handleStopChange = (index, field, value) => {
    const updated = [...timetable.stops];
    updated[index][field] = value;
    setTimetable((prev) => ({ ...prev, stops: updated }));
  };

  const handleSubmit = () => {
    console.log("Created Timetable:", timetable);
  };

  return (
    <>
      <HeadingHeader
        title="Create Timetable"
        items={[
          { label: "Transport", path: "/transport" },
          { label: "Transport Timetable", path: "/transport/timetable" },
          { label: "Create Timetable", path: "/transport/timetable/create" },
        ]}
      />

      <div className="flex flex-col gap-4 w-full px-4 md:px-6 lg:px-8">
        <Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <SlidingLabelSelect
                label="Select Route"
                value={timetable.route}
                onChangeProp={(e) => handleChange("route", e.target.value)}
                options={data.routes.map((r) => ({ label: r, value: r }))}
              />

              <SlidingLabelSelect
                label="Select Vehicle"
                value={timetable.vehicle}
                onChangeProp={(e) => handleChange("vehicle", e.target.value)}
                options={data.vehicles.map((v) => ({ label: v, value: v }))}
              />
            </div>

            {/* Days Selection */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Applicable Days</label>
              <div className="flex flex-wrap gap-4">
                {data.days.map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={timetable.days.includes(day)}
                      onChange={() => handleDayToggle(day)}
                      className="h-4 w-4"
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            {/* Stops Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Stop Name</th>
                    <th className="border p-2 text-left">Distance</th>
                    <th className="border p-2 text-left">Pickup Time</th>
                    <th className="border p-2 text-left">Drop Time</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.stops.map((stop, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2">{stop.name}</td>
                      <td className="border p-2">{stop.distance}</td>
                      <td className="border p-2">
                        <SlidingLabelInput
                          type="time"
                          label=""
                          value={stop.pickup}
                          onChange={(e) =>
                            handleStopChange(index, "pickup", e.target.value)
                          }
                        />
                      </td>
                      <td className="border p-2">
                        <SlidingLabelInput
                          type="time"
                          label=""
                          value={stop.drop}
                          onChange={(e) =>
                            handleStopChange(index, "drop", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Create Timetable
              </button>
            </div>
      
        </Card>
      </div>
    </>
  );
};

export default CreateTimetable;
