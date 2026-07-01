import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export default function SlidingLabelSelect({
  label,
  name,
  onChangeProp: onChangeProp,
  value = [],
  multiple = false,
  error = [],
  disabled = false,
  options = [],
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option) => {
    if (multiple) {
      let newValue;

      if (value.includes(option.value)) {
        newValue = value.filter((v) => v !== option.value);
      } else {
        newValue = [...value, option.value];
      }

      onChangeProp && onChangeProp({ target: { name, value: newValue } });
    } else {
      onChangeProp && onChangeProp({ target: { name, value: option.value } });
      setIsOpen(false);
    }
    setIsFocused(true);
  };

  const removeItem = (val) => {
    const newValue = value.filter((item) => item !== val);
    onChangeProp && onChangeProp({ target: { name, value: newValue } });
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Floating Label */}
      <label
        htmlFor={name}
        className={`absolute transition-all duration-300 px-1 capitalize 
          ${
            isFocused || (multiple ? value.length > 0 : value)
              ? "-top-2 z-10 left-2 text-gray-900 text-xs font-semibold"
              : "top-3.5 z-10 left-4 text-gray-500 text-sm sm:text-[14px]"
          }
          ${disabled ? "bg-gray-100" : "bg-white/70 backdrop-blur-md rounded-md"}
        `}
      >
        {label}
      </label>

      {/* Input Box */}
      <div
        className={`w-full text-sm sm:text-[14px] capitalize cursor-pointer border rounded-lg px-3 sm:px-4 pt-4 pb-2 min-h-[42px]
          ${
            error.includes(name)
              ? "border-red-600 bg-red-50 focus:bg-white"
              : disabled
              ? "bg-gray-100 border-gray-400"
              : "bg-white/30 backdrop-blur-lg border-gray-400 focus-within:border-gray-700"
          }
          text-gray-800 transition
        `}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        {/* MULTIPLE MODE → chips */}
        {multiple ? (
          <div className="flex flex-wrap gap-2">
            {value.length > 0 ? (
              value.map((val) => {
                const option = options.find((opt) => opt.value === val);
                return (
                  <span
                    key={val}
                    className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm"
                  >
                    {option?.label || val}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(val);
                      }}
                    />
                  </span>
                );
              })
            ) : (
              <span className="text-gray-500">Select option</span>
            )}
          </div>
        ) : (
          // SINGLE MODE → plain text
          <span className={`${!value ? "text-gray-500" : ""}`}>
            {options.find((opt) => opt.value === value)?.label || "Select option"}
          </span>
        )}

        {/* Arrow */}
        <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          className="absolute left-0 right-0 mt-1 max-h-52 overflow-y-auto border border-gray-400 
               bg-white/90 backdrop-blur-lg rounded-lg shadow-lg z-50 text-sm sm:text-[14px]"
        >
          {options.map((option) => {
            const isActive = multiple
              ? value.includes(option.value)
              : value === option.value;

            return (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-3 sm:px-4 py-2 cursor-pointer flex items-center gap-3 transition
                  ${
                    isActive
                      ? "bg-gray-300/50 text-gray-800 font-medium"
                      : "hover:bg-gray-200/50 text-gray-800"
                  }
                `}
              >
                {multiple && (
                  <input
                    type="checkbox"
                    checked={isActive}
                    readOnly
                    className="form-checkbox text-blue-500"
                  />
                )}
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
