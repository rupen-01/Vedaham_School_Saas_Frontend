import React, { useState } from "react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CustomCalendar = ({ events, onEventClick }) => {
  const [viewMode, setViewMode] = useState("month");
  const currentMonth = new Date(2025, 6); // July 2025
  const daysInMonth = new Date(2025, 7, 0).getDate();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h3 className="text-lg font-semibold text-center sm:text-left">
          July 2025
        </h3>

        <div className="flex gap-2 justify-center sm:justify-end flex-wrap">
          {["week", "month", "year"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-full border text-sm sm:text-base ${
                viewMode === mode
                  ? "border-indigo-500 text-indigo-600 bg-indigo-200"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 text-center text-xs sm:text-sm font-medium mb-2">
        {days.map((day) => (
          <div key={day} className="truncate">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(2025, 6, i + 1);
          const event = events.find(
            (e) => e.date === date.toISOString().split("T")[0]
          );

          return (
            <div
              key={i}
              className="h-16 sm:h-20 border rounded relative flex flex-col items-center p-1"
            >
              <span className="text-gray-600 text-[10px] sm:text-xs">
                {i + 1}
              </span>
              {event && (
                <div
                  className={`mt-auto text-[10px] sm:text-xs px-1 rounded-full cursor-pointer w-full text-center ${
                    event.type === "holiday"
                      ? "border border-yellow-400 bg-yellow-200"
                      : "border border-indigo-400 bg-indigo-200"
                  }`}
                  onClick={() => onEventClick(event)}
                >
                  {event.name}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
