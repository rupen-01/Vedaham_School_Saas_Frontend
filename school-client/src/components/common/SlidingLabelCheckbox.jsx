import { useState } from "react";

export default function SlidingLabelCheckbox({
  label,                 // floating label text
  checkboxLabel = "Yes", // label next to the checkbox
  name,
  onChange: onChangeProp,
  checked = false,
  disabled = false,
  error = [],
  className = "",
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Floating Label */}
      <label
        htmlFor={name}
        className={`absolute transition-all capitalize z-20 duration-300 px-1 font-semibold
          ${
            true || checked
              ? "-top-2 left-2 text-gray-900 text-xs font-semibold"
              : "top-3.5 left-4 text-gray-500 text-[13px]"
          }
          ${
            disabled
              ? !checked
                ? "bg-gray-100"
                : "bg-gradient-to-b from-white to-gray-100 rounded-b-md"
              : "bg-white"
          }`}
      >
        {label}
      </label>
      

      {/* Checkbox Container */}
      <div
        className={`w-full border rounded-lg px-4 pt-3 pb-3 flex items-center
          ${
            error.includes(name)
              ? "border-red-600 bg-red-50 focus-within:bg-white"
              : disabled
              ? "bg-gray-100 border-gray-300"
              : "bg-white border-gray-400 focus-within:border-gray-700"
          }`}
      >
        {/* Checkbox Input */}
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChangeProp?.(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`h-4 w-4 rounded cursor-pointer 
            ${
              disabled
                ? "text-gray-400 border-gray-300"
                : error.includes(name)
                ? "text-red-600 border-red-600"
                : "text-gray-800 border-gray-400 focus:ring-gray-700"
            }`}
        />

        {/* Checkbox Label Text */}
        <span
          className={`ml-2 text-xs md:text-[14px] ${
            disabled ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {checkboxLabel}
        </span>
      </div>
    </div>
  );
}
