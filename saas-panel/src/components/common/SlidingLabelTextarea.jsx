import { useState } from "react";

export default function SlidingLabelTextarea({
  label,
  name,
  onChange: onChangeProp,
  value = "",
  error= [],
  rows = 3, // Default rows
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      {/* Label */}
      <label
      htmlFor={name}
        className={`absolute transition-all duration-300 ${
          isFocused || value
            ? "-top-2 left-2 text-gray-800 text-xs bg-white px-1 capitalize font-semibold"
            : "top-3.5 left-4 text-gray-400 text-[14px]"
        }`}
      >
        {label}
      </label>

      {/* Textarea */}
      <textarea
      id={name}
        name={name}
        value={value}
        rows={rows}
        onChange={onChangeProp} // Ensure safe execution
        onFocus={() => setIsFocused(true)}
        onBlur={() => !Boolean(value) && setIsFocused(false)} // Ensure correct check
        className={`w-full text-[14px] text-gray-700 border ${error.includes(name)? "border-red-600 bg-red-50 focus:bg-white":"bg-white border-gray-300"} rounded-lg px-4 pt-3 pb-3 focus:outline-none focus:border-gray-600 resize-none`}
      />
    </div>
  );
}
