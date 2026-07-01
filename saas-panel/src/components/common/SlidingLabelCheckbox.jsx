import { useState } from "react";

export default function SlidingLabelCheckbox({
  label,
  name,
  onChange: onChangeProp,
  checked =null,
  error = [],
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full flex items-center space-x-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={(e) => onChangeProp(e)} // Pass full event or adapt to (e.target.checked)
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
      />
      <label
        htmlFor={name}
        className={`transition-all duration-300 cursor-pointer ${
          isFocused || checked
            ? "text-gray-800 text-sm font-medium"
            : "text-gray-400 text-sm"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
