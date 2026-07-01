import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
// import Lightlogo from "../../assets/SchoolErpFull.png";
// import Darklogo from "../../assets/SchoolErpFull.png";
import CloseLightlogo from "../../assets/SchoolErp.png";
import CloseDarklogo from "../../assets/SchoolErp.png";
import { FaChevronDown } from "react-icons/fa";
import { useColorContext } from "../../context/context";
import MenuItem from "../../config/SideBarConfig";

const userRole = Cookies.get("role");

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [subActiveIndex, setSubActiveIndex] = useState(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);

    const { bgColor, color, activeNavColor } = useColorContext();
const location=useLocation();
  const handleToggleMenu = (name) => {
    if (isCollapsed) {
      setOpenMenus((prev) => ({
        [name]: !prev[name], // toggle clicked menu only
      }));
    } else {
      setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  };

  const handleHoverOpen = (name) => {
    if (isCollapsed) {
      setOpenMenus({ [name]: true });
    }
  };

  const handleHoverClose = () => {
    if (isCollapsed) {
      setOpenMenus({});
      setHoveredSubMenu(null);
    }
  };

  return (
    <motion.div
      initial={{ width: "16rem" }}
      animate={{ width: isCollapsed ? "5rem" : "288px" }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 h-full z-[999] border-r border-dashed border-gray-200 shadow-md 
        ${isCollapsed ? "w-20" : "w-72"} 
        ${activeNavColor === "light" ? "bg-white" : "bg-gray-900"}`}
    >
      
  <div className="flex items-center justify-between w-full h-16 mt-2"> 
  <Link
    to="/"
    className={`flex items-center w-full h-16 ${
      isCollapsed ? "justify-center" : "justify-between"
    }`}
  >
    {isCollapsed ? (
      // 👉 Only Logo when collapsed
      <img
        src={activeNavColor === "light" ? CloseLightlogo : CloseDarklogo}
        alt="logo"
        className="h-11 p-1.5 py-1 ml-7 rounded-sm"
      />
    ) : (
      // 👉 Logo + Text when expanded
      <div className="flex items-center gap-3 ml-5">
        <img
          src={activeNavColor === "light" ? CloseLightlogo : CloseDarklogo}
          alt="logo"
          className="h-12 w-auto"
        />
        <div>
          <div className="font-semibold text-sm tracking-wide">
            School ERP System
          </div>
          <div className="text-[12px] text-gray-500 mt-0.5">
            School Admin Dashboard
          </div>
        </div>
      </div>
    )}
  </Link>

  <button
    onClick={() => setIsCollapsed(!isCollapsed)}
    className={`${
      isCollapsed
        ? "h-[33px] w-[36px] -right-3 border border-gray-200"
        : "w-[30px] h-[29px] -left-4"
    } flex relative cursor-pointer text-sm items-center justify-center rounded-md bg-white text-gray-500`}
  >
    {isCollapsed ? (
      <Icon icon="fa-solid:arrow-right" />
    ) : (
      <Icon icon="fa-solid:arrow-left" />
    )}
  </button>
</div>


      {/* Menu Items */}
      <nav
        className={`flex-1 p-4 overflow-y-scroll scrollbar-hide h-[90dvh] ${
          isCollapsed && "px-0"
        }`}
        style={{ scrollbarWidth: "none" }}
      >
        <ul className="space-y-2">
          {MenuItem.map((item, index) => {
            const isSubMenuActive =
              item.subItems &&
              item.subItems.some(
                (sub) =>
                  location.pathname === sub.path ||
                  (sub.subItems &&
                    sub.subItems.some((ss) => location.pathname === ss.path))
              );

            return (
              <li
                key={index}
                onMouseEnter={() => handleHoverOpen(item.name)}
                onMouseLeave={handleHoverClose}
                className="relative"
              >
                {item.subItems ? (
                  <>
                    {/* Main Tab */}
                    <button
                      onClick={() => handleToggleMenu(item.name)}
                      className={`flex  ${
                        isCollapsed ? "flex-col items-center" : "items-center justify-between "
                      } w-full p-3 rounded-lg transition-all
                        ${
                          isSubMenuActive
                            ? "bg-indigo-100 text-indigo-700"
                            : "text-gray-600 hover:bg-indigo-50"
                        }`}
                    >
                      <div
                        className={`flex ${
                          isCollapsed
                            ? "flex-col items-center gap-1"
                            : "flex-row gap-3 items-center"
                        }`}
                      >
                        {item.icon}
                        {isCollapsed ? (
                          <span className="text-[11px] font-medium text-center">
                            {item.name}
                          </span>
                        ) : (
                          <span className="text-[12px] font-semibold tracking-wide font-[Inter]">
                            {item.name}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <FaChevronDown
                          className={`transition-transform text-xs duration-300 ${
                            openMenus[item.name]
                              ? "rotate-0 text-indigo-600"
                              : "-rotate-90 text-gray-400"
                          }`}
                        />
                      )}
                    </button>

                    {/* Floating sub-tabs (collapsed) */}
                    {isCollapsed && openMenus[item.name] && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 left-full ml-2 w-56 bg-white shadow-lg rounded-md p-3 z-[9999]"
                      >
                        {item.subItems.map((sub, subIndex) => (
                          <div
                            key={subIndex}
                            onMouseEnter={() => setHoveredSubMenu(sub)}
                            onMouseLeave={() => setHoveredSubMenu(null)}
                            className="relative"
                          >
                            <Link
                              to={sub.path}
                              className="flex items-center gap-2 py-2 px-2 rounded-md text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                              {sub.icon}
                              <span className="text-[12px] font-medium">{sub.name}</span>
                              {sub.subItems && (
                                <Icon
                                  icon="mdi:chevron-right"
                                  className="ml-auto text-gray-400"
                                />
                              )}
                            </Link>

                            {/* Sub-subtabs */}
                            {hoveredSubMenu?.name === sub.name && sub.subItems && (
                              <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-0 left-full ml-2 w-56 bg-white shadow-lg rounded-md p-2 z-[99999]"
                              >
                                {sub.subItems.map((subSub, i) => (
                                  <Link
                                    key={i}
                                    to={subSub.path}
                                    className="flex items-center gap-2 py-2 px-2 rounded-md text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                                  >
                                    {subSub.icon}
                                    <span className="text-[11.5px]">{subSub.name}</span>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}

                   
                {/* Expanded sidebar sub-tabs */}
{!isCollapsed && openMenus[item.name] && (
  <motion.ul
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className="pl-3 mt-1 space-y-1"
  >
    {item.subItems.map((sub, subIndex) => {
      const isSubSubActive = sub.subItems?.some(
        (ss) => location.pathname === ss.path
      );
      const isActive =
        location.pathname === sub.path || isSubSubActive;

      const baseClass = `flex items-center justify-between gap-2 py-2 px-2 rounded-md cursor-pointer group transition-all h-10 min-h-[40px]`; // uniform height

      return (
        <div key={subIndex}>
          {sub.subItems ? (
            // Has sub-subtabs => open collapse
            <li
              className={`${baseClass} ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "text-gray-600 hover:bg-indigo-50"
              }`}
              onClick={() =>
                setSubActiveIndex(
                  subActiveIndex === subIndex ? null : subIndex
                )
              }
            >
              <div className="flex items-center gap-2 pl-2">
                {sub.icon}
                <span className="text-[12px] font-medium font-[Inter]">
                  {sub.name}
                </span>
              </div>
              <Icon
                icon="mdi:chevron-right"
                className={`transition-transform duration-300 ${
                  subActiveIndex === subIndex
                    ? "text-indigo-600 rotate-90"
                    : "text-gray-400 rotate-0"
                }`}
              />
            </li>
          ) : (
            // No sub-subtabs => direct link
            <Link
              to={sub.path}
              className={`${baseClass} ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "text-gray-600 hover:bg-indigo-50"
              }`}
            >
               
              <div className="flex items-center gap-2 pl-2">
             <div style={{backgroundColor:location.pathname === sub.path&&color+"20"}} className="h-3 w-3 backdrop-blur-lg rounded-full grid place-content-center">
                                <span style={{backgroundColor:location.pathname === sub.path?color:"#6a7282"}} className="h-1 w-1 rounded-full"></span>
                              </div>
                <span className="text-[12px] font-medium font-[Inter]">
                  {sub.name}
                </span>
              </div>
            </Link>
          )}

          {/* Sub-sub-tabs */}
          {sub.subItems && subActiveIndex === subIndex && (
            <motion.ul
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.3 }}
              className="pl-6 pt-1 text-sm text-gray-600 space-y-1"
            >
              {sub.subItems.map((subSub, i) => (
                <li key={i}>
                  <Link
                    to={subSub.path}
                    className={`flex items-center gap-2 pl-2 py-1 rounded hover:text-indigo-600 ${
                      location.pathname === subSub.path
                        ? "font-semibold text-indigo-600"
                        : ""
                    }`}
                  >
                  
                       <div style={{backgroundColor:location.pathname === subSub.path&&color+"20"}} className="h-3 w-3 backdrop-blur-lg rounded-full grid place-content-center">
                                <span style={{backgroundColor:location.pathname === subSub.path?color:"#6a7282"}} className="h-1 w-1 rounded-full"></span>
                              </div>
                    <span className="text-[11.5px]">{subSub.name}</span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      );
    })}
  </motion.ul>
)}

                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex ${
                      isCollapsed ? "flex-col items-center gap-1" : "flex-row gap-3"
                    } p-3 rounded-lg transition-all 
                      ${
                        location.pathname === item.path
                          ? "bg-indigo-100 text-indigo-700 font-semibold"
                          : "text-gray-600 hover:bg-indigo-50"
                      }`}
                  >
                    {item.icon}
                    {isCollapsed ? (
                      <span className="text-[11.5px] text-center">{item.name}</span>
                    ) : (
                      <span className="text-[11.5px] font-[Inter]">{item.name}</span>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
