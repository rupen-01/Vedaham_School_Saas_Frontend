import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip, Menu, MenuItem } from "@mui/material";
import menuItems from "../../config/SideBarConfig.jsx";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
// import logo from "../../assets/Logo.png";
import Lightlogo from "../../assets/SchoolErp.png";
import Darklogo from "../../assets/SchoolErpFull.png";
import CloseLightlogo from "../../assets/SchoolErp.png";
import CloseDarklogo from "../../assets/SchoolErp.png";
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaBoxOpen,
  FaMoneyBillWave,
  FaCog,
  FaTags,
  FaLink,
  FaIndustry,
  FaFileInvoice,
  FaCreditCard,
  FaChevronDown,
} from "react-icons/fa";
import { useColorContext } from "../../context/context";
const userRole=Cookies.get("role");

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [hoverMenu, setHoverMenu] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { bgColor, color, activeNavColor } = useColorContext();

  const handleToggleMenu = (name) => {
    setOpenMenus((prev) => {
      // If the same menu is clicked, toggle it
      if (prev[name]) {
        return { ...prev, [name]: false };
      }
      // Otherwise, close all and open the new menu
      return { [name]: true };
    });
  };

  const handleHoverOpen = (event, name) => {
    if (isCollapsed) {
      setHoverMenu(name);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleHoverClose = () => {
    setHoverMenu(null);
    setAnchorEl(null);
  };

  return (
    <motion.div
      initial={{ width: "16rem" }}
      animate={{ width: isCollapsed ? "5rem" : "288px" }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 h-full z-[999]  duration-200 transition-all border-r border-dashed border-gray-200 shadow-md 
    ${isCollapsed ? "w-20" : "w-72"} 
    lg:block ${isCollapsed ? "hidden lg:block" : ""}
    ${activeNavColor === "light" ? "bg-white" : "bg-gray-900"}
    `}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between w-full h-16 mt-2"
      >
        <Link to="/" className={`flex items-center w-full h-16 ${isCollapsed?"justify-center":"justify-between"}`}>
          <img
            src={!isCollapsed ? (activeNavColor!=="light"?Lightlogo:Darklogo) : (activeNavColor==="light"?CloseLightlogo:CloseDarklogo)}
            // src={logo}
            alt="logo"
            // style={{ background: color }}
            className={`${
              isCollapsed
                ? "h-11 p-1.5 py-1 ml-7 rounded-sm"
                : "h-17 p-2.5 rounded-md ml-5"
            }`}
          />
        </Link>
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`${
            isCollapsed ? "h-[33px] w-[36px] -right-3 border border-gray-200" : "w-[30px] h-[29px] -left-4"
          } flex relative cursor-pointer text-sm items-center justify-center rounded-md bg-white text-gray-500`}
        >
          {isCollapsed ? (
            <span className="flex justify-between items-center gap-0.5">
            <Icon icon="fa-solid:arrow-right" />
            <div className="bg-gray-300 h-4 w-[2.5px] rounded"></div>
          </span>
          ) : (
            <span className="flex justify-between items-center gap-0.5">
              <div className="bg-gray-300 h-4 w-[2.5px] rounded"></div>
              <Icon icon="fa-solid:arrow-left" />
            </span>
          )}
        </button>
      </motion.div>

      {/* Menu Items */}
      <nav className={`flex-1 p-4 overflow-y-scroll scroll-hide h-[90dvh]  ${isCollapsed && "px-0"}`}>
        <ul className="space-y-1.5">
          {menuItems.map((item, index) => {
            // Check if any sub-item is active
            const isSubMenuActive =
              item.subItems &&
              item.subItems.some((sub) => location.pathname === sub.path);

            return (
              <li key={index}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => handleToggleMenu(item.name)}
                      onMouseEnter={(e) => handleHoverOpen(e, item.name)}
                      onMouseLeave={handleHoverClose}
                      className={`flex relative items-center p-3 w-full rounded-lg transition-all
                      ${
                        isSubMenuActive
                          ? openMenus[item.name]
                            ? ""
                            : "bg-gray-100"
                          : !openMenus[item.name]
                          ? `text-gray-500  ${
                              activeNavColor === "light"
                                ? "hover:bg-gray-100"
                                : "hover:bg-gray-800"
                            }`
                          : !isCollapsed
                          ? "bg-gray-100"
                          : "text-gray-500"
                      }
                      ${isCollapsed ? "justify-center" : "justify-between"}
                    `}
                      style={
                        openMenus[item.name] || isSubMenuActive
                          ? isSubMenuActive
                            ? { backgroundColor: bgColor, color: color }
                            : {
                                backgroundColor:
                                  activeNavColor === "light"
                                    ? "#f3f6f4"
                                    : "#1e2939",
                                color: activeNavColor === "light" ?"#6b7280": "#f3f6f4",
                              }
                          : {}
                      }
                    >
                      <div
                        className={`flex items-center  ${
                          isCollapsed
                            ? "flex-col justify-center  items-center px-0"
                            : "flex-row"
                        }
                 `}
                      >
                        <span className="text-[20px]">{item.icon}</span>
                        <span
                          className={` font-[500]  ${
                            isCollapsed
                              ? "text-[9px] text-centre text-nowrap"
                              : "text-[12.25px] ml-3"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      {/* onclose side bar this meenu show  */}
                      {isCollapsed && hoverMenu === item.name && (
                        <div
                        className="fixed z-[9999] bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-lg overflow-auto"
                        style={{
                          top: Math.min(
                            anchorEl?.getBoundingClientRect().top || 0,
                            window.innerHeight - 200 // Leave space at bottom
                          ),
                          left: 80, // sidebar width
                          maxHeight: '300px' // Limit height to prevent overflow
                        }}
                        onMouseLeave={handleHoverClose}
                      >
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: "easeIn" }}
                            className="bg-white bg-opacity-90 backdrop-blur-md p-1 shadow-lg rounded-lg box-border"
                          >
                            {item.subItems.map((sub, i) => (
                              <li key={i}>
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.1,
                                    ease: "easeOut",
                                  }}
                                  className="rounded-bl-sm"
                                >
                                  <Link
                                    to={sub.path}
                                    className={`flex text-[14px] leading-[22px] px-3 py-2 text-nowrap rounded-md hover:bg-gray-100 transition-all ${
                                      location.pathname === sub.path
                                        ? "bg-gray-100"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {sub.name}
                                  </Link>
                                </motion.div>
                              </li>
                            ))}
                          </motion.ul>
                        </div>
                      )}
                      {!isCollapsed && <FaChevronDown className={!openMenus[item.name]?"text-xs duration-150 transition-all -rotate-90":"text-xs rotate duration-150 transition-all"} />}
                    </button>

                    {!isCollapsed && openMenus[item.name] && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }} // Start slightly off-screen to the left
                        animate={{ opacity: 1, y: 0 }} // Move to original position
                        transition={{ duration: 0.2, ease: "easeIn" }}
                        className="mb-4 rounded-md  px-0 pb-3"
                      >
                        {item.subItems.map((sub, i) => (
                          <li
                            key={i}
                            className={`${
                              i === 0 ? "h-7" : "h-11 "
                            } relative w-3 overflow-visible  rounded-bl-sm
                            ${
                              activeNavColor === "light"
                                ? "border-gray-200/90"
                                : "border-gray-800/90"
                            }
                            
                            `}
                          >
                            <motion.div
                              initial={{ opacity: 0, y: -10 }} // Start slightly off-screen to the left
                              animate={{ opacity: 1, y: 0 }} // Move to original position
                              transition={{ duration: 0.1, ease: "easeOut" }}
                              className="overflow-visible"
                            >
                              <Link
                                style={
                                  location.pathname === sub.path
                                    ? {
                                        backgroundColor: `${
                                          activeNavColor === "light"
                                            ? bgColor
                                            : "#1e2939"
                                        }`,
                                        fontWeight: "600",
                                        color: `${
                                          activeNavColor === "light"
                                            ? color
                                            : "#f2f6f4"
                                        }`,
                                      }
                                    : { color: "gray" }
                                }
                                to={sub.path}
                                className={`${
                                  i === 0 ? "top-3.5" : "top-7"
                                } text-[12px] w-[220px] items-center gap-2.5 flex relative left-3 text-nowrap p-2 px-3 rounded-md transition-all`}
                              >
                              <div style={{backgroundColor:location.pathname === sub.path&&color+"20"}} className="h-3 w-3 backdrop-blur-lg rounded-full grid place-content-center">
                                <span style={{backgroundColor:location.pathname === sub.path?color:"#6a7282"}} className="h-1 w-1 rounded-full"></span>
                              </div>
                              {sub.name}
                              </Link>
                            </motion.div>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </>
                ) : (
                  <Tooltip
                    title={isCollapsed ? item.name : ""}
                    placement="right"
                  >
                    <Link
                      to={item.path}
                      className={`flex p-3 cursor-pointer rounded-lg transition-all 
                      ${location.pathname !== item.path ? "text-gray-500 hover:bg-gray-100" : ""}
                      ${activeNavColor === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}
                      ${
                        isCollapsed
                          ? "flex-col justify-center items-center px-0"
                          : "flex-row px-3"
                      }
                    `}
                      style={
                        location.pathname === item.path
                          ? { backgroundColor: bgColor, color: color }
                          : {}
                      }
                    >
                      <span className="text-[18px]" >{item.icon}</span>
                      <span
                        className={` font-[500]  ${
                          isCollapsed
                            ? "text-[9px] text-centre text-nowrap"
                            : "text-[12.5px] ml-3"
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </Tooltip>
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
