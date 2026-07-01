import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import menuItems from "../../config/SideBarConfig.jsx";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/SchoolErp.png";
import { useColorContext } from "../../context/context";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [hoverMenu, setHoverMenu] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { bgColor, color, activeNavColor,activeNavStyle } = useColorContext();

  const handleToggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  
  const handleHoverClose = () => {
    setHoverMenu(null);
    setAnchorEl(null);
  };

  const handleHoverOpen = (event, name) => {
    if (!isCollapsed) {
      setHoverMenu(name);
      setAnchorEl(event.currentTarget);
    }
  };


  return (
    <motion.header
      className={` lg:block hidden top-0 border-dashed relative border-t left-0 w-full z-10 shadow-md transition-all 
        ${activeNavColor === "light" ? "bg-white text-gray-900 border-gray-200/90" : "bg-gray-900/95 text-white border-gray-700"}
        ${activeNavStyle==="nav-top"?"block":"hidden"}
        `}
    >

        {/* Nav Links */}
        <nav
          className={` py-3 xl:px-10 lg:static top-16 left-0 w-full lg:w-auto bg-transparent shadow-none 
            transition-all duration-300 ease-in-out 
            `}
        >
        <ul className="xl:space-x-2 flex items-center justify-between">
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
                      className={`flex relative items-center p-1.5 w-full rounded-lg transition-all
    ${
      isSubMenuActive
        ? openMenus[item.name]
          ? ""
          : "bg-gray-100"
        : !openMenus[item.name]
    
        ? `text-gray-500  ${activeNavColor==="light"?"hover:bg-gray-100":"hover:bg-gray-800"}`
        : isCollapsed
        ? "bg-gray-100"
        : "text-gray-500"
    }
    ${isCollapsed ? "justify-center" : "justify-between"}
  `}
                      style={
                        openMenus[item.name] || isSubMenuActive
                          ? isSubMenuActive
                            ? { backgroundColor: bgColor, color: color }
                            : { backgroundColor: activeNavColor==="light"?"#f3f6f4":"#1e2939", color: activeNavColor!=="light"&&"#f3f6f4" }
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
                        <span className="xl:text-xl text-lg">{item.icon}</span>
                        <span
                          className={` font-medium  ${
                            isCollapsed
                              ? "text-[9px] text-centre text-nowrap"
                              : "xl:text-[12px] text-[12px] ml-3"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      {/* onclose side bar this meenu show  */}
                      { !isCollapsed && hoverMenu === item.name &&(
                          <div onMouseLeave={handleHoverClose} className="top-[2.8rem] w-36 absolute  border border-gray-300/90 rounded-lg bg-transparent shadow-lg overflow-auto box-border pointer-events-auto">
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }} // Start slightly off-screen to the left
                            animate={{ opacity: 1, y: 0 }} // Move to original position
                            transition={{ duration: 0.2, ease: "easeIn" }}
                            className="bg-white bg-opacity-90 backdrop-blur-md p-1 shadow-lg rounded-lg box-border"
                          >
                            {item.subItems.map((sub, i) => (
                              <li key={i}>
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }} // Start slightly off-screen to the left
                                  animate={{ opacity: 1, y: 0 }} // Move to original position
                                  transition={{
                                    duration: 0.1,
                                    ease: "easeOut",
                                  }}
                                  className="rounded-bl-sm"
                                >
                                  <Link
                                    to={sub.path}
                                    className={`flex pl-2 text-[13px] leading-[22px] py-2 text-nowrap rounded-md hover:bg-gray-100 transition-all ${
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
                      {!isCollapsed && <FaChevronDown className="text-xs ml-3" />}
                    </button>

                    {isCollapsed && openMenus[item.name] && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }} // Start slightly off-screen to the left
                        animate={{ opacity: 1, y: 0 }} // Move to original position
                        transition={{ duration: 0.2, ease: "easeIn" }}
                        className="ml-4.5 z-50 absolute mb-4 rounded-md  px-0 pb-3"
                      >
                        {item.subItems.map((sub, i) => (
                          <li
                            key={i}
                            className={`${
                              i === 0 ? "h-7" : "h-11 "
                            } border-l-[3px] relative  border-b-[2px] w-3 overflow-visible  rounded-bl-sm
                            ${activeNavColor==="light"?"border-gray-200/90":"border-gray-800/90"}
                            
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
                                        backgroundColor: `${activeNavColor==="light"?"#f2f6f4":"#1e2939"}`,
                                        fontWeight: "600",
                                        color: `${activeNavColor==="light"?"#1e2935":"#f2f6f4"}`,
                                      }
                                    : { color: "gray" }
                                }
                                to={sub.path}
                                className={`${
                                  i === 0 ? "top-3.5" : "top-7"
                                } text-[12px] w-[220px] block relative left-3 text-nowrap p-2 px-3 rounded-md transition-all`}
                              >
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
                      className={`flex  p-1.5 cursor-pointer rounded-lg transition-all 
    ${location.pathname !== item.path ? "text-gray-500 hover:bg-gray-100" : ""}
    ${activeNavColor==="light"?"hover:bg-gray-100":"hover:bg-gray-800"}
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
                      <span className="xl:text-xl text-lg">{item.icon}</span>
                      <span
                        className={` font-medium  ${
                          isCollapsed
                            ? "text-[9px] text-centre text-nowrap"
                            : "xl:text-[12px] text-[12px] ml-3"
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
    </motion.header>
  );
};

export default Navbar;