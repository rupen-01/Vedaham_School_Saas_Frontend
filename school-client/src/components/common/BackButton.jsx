import { useNavigate } from "react-router-dom";

export default function BackButton({back}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(back)}
      className="flex items-center cursor-pointer justify-center gap-2 px-3 pr-4 py-2 text-sm md:text-[14px] font-bold text-gray-900 bg-gray-200 
                 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-300 focus:outline-none 
                 shadow-none relative overflow-hidden"
    >
      {/* Icon */}
      <span className="flex items-center justify-center w-4 h-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-4 h-4 text-gray-900"
        >
          <path
            fill="currentColor"
            d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64"
          />
        </svg>
      </span>

      {/* Label */}
      <span>Back</span>

      {/* Hover Effect Animation */}
      <span
        className="absolute inset-0 w-full h-full rounded-lg bg-gray-900 opacity-10 transition-all 
                   duration-300 ease-in-out scale-0 hover:scale-100"
      />
    </button>
  );
}
