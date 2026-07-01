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
  multiple = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { color } = useColorContext(); // <-- Theme color from context

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
      if (selected.includes(value)) {
        onSelect(selected.filter((item) => item !== value));
      } else {
        onSelect([...selected, value]);
      }
    } else {
      onSelect([value]);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Floating label */}
      <label
        htmlFor={name}
        className={`absolute transition-all duration-300 bg-white px-1 capitalize
          ${selected.length > 0
            ? `-top-2 left-2 text-[10px] md:text-[11px] font-semibold px-2`
            : `top-3.5 left-4 text-[12.25px] md:text-sm`
          }
        `}
        style={{ color: selected.length > 0 ? color : "#9ca3af" /* gray-400 fallback */ }}
      >
        {label}
      </label>

      {/* Input box */}
      <div
        className={`w-full h-11 text-xs md:text-[13px] rounded-lg px-0.5 md:px-4 py-[14px] focus:outline-none cursor-pointer`}
        style={{
          border: `1px solid ${error.includes(name) ? "#dc2626" /* red-600 */ : color}`,
          backgroundColor: error.includes(name) ? "#fef2f2" /* red-50 */ : "#fff",
          color: "#1c252e"
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs md:text-[13px] font-normal">
            {selected.length > 0 ? selected.map(getLabelForValue).join(", ") : ""}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" style={{ color }} />
          ) : (
            <ChevronDown className="w-4 h-4" style={{ color }} />
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute backdrop-blur-lg bg-cover shadow-lg px-1 rounded-md mt-1 w-full max-h-60 overflow-auto z-30"
          style={{
            backgroundColor: "#ffffff",
            transition: "opacity 0.294s cubic-bezier(0.4, 0, 0.2, 1), transform 0.196s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          {options.map((option, index) => {
            const value = getValueForOption(index);
            const isActive = selected.includes(value);
            return (
              <label
                key={index}
                className={`flex items-center text-[12.25px] leading-[21px] font-medium px-4 py-2 mb-1 cursor-pointer rounded-md`}
                style={{
                  color: "#1c252e",
                  backgroundColor: isActive ? `${color}1A` /* 10% opacity */ : "transparent",
                  transition: "background-color 0.2s"
                }}
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  checked={isActive}
                  onChange={() => handleOptionChange(value)}
                  className="mr-2 rounded-md w-4 h-4 cursor-pointer border"
                  style={{
                    accentColor: color,
                    borderColor: color,
                    outlineColor: color
                  }}
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
