import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SearchableSlidingSelect({
  label,
  name,
  options = [],
  onChange: onChangeProp,
  value = "",
  error = [],
  disabled = false
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSelect = (selectedValue) => {
    onChangeProp && onChangeProp({ target: { name, value: selectedValue } });
    setIsFocused(true);
    setIsOpen(false);
    setSearchText("");
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

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
          ${disabled ? "bg-gray-100" : "bg-white"}
        `}
      >
        {label}
      </label>

      {/* Custom Dropdown */}
      <div
        className={`w-full relative border rounded-lg ${error.includes(name) ? "border-red-600 bg-red-50" : "border-gray-200 bg-white"} ${disabled && "bg-gray-100"} text-[14px]`}
      >
        {/* Input Field for Search */}
        <input
          type="text"
          name={name}
          disabled={disabled}
          value={isOpen ? searchText : selectedLabel}
          placeholder=""
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsOpen(false);
              !value && setIsFocused(false);
              setSearchText("");
            }, 150); // Delay for option click
          }}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 pt-4 pb-2 outline-none bg-transparent text-gray-700 placeholder:text-gray-400 rounded-lg cursor-pointer"
        />

        {/* Chevron Icon */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </div>

        {/* Options Dropdown */}
        {isOpen && (
          <ul className="absolute z-50 mt-1 w-full max-h-52 overflow-auto bg-white border border-gray-300 rounded-lg shadow-md">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  onMouseDown={() => handleSelect(opt.value)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No options found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
