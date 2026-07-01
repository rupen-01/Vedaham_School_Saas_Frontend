import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import arrow icons

export default function SlidingLabelSelect({
  label,
  name,
  onChange: onChangeProp,
  value = "",
  error= [],
  disabled=false,
  children
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown open/close

  return (
    <div className="relative w-full">
      {/* Label */}
      <label
      htmlFor={name}
        className={`absolute transition-all duration-300 px-1 capitalize 
          ${isFocused || value
            ? "-top-2 z-10 left-2 text-gray-800 text-xs font-semibold"
            : "top-3.5 z-10 left-4 text-gray-400 text-[14px]"
          }
          ${disabled?"bg-gray-100":"bg-white"}
          `}
      >
        {label}
      </label>

      {/* Select Wrapper */}
      <div className="relative ">
        <select
        
          id={name}
          name={name}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            onChangeProp && onChangeProp(e);
            setIsFocused(Boolean(e.target.value));
            setIsOpen(false); // Close dropdown when selected
          }}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={() => {
            !value && setIsFocused(false);
            setIsOpen(false);
          }}
          className={`w-full text-[14px] capitalize cursor-pointer disabled:bg-gray-100 text-gray-700 ${error.includes(name)? "border-red-600 bg-red-50 focus:bg-white":"bg-white border-gray-200"} border rounded-lg px-4 pt-4 pb-2
                     focus:outline-none focus:border-gray-600 appearance-none`}
        >
          <option value="" disabled hidden></option>

           {children}
        </select>

        {/* Dropdown Arrow (Chevron) */}
        <div className="absolute z-0 right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </div>
      </div>
    </div>
  );
}
