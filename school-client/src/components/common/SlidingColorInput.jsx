import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function SlidingColorInput({
  label = "Color",
  name = "color",
  initialColor = "",
  onChange = () => {},
  error = [],
  disabled = false,
}) {
  const [colorCode, setColorCode] = useState(initialColor || "");
  const [isFocused, setIsFocused] = useState(false);

  const isValidHex = (value) => /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);

  // Sync from parent (e.g., edit form or reset)
  useEffect(() => {
    if (initialColor && isValidHex(initialColor)) {
      setColorCode(initialColor);
    }
  }, [initialColor]);

  const handleInputChange = (e) => {
    const newColor = e.target.value;
    setColorCode(newColor);
    if (isValidHex(newColor)) {
      onChange({ target: { name, value: newColor } });
    }
  };

  const handleColorPickerChange = (e) => {
    const picked = e.target.value;
    setColorCode(picked);
    onChange({ target: { name, value: picked } });
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className={`absolute transition-all capitalize z-20 duration-300 ${
          isFocused || colorCode
            ? "-top-2 left-2 text-gray-800 text-xs px-1 font-semibold"
            : "top-3.5 left-4 text-gray-400 text-[13px]"
        } ${disabled ? "bg-gray-100" : "bg-white"}`}
      >
        {label}
      </label>

      <div className="flex items-center border rounded-lg overflow-hidden border-gray-200 focus:border-gray-60">
        <input
          type="text"
          name={name}
          value={colorCode}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 text-sm text-gray-700 focus:outline-none ${
            error.includes(name) ? "border-red-600 bg-red-50" : "bg-white"
          }`}
        />

        <label htmlFor="input-color" className="cursor-pointer">
          <div className="h-6 w-6 rounded-md -mr-3">
            <Icon
              icon="material-symbols:id-card"
              width="26"
              height="26"
              style={{ color: isValidHex(colorCode) ? colorCode : "#d1d1d1" }}
            />
          </div>
        </label>

        <input
          type="color"
          value={isValidHex(colorCode) ? colorCode : "#000000"}
          disabled={disabled}
          id="input-color"
          onChange={handleColorPickerChange}
          className="h-8 w-8 opacity-0 rounded-full cursor-pointer border-l border-gray-200"
          title="Pick a color"
        />
      </div>
    </div>
  );
}
