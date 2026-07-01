import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useColorContext } from "../../context/context";

export default function SlidingDropdown({
  label,
  name,
  options = [],
  values = null,
  selected = [],
  onSelect,
  error = [],
  multiple = true, // 🔸 New Prop: Single or Multiple selection (default: multiple)
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { color } = useColorContext();

  const isUsingCustomValues = Array.isArray(values) && values.length === options.length;

  const getValueForOption = (index) => {
    return isUsingCustomValues ? values[index] : options[index];
  };

  const getLabelForValue = (val) => {
    if (isUsingCustomValues) {
      const idx = values.indexOf(val);
      return options[idx] || val;
    }
    return val;
  };

  const handleOptionChange = (value) => {
    if (multiple) {
      // Multiple selection logic
      if (selected.includes(value)) {
        onSelect(selected.filter((item) => item !== value));
      } else {
        onSelect([...selected, value]);
      }
    } else {
      // Single selection logic
      onSelect([value]);
      setIsOpen(false); // Close dropdown on single select
    }
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className={`absolute transition-all duration-300 bg-white px-1 capitalize 
          ${selected.length > 0 
            ? "-top-2 left-2 text-gray-800 text-[10px] md:text-[11px] font-semibold px-2" 
            : "top-3.5 left-4 text-gray-400 text-[12.25px] md:text-sm"}`}
      >
        {label}
      </label>

      <div
        className={`w-full h-11 text-xs md:text-[13px] text-gray-700 ${
          error.includes(name) ? "border-red-600 bg-red-50" : "bg-white border-gray-200 focus-within:border-amber-300"
        } border rounded-lg px-0.5 md:px-4 py-[14px] focus:outline-none focus:border-gray-600 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className="text-[#1c252e] overflow-hidden text-ellipsis whitespace-nowrap text-xs md:text-[13px] font-normal">
            {selected.length > 0 ? selected.map(getLabelForValue).join(", ") : ""}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute backdrop-blur-lg bg-cover shadow-lg px-1 rounded-md mt-1 w-full max-h-60 overflow-auto z-30"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff3f, #ffffff3f),url("data:image/svg+xml,...")`,
            transition: "opacity 0.294s cubic-bezier(0.4, 0, 0.2, 1), transform 0.196s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {options.map((option, index) => {
            const value = getValueForOption(index);
            return (
              <label
                key={index}
                className={`flex items-center text-[#1c252e] text-[12.25px] leading-[21px] font-medium px-4 py-2 mb-1 cursor-pointer rounded-md ${
                  selected.includes(value) ? "bg-gray-800/8" : "hover:bg-gray-800/8"
                }`}
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  checked={selected.includes(value)}
                  onChange={() => handleOptionChange(value)}
                  className="mr-2 rounded-md w-4 h-4 cursor-pointer border-slate-300 outline-slate-300"
                  name={name}
                />
                {option}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
