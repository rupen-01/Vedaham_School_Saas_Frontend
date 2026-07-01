import { useNavigate, useLocation } from "react-router-dom";
import { useColorContext } from "../../context/context";

export default function Breadcrumb({ items = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { color } = useColorContext();

  return (
    <ol className="sm:flex hidden flex-wrap items-center p-0 m-0 list-none gap-x-2 gap-y-1 box-border">
      {items.map((item, index) => (
        <li key={index} className="flex items-center box-border">
          {/* Breadcrumb Item (Link or Active Text) */}
          {index !== items.length - 1 ? (
            <button
              onClick={() => navigate(item.path)}
              className={`text-[13px] cursor-pointer capitalize leading-[22px] text-[#1c252e] font-normal flex items-center gap-2 transition-colors hover:text-gray-700 ${
                location.pathname === item.path ? " text-[#1c252e]" : ""
              }`}
            >
              {item.label}
            </button>
          ) : (
            <span
              style={{ color: color }}
              className="text-[13px] leading-[22px] capitalize font-normal flex items-center gap-2 cursor-default pointer-events-none"
            >
              {item.label}
            </span>
          )}

          {/* Separator (Dot) */}
          {index !== items.length - 1 && (
            <span style={{background:location.pathname === item.path ?color:"#4a5565"}} className="w-1 h-1 rounded-full bg-gray-600 mx-3 mt-0.5"></span>
          )}
        </li>
      ))}
    </ol>
  );
}
