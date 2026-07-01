import { useState } from "react";
import { useColorContext } from "../../context/context";

export default function ToggleSwitch({ label, checked, onChange, className = "" }) {
  const [isChecked, setIsChecked] = useState(checked ?? false);
  const { color }= useColorContext();

const handleToggle = () => {
  setIsChecked(!isChecked);
  if (onChange) {
    onChange({ target: { checked: !isChecked } }); // ✅ fake event
  }
};


  return (
    <div className={`flex items-center justify-between p-2 py-2.5 border border-gray-200 rounded-md gap-3 capitalize  ${className}`}>
      {label && <span className="text-gray-500 text-[13px] font-medium">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={handleToggle}
        style={{
          backgroundColor: isChecked ? color : "#d1d5dc",
          borderColor: isChecked ? color : "#d1d5dc",
        }}
        className={`relative flex items-center h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-300 ease-in-out focus:outline-none`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${
            isChecked ? "translate-x-5.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
