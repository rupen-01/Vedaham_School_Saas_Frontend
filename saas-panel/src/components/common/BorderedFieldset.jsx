export default function BorderedFieldset({ legend, children,className="" }) {
    return (
      <fieldset className={`relative w-full border my-7 border-gray-300/80 rounded-lg p-4 ${className}`}>
        {/* Floating Legend */}
        <legend className="px-2 capitalize text-gray-700 font-semibold bg-white absolute -top-3 left-3 text-sm">
          {legend}
        </legend>
  
        {/* Inner Content */}
        <div className="mt-2">{children}</div>
      </fieldset>
    );
  }
  