export default function SlidingLabelRadio({
  label,
  name,
  options = [],
  value = "",
  onChange,
  error = [],
  direction = "horizontal", // "horizontal" or "vertical"
}) {
  return (
    <div className="w-full mt-4">
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Radio Buttons */}
      <div
        className={`flex flex-wrap ${
          direction === "horizontal"
            ? "flex-col sm:flex-row gap-3 sm:gap-6"
            : "flex-col gap-2"
        }`}
      >
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-2 text-gray-800 text-sm cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              className="w-4 h-4 text-indigo-600 border-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="font-medium">{option}</span>
          </label>
        ))}
      </div>

      {/* Error message */}
      {error.includes(name) && (
        <p className="text-xs text-red-600 mt-1">Please select {label}</p>
      )}
    </div>
  );
}
