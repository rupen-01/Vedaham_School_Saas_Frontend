
import { useState, useRef } from "react";

export default function SlidingLabelInput({
  label,
  type = "text",
  name,
  min,
  disabled = false,
  className = "",
  required = false,
  maxLength = undefined,
  onChange: onChangeProp = () => {},
  value = "",
  error = [],
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null); // Create a ref for the input field

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Label */}
      <label
        htmlFor={name}
        className={`absolute transition-all capitalize z-20 duration-300 ${
          isFocused || value
            ? "-top-2 left-2 text-gray-900 text-xs px-1 capitalize font-semibold"
            : `top-3.5 left-4 text-gray-500 text-[13px] ${
                type === "date" ||
                type === "time" ||
                type === "datetime-local"
                  ? "bg-white w-[70%] "
                  : ""
              }`
        }
        ${
          disabled
            ? !value
              ? "bg-gray-100"
              : "bg-linear-to-b from-white to-gray-100 rounded-b-md"
            : "bg-white"
        }`}
      >
        {label}
      </label>

      {/* Input with Custom Icon for Date Type */}
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          name={name}
          min={min ? min : undefined}
          id={name}
          maxLength={typeof maxLength === "number" ? maxLength : undefined}
          value={value}
          required={required}
          disabled={disabled}
          aria-invalid={error.includes(name)}
          onChange={onChangeProp}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !value && setIsFocused(false)}
          className={`w-full text-[14px] text-gray-800 border ${
            error.includes(name)
              ? "border-red-600 bg-red-50 focus:bg-white"
              : "bg-white border-gray-400 focus:border-gray-700"
          } rounded-lg px-4 pt-3 pb-3 focus:outline-none`}
          style={{ appearance: "none" }}
        />

        {/* Lucide Calendar Icon (Triggers Date Picker) */}
        {(type === "date" || type === "datetime-local") && (
          <svg
            className="absolute bg-white right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 cursor-pointer"
            onClick={handleIconClick}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6.96 2c.418 0 .756.31.756.692V4.09c.67-.012 1.422-.012 2.268-.012h4.032c.846 0 1.597 0 2.268.012V2.692c0-.382.338-.692.756-.692s.756.31.756.692V4.15c1.45.106 2.403.368 3.103 1.008c.7.641.985 1.513 1.101 2.842v1H2V8c.116-1.329.401-2.2 1.101-2.842c.7-.64 1.652-.902 3.103-1.008V2.692c0-.382.339-.692.756-.692"
            ></path>
            <path
              fill="currentColor"
              d="M22 14v-2c0-.839-.013-2.335-.026-3H2.006c-.013.665 0 2.161 0 3v2c0 3.771 0 5.657 1.17 6.828C4.349 22 6.234 22 10.004 22h4c3.77 0 5.654 0 6.826-1.172C22 19.657 22 17.771 22 14"
              opacity="0.5"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
}
