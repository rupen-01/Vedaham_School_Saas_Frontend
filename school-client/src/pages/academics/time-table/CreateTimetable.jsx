import React, { useState } from "react";
import Card from "../../../components/common/Card";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import SlidingLabelCheckbox from "../../../components/common/SlidingLabelCheckbox";
import HeadingHeader from "../../../components/common/HeadingHeader";
import BorderedFieldset from "../../../components/common/BorderedFieldset";

const CreateTimeTable = () => {
  const [timeTable, setTimeTable] = useState({
    name: "",
    selectedClass: "",
    selectedSections: [],
    weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    periods: [
      { id: 1, subject: "", startTime: "", endTime: "", day: "", teacher: "" },
    ],
  });

  const classOptions = ["5th", "6th", "7th", "8th", "9th", "10th"];
  const sectionOptions = ["A", "B", "C"];
  const subjectOptions = ["Math", "Science", "English", "History", "Computer"];
  const teacherOptions = ["Mr. Sharma", "Mrs. Gupta", "Mr. Khan", "Ms. Patel"];
  const daysOptions = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
  ];

  const [previewData, setPreviewData] = useState(null);

  const handleChange = (field, value) =>
    setTimeTable((prev) => ({ ...prev, [field]: value }));

  const handleSectionToggle = (section) => {
    setTimeTable((prev) => {
      const isSelected = prev.selectedSections.includes(section);
      return {
        ...prev,
        selectedSections: isSelected
          ? prev.selectedSections.filter((s) => s !== section)
          : [...prev.selectedSections, section],
      };
    });
  };

  const handleWeekDayToggle = (day) => {
    setTimeTable((prev) => {
      const isSelected = prev.weekDays.includes(day);
      return {
        ...prev,
        weekDays: isSelected
          ? prev.weekDays.filter((d) => d !== day)
          : [...prev.weekDays, day],
      };
    });
  };

  const handlePeriodChange = (index, field, value) => {
    const updated = [...timeTable.periods];
    updated[index][field] = value;
    setTimeTable((prev) => ({ ...prev, periods: updated }));
  };

  const addPeriod = () =>
    setTimeTable((prev) => ({
      ...prev,
      periods: [
        ...prev.periods,
        { id: prev.periods.length + 1, subject: "", startTime: "", endTime: "", day: "", teacher: "" },
      ],
    }));

  const handlePreview = () => {
    const grid = {};
    daysOptions.forEach((day) => (grid[day] = []));
    timeTable.periods.forEach((p) => {
      if (p.day && p.subject) {
        grid[p.day].push(`${p.subject} (${p.teacher})\n${p.startTime} - ${p.endTime}`);
      }
    });
    const maxPeriods = Math.max(...Object.values(grid).map((p) => p.length || 0), 1);
    daysOptions.forEach((day) => {
      while (grid[day].length < maxPeriods) grid[day].push("");
    });
    setPreviewData({ grid, maxPeriods });
  };

  return (
    <>
      <HeadingHeader
        title="Create Time Table"
        items={[
          { label: "Academic", path: "/academic" },
          { label: "Time Table", path: "/academic/timetable" },
          { label: "Create Time Table", path: "/academic/timetable/create" },
        ]}
      />

      <div className="flex flex-col gap-4">
        <Card>
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SlidingLabelInput
              label="Time Table Name"
              value={timeTable.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <SlidingLabelSelect
              label="Select Class"
              name="selectedClass"
              value={timeTable.selectedClass}
              onChangeProp={(e) => handleChange("selectedClass", e.target.value)}
              options={classOptions.map((cls) => ({ label: cls, value: cls }))}
            />
            <SlidingLabelSelect
              label="Select Section"
              name="selectedSections"
              value={timeTable.selectedSections}
              multiple
              onChangeProp={(e) => handleChange("selectedSections", e.target.value)}
              options={sectionOptions.map((sec) => ({ label: sec, value: sec }))}
            />
          </div>

          {/* Week Working Days */}
          <BorderedFieldset legend="Week Working Days" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {daysOptions.map((day) => (
                <SlidingLabelCheckbox
                  key={day}
                  label={day}
                  checked={timeTable.weekDays.includes(day)}
                  onChange={() => handleWeekDayToggle(day)}
                />
              ))}
            </div>
          </BorderedFieldset>

          {/* Period Timings */}
          <div className="mt-6">
            {timeTable.periods.map((period, index) => (
              <BorderedFieldset key={period.id} legend={`Period - ${index + 1}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <SlidingLabelSelect
                    label="Select Subject"
                    value={period.subject}
                    onChangeProp={(e) => handlePeriodChange(index, "subject", e.target.value)}
                    options={subjectOptions.map((s) => ({ label: s, value: s }))}
                  />
                  <SlidingLabelSelect
                    label="Day"
                    value={period.day}
                    onChangeProp={(e) => handlePeriodChange(index, "day", e.target.value)}
                    options={daysOptions.map((d) => ({ label: d, value: d }))}
                  />
                  <SlidingLabelSelect
                    label="Teacher"
                    value={period.teacher}
                    onChangeProp={(e) => handlePeriodChange(index, "teacher", e.target.value)}
                    options={teacherOptions.map((t) => ({ label: t, value: t }))}
                  />
                  <SlidingLabelInput
                    type="time"
                    label="Start Time"
                    value={period.startTime}
                    onChange={(e) => handlePeriodChange(index, "startTime", e.target.value)}
                  />
                  <SlidingLabelInput
                    type="time"
                    label="End Time"
                    value={period.endTime}
                    onChange={(e) => handlePeriodChange(index, "endTime", e.target.value)}
                  />
                </div>
              </BorderedFieldset>
            ))}
            <button onClick={addPeriod} className="mt-2 text-indigo-600 text-sm hover:underline">
              + Add Period
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
            <button
              onClick={handlePreview}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Preview
            </button>
            <button
              onClick={() => console.log("Save Time Table", timeTable)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Assignment
            </button>
          </div>
        </Card>

        {/* Preview */}
        {previewData && (
          <Card>
            <h3 className="text-gray-700 font-semibold mb-2">Time Table Preview</h3>
            <div className="mb-4">
              <p><strong>Class:</strong> {timeTable.selectedClass}</p>
              <p><strong>Sections:</strong> {timeTable.selectedSections.join(", ")}</p>
              <p><strong>Week Working Days:</strong> {timeTable.weekDays.join(", ")}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto border border-gray-300 w-full text-center text-sm">
                <thead>
                  <tr>
                    {daysOptions.map((day) => (
                      <th key={day} className="border p-2 bg-gray-100">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: previewData.maxPeriods }).map((_, row) => (
                    <tr key={row}>
                      {daysOptions.map((day) => (
                        <td key={day} className="border p-2 whitespace-pre-line">
                          {previewData.grid[day][row] || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default CreateTimeTable;
